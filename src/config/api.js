const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const apiBaseUrl = (configuredBaseUrl || "/api").replace(/\/+$/, "");

export function apiUrl(path) {
  return `${apiBaseUrl}/${String(path).replace(/^\/+/, "")}`;
}