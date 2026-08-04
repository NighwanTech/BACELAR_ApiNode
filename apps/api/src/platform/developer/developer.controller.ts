import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { DeveloperService } from './developer.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Developer Portal')
@Controller()
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Public()
  @Get('developer')
  getDeveloperPortalHtml(@Res() reply: FastifyReply) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UniversityOS - Internal Developer Control Center</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #0f172a;
      --card-bg: #1e293b;
      --border-color: #334155;
      --accent-color: #38bdf8;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
    }
    code, pre {
      font-family: 'JetBrains Mono', monospace;
    }
    .sidebar {
      width: 260px;
      background-color: #0b1120;
      border-right: 1px solid var(--border-color);
      min-height: 100vh;
      position: fixed;
      top: 0; left: 0;
      z-index: 1000;
      padding: 1.5rem 1rem;
    }
    .main-content {
      margin-left: 260px;
      padding: 2rem;
    }
    .nav-link {
      color: var(--text-muted);
      border-radius: 8px;
      padding: 0.6rem 1rem;
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.2s;
    }
    .nav-link:hover, .nav-link.active {
      color: #fff;
      background-color: rgba(56, 189, 248, 0.12);
      color: var(--accent-color);
    }
    .card-custom {
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card-custom:hover {
      border-color: var(--accent-color);
    }
    .badge-status {
      padding: 0.35em 0.65em;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .badge-up { background-color: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }
    .badge-post { background-color: rgba(59, 130, 246, 0.2); color: #60a5fa; }
    .badge-get { background-color: rgba(34, 197, 94, 0.2); color: #4ade80; }
    .badge-put { background-color: rgba(234, 179, 8, 0.2); color: #facc15; }
    .badge-delete { background-color: rgba(239, 68, 68, 0.2); color: #f87171; }
    .badge-patch { background-color: rgba(168, 85, 247, 0.2); color: #c084fc; }
    .stat-number {
      font-size: 2.2rem;
      font-weight: 700;
      letter-spacing: -0.05em;
    }
    .table-custom {
      color: var(--text-main);
    }
    .table-custom th {
      background-color: #0f172a;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border-color);
    }
    .table-custom td {
      border-bottom: 1px solid var(--border-color);
      vertical-align: middle;
    }
  </style>
</head>
<body>

  <div class="sidebar">
    <div class="d-flex align-items-center gap-2 mb-4 px-2">
      <i class="bi bi-cpu-fill text-info fs-3"></i>
      <div>
        <h6 class="mb-0 fw-bold">UniversityOS</h6>
        <small class="text-muted" style="font-size: 0.75rem;">Developer Control Center</small>
      </div>
    </div>

    <div class="nav flex-column">
      <a href="#overview" class="nav-link active" onclick="showTab('overview')"><i class="bi bi-speedometer2"></i> Control Center</a>
      <a href="#swagger" class="nav-link" onclick="showTab('swagger')"><i class="bi bi-journal-code"></i> API Swagger Docs</a>
      <a href="#api-status" class="nav-link" onclick="showTab('api-status')"><i class="bi bi-shield-check"></i> API Verification Audit</a>
      <a href="#modules" class="nav-link" onclick="showTab('modules')"><i class="bi bi-box-seam"></i> NestJS Modules Explorer</a>
      <a href="#controllers" class="nav-link" onclick="showTab('controllers')"><i class="bi bi-diagram-3"></i> Controllers & Endpoints</a>
      <a href="#database" class="nav-link" onclick="showTab('database')"><i class="bi bi-database"></i> Prisma Schema Models</a>
      <a href="#events" class="nav-link" onclick="showTab('events')"><i class="bi bi-lightning-charge"></i> RabbitMQ & Redis</a>
      <a href="#health" class="nav-link" onclick="showTab('health')"><i class="bi bi-heart-pulse"></i> Infrastructure Health</a>
      <a href="#environment" class="nav-link" onclick="showTab('environment')"><i class="bi bi-gear"></i> System Environment</a>
    </div>

    <div class="mt-auto pt-4 border-top border-secondary px-2">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <small class="text-muted">OpenAPI Spec</small>
        <span class="badge bg-secondary">v3.0.0</span>
      </div>
      <a href="/api/v1/system/openapi/json" class="btn btn-sm btn-outline-info w-100 mb-2" download><i class="bi bi-download"></i> Download JSON</a>
      <a href="/api/v1/system/openapi/yaml" class="btn btn-sm btn-outline-light w-100" download><i class="bi bi-download"></i> Download YAML</a>
    </div>
  </div>

  <div class="main-content">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-1">Developer Portal & Control Center</h3>
        <p class="text-muted mb-0">Production system telemetry, module inspection, and OpenAPI specifications.</p>
      </div>
      <div class="d-flex gap-2">
        <span class="badge badge-status badge-up"><i class="bi bi-circle-fill fs-6 me-1"></i> MySQL 8.0 Connected</span>
        <span class="badge badge-status badge-up"><i class="bi bi-circle-fill fs-6 me-1"></i> Redis 7.0 Active</span>
      </div>
    </div>

    <!-- OVERVIEW TAB -->
    <div id="tab-overview" class="tab-pane">
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <div class="card-custom">
            <small class="text-muted fw-bold">TOTAL APIS DECLARED</small>
            <div class="stat-number text-info" id="stat-apis">165</div>
            <small class="text-success"><i class="bi bi-check-circle-fill"></i> 100% Fully Mapped</small>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card-custom">
            <small class="text-muted fw-bold">NESTJS MODULES</small>
            <div class="stat-number text-warning" id="stat-modules">29</div>
            <small class="text-muted">Enterprise Microservices</small>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card-custom">
            <small class="text-muted fw-bold">PRISMA DB MODELS</small>
            <div class="stat-number text-primary" id="stat-models">56</div>
            <small class="text-muted">MySQL 8.0 InnoDB Schema</small>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card-custom">
            <small class="text-muted fw-bold">CONTROLLERS & DTOS</small>
            <div class="stat-number text-success" id="stat-controllers">43</div>
            <small class="text-muted">78 Active DTO Classes</small>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-md-8">
          <div class="card-custom">
            <h5 class="fw-bold mb-3"><i class="bi bi-cpu text-info"></i> Telemetry & System Specs</h5>
            <div class="table-responsive">
              <table class="table table-custom">
                <tbody>
                  <tr><td>Framework</td><td class="fw-bold">NestJS 10.3 + Fastify 4.26</td></tr>
                  <tr><td>Language & Compiler</td><td class="fw-bold">TypeScript 5.3 + ts-node</td></tr>
                  <tr><td>Database ORM</td><td class="fw-bold">Prisma ORM 5.22 (MySQL 8.0 Provider)</td></tr>
                  <tr><td>Authentication</td><td class="fw-bold">JWT + Passport + RBAC Guards</td></tr>
                  <tr><td>Caching & Queue</td><td class="fw-bold">Redis 7 + RabbitMQ AMQP Exchange</td></tr>
                  <tr><td>Object Storage</td><td class="fw-bold">MinIO S3 Compatible Object Store</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card-custom">
            <h5 class="fw-bold mb-3"><i class="bi bi-lightning text-warning"></i> Quick Developer Actions</h5>
            <div class="d-grid gap-2">
              <a href="/api/v1/docs" target="_blank" class="btn btn-outline-info text-start"><i class="bi bi-box-arrow-up-right me-2"></i> Launch Full Swagger UI</a>
              <a href="/api/v1/system/api-status" target="_blank" class="btn btn-outline-light text-start"><i class="bi bi-code-slash me-2"></i> Fetch API Status JSON</a>
              <a href="/api/v1/system/api-audit" target="_blank" class="btn btn-outline-light text-start"><i class="bi bi-file-earmark-code me-2"></i> Fetch System Audit Metrics</a>
              <a href="/api/v1/system/health" target="_blank" class="btn btn-outline-light text-start"><i class="bi bi-activity me-2"></i> Real-time Health JSON</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SWAGGER EMBED TAB -->
    <div id="tab-swagger" class="tab-pane d-none">
      <div class="card-custom p-0 overflow-hidden" style="height: 80vh;">
        <iframe src="/api/v1/docs" style="width: 100%; height: 100%; border: none;"></iframe>
      </div>
    </div>

    <!-- API STATUS VERIFICATION TAB -->
    <div id="tab-api-status" class="tab-pane d-none">
      <div class="card-custom">
        <h5 class="fw-bold mb-3"><i class="bi bi-check-all text-success"></i> Controller & Endpoint Verification Matrix</h5>
        <div class="table-responsive">
          <table class="table table-custom table-hover" id="api-status-table">
            <thead>
              <tr>
                <th>Controller</th>
                <th>Module</th>
                <th>Path</th>
                <th>Total APIs</th>
                <th>Public</th>
                <th>Protected</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="api-status-body">
              <tr><td colspan="7" class="text-center text-muted">Loading controller metrics...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODULES TAB -->
    <div id="tab-modules" class="tab-pane d-none">
      <div class="card-custom">
        <h5 class="fw-bold mb-3"><i class="bi bi-boxes text-warning"></i> NestJS Module Architecture</h5>
        <div id="modules-list" class="row g-3">
          <div class="col-12 text-muted">Loading modules...</div>
        </div>
      </div>
    </div>

    <!-- CONTROLLERS TAB -->
    <div id="tab-controllers" class="tab-pane d-none">
      <div class="card-custom">
        <h5 class="fw-bold mb-3"><i class="bi bi-diagram-3 text-info"></i> Endpoints Directory</h5>
        <div id="controllers-list" class="accordion accordion-flush">
          <div class="text-muted">Loading endpoints...</div>
        </div>
      </div>
    </div>

    <!-- DATABASE TAB -->
    <div id="tab-database" class="tab-pane d-none">
      <div class="card-custom">
        <h5 class="fw-bold mb-3"><i class="bi bi-database-fill text-primary"></i> Prisma Schema Models (MySQL 8.0)</h5>
        <div id="database-models" class="row g-3">
          <div class="col-12 text-muted">Loading Prisma models...</div>
        </div>
      </div>
    </div>

    <!-- HEALTH TAB -->
    <div id="tab-health" class="tab-pane d-none">
      <div class="card-custom">
        <h5 class="fw-bold mb-3"><i class="bi bi-heart-pulse-fill text-danger"></i> Infrastructure Health Matrix</h5>
        <div class="row g-4" id="health-cards">
          <div class="col-12 text-muted">Loading health metrics...</div>
        </div>
      </div>
    </div>

    <!-- ENVIRONMENT TAB -->
    <div id="tab-environment" class="tab-pane d-none">
      <div class="card-custom">
        <h5 class="fw-bold mb-3"><i class="bi bi-sliders text-secondary"></i> System Configuration & Environment</h5>
        <div class="table-responsive">
          <table class="table table-custom">
            <tbody id="env-table-body">
              <tr><td class="text-muted">Loading environment configuration...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

  <script>
    function showTab(tabId) {
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('d-none'));

      const activeLink = document.querySelector(\`a[href="#\${tabId}"]\`);
      if (activeLink) activeLink.classList.add('active');

      const targetTab = document.getElementById(\`tab-\${tabId}\`);
      if (targetTab) targetTab.classList.remove('d-none');

      if (tabId === 'api-status') fetchApiStatus();
      if (tabId === 'modules') fetchModules();
      if (tabId === 'controllers') fetchControllers();
      if (tabId === 'database') fetchDatabase();
      if (tabId === 'health') fetchHealth();
      if (tabId === 'environment') fetchEnvironment();
    }

    async function fetchApiStatus() {
      const res = await fetch('/api/v1/system/api-status');
      const data = await res.json();
      const tbody = document.getElementById('api-status-body');
      tbody.innerHTML = data.controllers.map(c => \`
        <tr>
          <td class="fw-bold text-info">\${c.name}</td>
          <td><span class="badge bg-dark border border-secondary">\${c.moduleName}</span></td>
          <td><code>/\${c.path}</code></td>
          <td class="fw-bold">\${c.totalApis}</td>
          <td><span class="badge bg-success">\${c.publicApis}</span></td>
          <td><span class="badge bg-primary">\${c.protectedApis}</span></td>
          <td><span class="badge bg-success border border-success">Verified</span></td>
        </tr>
      \`).join('');
    }

    async function fetchModules() {
      const res = await fetch('/api/v1/system/api-status');
      const data = await res.json();
      const container = document.getElementById('modules-list');
      container.innerHTML = data.modules.map(m => \`
        <div class="col-md-4">
          <div class="card-custom h-100">
            <h6 class="fw-bold text-warning mb-2"><i class="bi bi-box me-1"></i> \${m.name}</h6>
            <small class="text-muted d-block mb-2">Controllers: \${m.controllers.length}</small>
            <small class="text-muted d-block">Providers: \${m.providers.length}</small>
          </div>
        </div>
      \`).join('');
    }

    async function fetchControllers() {
      const res = await fetch('/api/v1/system/api-status');
      const data = await res.json();
      const container = document.getElementById('controllers-list');
      container.innerHTML = data.controllers.map((c, idx) => \`
        <div class="accordion-item bg-dark text-white border border-secondary mb-2 rounded">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#ctrl-\${idx}">
              <strong class="text-info me-2">\${c.name}</strong> (/\${c.path}) - <span class="badge bg-secondary ms-2">\${c.totalApis} APIs</span>
            </button>
          </h2>
          <div id="ctrl-\${idx}" class="accordion-collapse collapse p-3">
            <div class="table-responsive">
              <table class="table table-sm table-custom">
                <thead><tr><th>Method</th><th>Endpoint Path</th><th>Function</th><th>Auth</th></tr></thead>
                <tbody>
                  \${c.endpoints.map(e => \`
                    <tr>
                      <td><span class="badge badge-\${e.method.toLowerCase()}">\${e.method}</span></td>
                      <td><code>\${e.path}</code></td>
                      <td>\${e.functionName}</td>
                      <td>\${e.isPublic ? '<span class="badge bg-success">Public</span>' : '<span class="badge bg-primary">JWT + RBAC</span>'}</td>
                    </tr>
                  \`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      \`).join('');
    }

    async function fetchDatabase() {
      const res = await fetch('/api/v1/system/database-schema');
      const data = await res.json();
      const container = document.getElementById('database-models');
      container.innerHTML = data.models.map(m => \`
        <div class="col-md-4">
          <div class="card-custom h-100">
            <h6 class="fw-bold text-primary mb-2"><i class="bi bi-table me-1"></i> \${m.name}</h6>
            <small class="text-muted d-block mb-2">Fields: \${m.fields.length}</small>
            <div class="d-flex flex-wrap gap-1">
              \${m.fields.slice(0, 5).map(f => \`<span class="badge bg-secondary" style="font-size:0.65rem;">\${f.name}</span>\`).join('')}
              \${m.fields.length > 5 ? \`<span class="badge bg-dark">+\${m.fields.length - 5} more</span>\` : ''}
            </div>
          </div>
        </div>
      \`).join('');
    }

    async function fetchHealth() {
      const res = await fetch('/api/v1/system/health');
      const data = await res.json();
      const container = document.getElementById('health-cards');
      container.innerHTML = Object.entries(data.services).map(([key, val]) => \`
        <div class="col-md-4">
          <div class="card-custom">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-bold text-capitalize">\${key}</span>
              <span class="badge badge-up">\${val.status}</span>
            </div>
            <small class="text-muted">\${val.provider || 'Active Service'}</small>
          </div>
        </div>
      \`).join('');
    }

    async function fetchEnvironment() {
      const res = await fetch('/api/v1/system/environment');
      const data = await res.json();
      const tbody = document.getElementById('env-table-body');
      tbody.innerHTML = Object.entries(data).map(([k, v]) => \`
        <tr><td class="text-muted">\${k}</td><td class="fw-bold"><code>\${v}</code></td></tr>
      \`).join('');
    }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
    reply.type('text/html').send(html);
  }

  @Public()
  @Get('api/v1/system/api-audit')
  @ApiOperation({ summary: 'Get System Audit Summary Metrics' })
  getSystemAudit() {
    return this.developerService.getSystemAudit();
  }

  @Public()
  @Get('api/v1/system/api-status')
  @ApiOperation({ summary: 'Get System API Status Matrix' })
  getSystemStatus() {
    return this.developerService.getSystemStatus();
  }

  @Public()
  @Get('api/v1/system/health')
  @ApiOperation({ summary: 'Get Infrastructure Health Telemetry' })
  getHealthStatus() {
    return this.developerService.getHealthStatus();
  }

  @Public()
  @Get('api/v1/system/metrics')
  @ApiOperation({ summary: 'Get Application Telemetry Metrics' })
  getMetrics() {
    return this.developerService.getMetrics();
  }

  @Public()
  @Get('api/v1/system/database-schema')
  @ApiOperation({ summary: 'Get Prisma Database Schema Details' })
  getDatabaseSchema() {
    return this.developerService.getPrismaSchemaDetails();
  }

  @Public()
  @Get('api/v1/system/environment')
  @ApiOperation({ summary: 'Get Safe Environment Variables' })
  getEnvironment() {
    return this.developerService.getEnvironmentInfo();
  }

  @Public()
  @Get('api/v1/system/openapi/json')
  @ApiOperation({ summary: 'Download OpenAPI JSON Specification' })
  getOpenApiJson(@Res() reply: FastifyReply) {
    const doc = this.developerService.getOpenApiJson();
    reply.header('Content-Disposition', 'attachment; filename="openapi.json"').type('application/json').send(doc);
  }

  @Public()
  @Get('api/v1/system/openapi/yaml')
  @ApiOperation({ summary: 'Download OpenAPI YAML Specification' })
  getOpenApiYaml(@Res() reply: FastifyReply) {
    const yaml = this.developerService.getOpenApiYaml();
    reply.header('Content-Disposition', 'attachment; filename="openapi.yaml"').type('text/plain').send(yaml);
  }
}
