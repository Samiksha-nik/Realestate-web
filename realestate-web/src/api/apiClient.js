const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request(path, { method = "GET", headers, body } = {}) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const text = await res.text();
  const data = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;

  if (!res.ok) {
    throw new ApiError(
      (data && typeof data === "object" && "message" in data && data.message) ? data.message : `Request failed (${res.status})`,
      { status: res.status, data }
    );
  }

  return data;
}

export const api = {
  auth: {
    me: () => request("/auth/me"),
    logout: async (returnTo) => {
      try {
        await request("/auth/logout", { method: "POST" });
      } finally {
        if (returnTo) window.location.href = returnTo;
      }
    },
    redirectToLogin: (returnTo) => {
      const redirect = encodeURIComponent(returnTo || window.location.href);
      window.location.href = `${API_BASE_URL}/auth/login?redirect=${redirect}`;
    },
  },
};

export { ApiError };

