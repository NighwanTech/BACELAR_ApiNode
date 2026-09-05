export function isActiveOnly(value?: unknown): boolean {
  if (value === true || value === 1) return true;
  const flag = String(value ?? "").trim().toLowerCase();
  return flag === "true" || flag === "1" || flag === "yes";
}
