import fs from 'fs';
import path from 'path';

const root = '/Users/rishichandra/Desktop/nighwan/bacelar/bacelar_Admin';

const pages = [
  { rel: 'src/app/website/campusquicklink/page.tsx', service: 'campusQuickLinkService', setter: 'setLinks', idField: 'quickLinkId', item: 'link' },
  { rel: 'src/app/website/hero-section/page.tsx', service: 'heroSectionService', setter: 'setSlides', idField: 'heroSectionId', item: 'item' },
  { rel: 'src/app/website/latest-updates/page.tsx', service: 'latestUpdateService', setter: 'setUpdates', idField: 'latestUpdateId', item: 'item' },
  { rel: 'src/app/website/notices-board/page.tsx', service: 'noticeBoardService', setter: 'setNotices', idField: 'noticeBoardId', item: 'item' },
  { rel: 'src/app/website/accreditation-sliders/page.tsx', service: 'accreditationSliderService', setter: 'setSliders', idField: 'accreditationSliderId', item: 'item' },
  { rel: 'src/app/website/top-achievers/page.tsx', service: 'topAchieverService', setter: 'setAchievers', idField: 'topAchieverId', item: 'item' },
  { rel: 'src/app/website/image-gallery/page.tsx', service: 'imageGalleryService', setter: 'setGalleries', idField: 'imageGalleryId', item: 'item' },
  { rel: 'src/app/website/video-gallery/page.tsx', service: 'videoGalleryService', setter: 'setVideos', idField: 'videoGalleryId', item: 'item' },
  { rel: 'src/app/website/header-button/page.tsx', service: 'headerButtonService', setter: 'setButtons', idField: 'headerButtonId', item: 'item' },
];

function ensureBanImport(c) {
  if (/\bBan\b/.test(c)) return c;
  return c.replace(
    /import \{([\s\S]*?)\} from "lucide-react";/,
    (m, inner) => `import {${inner.trim().replace(/,$/, '')},\n  Ban,\n} from "lucide-react";`,
  );
}

function ensureCheckCircle(c) {
  if (/\bCheckCircle\b/.test(c) || /\bCheckCircle2\b/.test(c)) return c;
  return c.replace(
    /import \{([\s\S]*?)\} from "lucide-react";/,
    (m, inner) => `import {${inner.trim().replace(/,$/, '')},\n  CheckCircle,\n} from "lucide-react";`,
  );
}

function patchPage(cfg) {
  const file = path.join(root, cfg.rel);
  let c = fs.readFileSync(file, 'utf8');
  if (c.includes('handleStatusToggle')) {
    console.log('skip', cfg.rel);
    return;
  }

  c = ensureBanImport(c);
  c = ensureCheckCircle(c);

  if (!c.includes('updatingStatusId')) {
    c = c.replace(
      /const \[isDeleting, setIsDeleting\] = useState<number \| null>\(null\);/,
      `const [isDeleting, setIsDeleting] = useState<number | null>(null);\n  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);`,
    );
  }

  const fn = `
  const handleStatusToggle = async (row: any, newStatus: boolean) => {
    try {
      setUpdatingStatusId(row.${cfg.idField});
      await ${cfg.service}.updateStatus(row.${cfg.idField}, newStatus, "Admin User");
      ${cfg.setter}((prev) =>
        prev.map((x) =>
          x.${cfg.idField} === row.${cfg.idField} ? { ...x, IsActive: newStatus } : x
        )
      );
      showToast("success", \`Status updated to \${newStatus ? "ACTIVE" : "INACTIVE"}\`);
    } catch (err: any) {
      console.error("Status update failed:", err);
      showToast("error", err.message || "Failed to update status");
    } finally {
      setUpdatingStatusId(null);
    }
  };
`;

  if (c.includes('const handleOpenAddModal')) {
    c = c.replace('const handleOpenAddModal', `${fn}\n  const handleOpenAddModal`);
  } else if (c.includes('const handleOpenEditModal')) {
    c = c.replace('const handleOpenEditModal', `${fn}\n  const handleOpenEditModal`);
  } else {
    throw new Error('no insert for ' + cfg.rel);
  }

  const item = cfg.item;
  const btn = `                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusToggle(${item}, !(${item}.IsActive !== false))
                                }
                                disabled={updatingStatusId === ${item}.${cfg.idField}}
                                className="p-1 rounded text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer disabled:opacity-50"
                                title={${item}.IsActive !== false ? "Deactivate" : "Activate"}
                              >
                                {updatingStatusId === ${item}.${cfg.idField} ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                                ) : ${item}.IsActive !== false ? (
                                  <Ban className="w-3.5 h-3.5" />
                                ) : (
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                )}
                              </button>
`;

  const needle = `onClick={() => handleOpenEditModal(${item})}`;
  const idx = c.indexOf(needle);
  if (idx < 0) throw new Error('edit btn missing ' + cfg.rel);

  // find start of that <button
  const before = c.lastIndexOf('<button', idx);
  if (before < 0) throw new Error('button tag missing ' + cfg.rel);
  c = c.slice(0, before) + btn + c.slice(before);

  fs.writeFileSync(file, c);
  console.log('ok', cfg.rel);
}

for (const p of pages) {
  try {
    patchPage(p);
  } catch (e) {
    console.error('FAIL', p.rel, e.message);
  }
}

console.log('website pages done');
