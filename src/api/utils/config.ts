const isMock = import.meta.env.VITE_USE_MOCK === "true"
export const API_PREFIX = isMock ? "/api" : "/api/v1"

export function getBaseURL() {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_BASE_URL
  }
  return ""
}
