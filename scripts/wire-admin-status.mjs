/**
 * Wire Admin: apiPatch + updateStatus on services + pages use updateStatus.
 */
import fs from 'fs';
import path from 'path';

const adminRoot = '/Users/rishichandra/Desktop/nighwan/bacelar/bacelar_Admin';

// 1) apiPatch
const apiClientPath = path.join(adminRoot, 'src/services/apiClient.ts');
let apiClient = fs.readFileSync(apiClientPath, 'utf8');
if (!apiClient.includes('export async function apiPatch')) {
  apiClient = apiClient.replace(
    'export async function apiPut<T, P>(endpoint: string, payload: P): Promise<T> {',
    `export async function apiPatch<T, P>(endpoint: string, payload: P): Promise<T> {
  const url = \`\${API_CONFIG.BASE_URL}\${endpoint}\`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<T>(response);
}

export async function apiPut<T, P>(endpoint: string, payload: P): Promise<T> {`,
  );
  fs.writeFileSync(apiClientPath, apiClient);
  console.log('apiPatch added');
} else {
  console.log('apiPatch already exists');
}

// 2) Add updateStatus to services that have update + BASE/BASE_ENDPOINT
const serviceDirs = [
  path.join(adminRoot, 'src/services/master'),
  path.join(adminRoot, 'src/services/website'),
  path.join(adminRoot, 'src/services/students'),
];

for (const dir of serviceDirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
    const full = path.join(dir, file);
    let content = fs.readFileSync(full, 'utf8');
    if (content.includes('updateStatus:')) {
      console.log('svc skip', file);
      continue;
    }
    if (!content.includes('update:') && !content.includes('update =')) {
      continue;
    }
    // Only entities with CRUD-ish endpoints
    if (!content.includes('BASE_ENDPOINT') && !content.includes('const BASE')) {
      continue;
    }
    // skip attachment/payment etc if no clear id update status needed - still OK if has update

    if (!content.includes('apiPatch')) {
      content = content.replace(
        /import \{([^}]+)\} from "@\/services\/apiClient";/,
        (m, inner) => {
          if (inner.includes('apiPatch')) return m;
          return `import {${inner.replace(/\s+$/, '')}, apiPatch } from "@/services/apiClient";`;
        },
      );
    }

    const baseVar = content.includes('BASE_ENDPOINT') ? 'BASE_ENDPOINT' : 'BASE';
    const method = `
  updateStatus: async (
    id: number,
    IsActive: boolean,
    UpdatedBy: string = "Admin User"
  ): Promise<any> => {
    return apiPatch(\`\${${baseVar}}/\${id}/status\`, { IsActive, UpdatedBy });
  },
`;

    // insert before delete: if present, else before closing };
    if (content.includes('delete:')) {
      content = content.replace(/\n(\s*)delete:/, `\n${method}\n$1delete:`);
    } else if (content.includes('bulkDelete:')) {
      content = content.replace(/\n(\s*)bulkDelete:/, `\n${method}\n$1bulkDelete:`);
    } else {
      content = content.replace(/\n\};\s*$/, `\n${method}\n};\n`);
    }

    fs.writeFileSync(full, content);
    console.log('svc patched', file);
  }
}

// 3) Patch list pages: replace .update(... IsActive: newStatus ...) with .updateStatus
function patchPage(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('handleStatusToggle')) return;
  if (content.includes('.updateStatus(')) {
    console.log('page already', path.basename(path.dirname(filePath)));
    return;
  }

  // Common pattern in master pages:
  // await xxxService.update(item.xxxId, { IsActive: newStatus, UpdatedBy: "Admin User", ...optional });
  const updated = content.replace(
    /await (\w+Service)\.update\(\s*item\.(\w+)\s*,\s*\{[\s\S]*?IsActive:\s*newStatus[\s\S]*?\}\s*\);/g,
    'await $1.updateStatus(item.$2, newStatus, "Admin User");',
  );

  if (updated === content) {
    console.warn('page pattern miss', filePath);
    return;
  }
  fs.writeFileSync(filePath, updated);
  console.log('page patched', filePath.replace(adminRoot, ''));
}

const pageRoots = [
  path.join(adminRoot, 'src/app/master'),
  path.join(adminRoot, 'src/app/website'),
];

for (const rootDir of pageRoots) {
  if (!fs.existsSync(rootDir)) continue;
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    patchPage(path.join(rootDir, entry.name, 'page.tsx'));
  }
}

console.log('admin done');
