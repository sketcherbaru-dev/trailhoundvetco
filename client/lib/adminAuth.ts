export interface AdminSession {
  access_token: string;
  refresh_token: string;
  user_id: string;
  email: string;
}

const SESSION_KEY = 'admin_session';
const TOKEN_KEY = 'admin_token';

export function getAdminSession(): AdminSession | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setAdminSession(session: AdminSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(TOKEN_KEY, session.access_token);
}

export function clearAdminSession(): void {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function getAuthHeader(): { Authorization: string } | null {
  const session = getAdminSession();
  if (!session) return null;
  return { Authorization: `Bearer ${session.access_token}` };
}

export async function adminLogin(email: string, password: string): Promise<AdminSession> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  const data = await response.json();
  const session: AdminSession = {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user_id: data.user.id,
    email: data.user.email,
  };

  setAdminSession(session);
  return session;
}

export async function adminLogout(): Promise<void> {
  const headers = getAuthHeader();
  if (!headers) return;

  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers,
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearAdminSession();
  }
}
