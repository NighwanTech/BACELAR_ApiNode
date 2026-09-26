export function splitName(fullName?: string | null) {
  const parts = String(fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return { firstname: "Student", lastname: "." };
  if (parts.length === 1) return { firstname: parts[0], lastname: "." };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

export function moodleUsername(enrollmentNo: string) {
  const cleaned = enrollmentNo.trim().toLowerCase().replace(/[^a-z0-9._@-]/g, "");
  return cleaned || "student";
}

export function shouldRetryStatus(status: number) {
  return status === 429 || status === 500 || status === 502 || status === 503;
}
