import { dungXacThuc } from '../../boi-canh/BoiCanhXacThuc';
import { roleLabel } from '../../thu-vien/dinhDang';

export function TaiKhoan() {
  const { user } = dungXacThuc();
  if (!user) return null;

  return (
    <div className="stack" style={{ maxWidth: 640 }}>
      <div className="panel">
        <div className="panel-hd">
          <h2>Thông tin tài khoản</h2>
        </div>
        <div className="panel-bd detail-grid">
          <div className="detail-item">
            <label>Họ tên</label>
            <strong>{user.name}</strong>
          </div>
          <div className="detail-item">
            <label>Vai trò</label>
            <strong>{roleLabel[user.role]}</strong>
          </div>
          <div className="detail-item">
            <label>Tên đăng nhập</label>
            <strong>{user.username}</strong>
          </div>
          <div className="detail-item">
            <label>Email</label>
            <strong>{user.email || '—'}</strong>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <h2>Đổi mật khẩu</h2>
        </div>
        <div className="panel-bd">
          <div className="field">
            <label>Mật khẩu hiện tại</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="field">
            <label>Mật khẩu mới</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="field">
            <label>Xác nhận mật khẩu mới</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button className="btn btn-primary" type="button">
            Cập nhật mật khẩu
          </button>
          <p style={{ marginTop: 12, color: 'var(--muted)', fontSize: '0.85rem' }}>
            Frontend demo — chưa kết nối backend; nút chỉ mô phỏng giao diện.
          </p>
        </div>
      </div>
    </div>
  );
}
