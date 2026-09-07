import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { dungXacThuc } from '../boi-canh/BoiCanhXacThuc';
import { roleLabel } from '../thu-vien/dinhDang';

export interface MucDieuHuong {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface BoCucUngDungProps {
  title: string;
  subtitle?: string;
  nav: MucDieuHuong[];
  brandSub: string;
}

export function BoCucUngDung({ title, subtitle, nav, brandSub }: BoCucUngDungProps) {
  const { user, logout } = dungXacThuc();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .slice(-2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  return (
    <div className="app-shell">
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">TK</div>
          <div>
            <strong>Thuê Kho QA</strong>
            <small>{brandSub}</small>
          </div>
        </div>
        <nav className="nav-group">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
              end={item.to.split('/').length <= 2}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="avatar">{initials}</div>
            <div>
              <strong>{user.name}</strong>
              <small>{roleLabel[user.role]}</small>
            </div>
          </div>
          <button
            className="btn-logout"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <LogOut size={14} style={{ display: 'inline', marginRight: 6 }} />
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="btn btn-secondary btn-sm menu-btn" onClick={() => setOpen((v) => !v)} type="button" aria-label="Menu">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
            <div className="page-meta">
              {subtitle && <div className="eyebrow">{subtitle}</div>}
              <h1>{title}</h1>
            </div>
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
