import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CheckCircle2, Warehouse } from 'lucide-react';
import { dungXacThuc } from '../../boi-canh/BoiCanhXacThuc';
import type { Role } from '../../kieu';

const homeByRole: Record<Role, string> = {
  admin: '/admin',
  staff: '/staff',
  accountant: '/accountant',
  customer: '/customer',
};

export function DangNhap() {
  const { user, login, switchRoleDemo } = dungXacThuc();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (user) return <Navigate to={homeByRole[user.role]} replace />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const err = login(username.trim(), password);
    if (err) {
      setError(err);
      return;
    }
    const u = JSON.parse(localStorage.getItem('thuekho_user') || '{}');
    navigate(homeByRole[u.role as Role] || '/login');
    void remember;
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div>
          <div className="eyebrow">Phần mềm quản lý cho thuê kho quần áo</div>
          <h1>Kiểm soát diện tích, hợp đồng và dòng tiền trên một nền tảng</h1>
          <p className="lead">
            Theo dõi khu vực trống/đã thuê, tính tiền thuê theo chu kỳ, công nợ và báo cáo vận hành —
            đúng phạm vi nghiệp vụ trong báo cáo BTL của nhóm.
          </p>
          <ul className="auth-features">
            <li>
              <span>
                <Warehouse size={14} />
              </span>
              Quản lý khu vực kho: kệ / treo / VIP, trạng thái trống – đã thuê – bảo trì
            </li>
            <li>
              <span>
                <CheckCircle2 size={14} />
              </span>
              Hợp đồng, hóa đơn GTGT 10%, thu–chi và công nợ theo từng khách
            </li>
            <li>
              <span>
                <CheckCircle2 size={14} />
              </span>
              Phân quyền 4 vai trò: Admin, Nhân viên kho, Kế toán, Khách hàng
            </li>
          </ul>
        </div>
        <p style={{ color: '#8fa0b8', fontSize: '0.85rem' }}>Nhóm 02 · D.12.48.04 · 2026</p>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <h2>Đăng nhập hệ thống</h2>
          <p className="sub">HỆ THỐNG QUẢN LÝ CHO THUÊ KHO QUẦN ÁO</p>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Tên đăng nhập</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="SĐT / email / tài khoản"
                autoComplete="username"
                required
              />
            </div>
            <div className="field">
              <label>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            <div className="checkbox-row">
              <label>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Ghi nhớ đăng nhập
              </label>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Quên mật khẩu?
              </a>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }} type="submit">
              ĐĂNG NHẬP
            </button>
          </form>

          <div className="demo-accounts">
            <strong>Tài khoản demo (mật khẩu: 123456)</strong>
            <button type="button" onClick={() => { switchRoleDemo('admin'); navigate('/admin'); }}>
              Admin — admin
            </button>
            <button type="button" onClick={() => { switchRoleDemo('staff'); navigate('/staff'); }}>
              Nhân viên kho — staff
            </button>
            <button type="button" onClick={() => { switchRoleDemo('accountant'); navigate('/accountant'); }}>
              Kế toán — ketoan
            </button>
            <button type="button" onClick={() => { switchRoleDemo('customer'); navigate('/customer'); }}>
              Khách hàng — 0901234567
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
