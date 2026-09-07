import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { users } from '../du-lieu/duLieuMau';
import type { Role, User } from '../kieu';

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string) => string | null;
  logout: () => void;
  switchRoleDemo: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'thuekho_user';

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function NhaCungCapXacThuc({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadUser());

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login(username, password) {
        const found = users.find(
          (u) =>
            (u.username === username || u.email === username || u.phone === username) &&
            u.password === password,
        );
        if (!found) return 'Tên đăng nhập hoặc mật khẩu không chính xác';
        setUser(found);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
        return null;
      },
      logout() {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      },
      switchRoleDemo(role) {
        const found = users.find((u) => u.role === role);
        if (!found) return;
        setUser(found);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function dungXacThuc() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('dungXacThuc phải dùng trong NhaCungCapXacThuc');
  return ctx;
}
