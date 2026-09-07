import { useMemo, useState } from 'react';
import { invoices as seed } from '../../du-lieu/duLieuMau';
import { dungXacThuc } from '../../boi-canh/BoiCanhXacThuc';
import { formatMoney } from '../../thu-vien/dinhDang';

export function ThanhToan() {
  const { user } = dungXacThuc();
  const customerId = user?.customerId || 'c1';
  const unpaid = useMemo(
    () => seed.filter((i) => i.customerId === customerId && i.status !== 'DaThanhToan'),
    [customerId],
  );
  const [selected, setSelected] = useState<string[]>(unpaid.map((i) => i.id));
  const [bank, setBank] = useState('Vietcombank');
  const [account, setAccount] = useState('');
  const [done, setDone] = useState(false);

  const total = unpaid
    .filter((i) => selected.includes(i.id))
    .reduce((s, i) => s + (i.total - i.paidAmount), 0);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="stack" style={{ maxWidth: 720 }}>
      <div className="summary-box">
        <div className="row">
          <span>Khách hàng</span>
          <strong>{user?.name}</strong>
        </div>
        <div className="row">
          <span>Số dư ước tính phải trả</span>
          <strong>{formatMoney(total)}</strong>
        </div>
      </div>

      {done ? (
        <div className="panel">
          <div className="panel-bd empty" style={{ color: 'var(--ok)' }}>
            Đã gửi xác nhận thanh toán {formatMoney(total)}. Kế toán sẽ đối chiếu và cập nhật công nợ.
          </div>
        </div>
      ) : (
        <>
          <div className="panel">
            <div className="panel-hd">
              <h2>Chọn hóa đơn cần thanh toán</h2>
            </div>
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th></th>
                    <th>Số HD</th>
                    <th>Kỳ</th>
                    <th>Còn lại</th>
                  </tr>
                </thead>
                <tbody>
                  {unpaid.map((i) => (
                    <tr key={i.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.includes(i.id)}
                          onChange={() => toggle(i.id)}
                        />
                      </td>
                      <td>{i.number}</td>
                      <td>{i.period}</td>
                      <td>{formatMoney(i.total - i.paidAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel">
            <div className="panel-hd">
              <h2>Phương thức thanh toán</h2>
            </div>
            <div className="panel-bd">
              <div className="field">
                <label>Hình thức</label>
                <select defaultValue="ChuyenKhoan">
                  <option value="ChuyenKhoan">Chuyển khoản</option>
                </select>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Ngân hàng</label>
                  <input value={bank} onChange={(e) => setBank(e.target.value)} />
                </div>
                <div className="field">
                  <label>Số tài khoản nộp</label>
                  <input
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="Nhập số TK đã chuyển"
                  />
                </div>
              </div>
              <div className="summary-box">
                <div className="row total">
                  <span>Tổng thanh toán</span>
                  <strong>{formatMoney(total)}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn btn-secondary" onClick={() => setSelected([])}>
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  disabled={!selected.length}
                  onClick={() => setDone(true)}
                >
                  Xác nhận thanh toán
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
