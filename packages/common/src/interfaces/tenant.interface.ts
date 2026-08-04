export interface TenantContext {
  id: string;
  code: string;
  name: string;
  type: string;
  domain?: string;
  features?: Record<string, boolean>;
  config?: Record<string, unknown>;
  theme?: Record<string, unknown>;
}

export interface TenantRequest {
  tenant?: TenantContext;
}

export interface TenantHeaders {
  'x-tenant-id'?: string;
  'x-tenant-code'?: string;
  host?: string;
}
