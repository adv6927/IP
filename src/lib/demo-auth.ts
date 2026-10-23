/**
 * Demo-only "session" helpers for the Cool Charity showcase.
 * Browser-only: only ever called from event handlers / effects.
 */

export type CoolUser = {
  name: string;
  email: string;
};

const KEY = "cool-charity-user";

export function saveUser(user: CoolUser) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(user));
  } catch {
    /* private mode — the show goes on anyway */
  }
}

export function getUser(): CoolUser | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CoolUser) : null;
  } catch {
    return null;
  }
}

export function clearUser() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
