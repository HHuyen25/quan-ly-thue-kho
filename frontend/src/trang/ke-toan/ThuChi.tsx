import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { customers, transactions as seed } from '../../du-lieu/duLieuMau';
import type { Transaction } from '../../kieu';
import { formatDate, formatMoney } from '../../thu-vien/dinhDang';
import { HopThoai } from '../../thanh-phan/HopThoai';

export function ThuChi() {
  const [rows, setRows] = useState<Transaction[]>(seed);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: '2026-09-06',
    category: 'DienNuoc',
    amount: '',
    content: '',
    method: 'ChuyenKhoan',
  });

  const thu = rows.filter((t) => t.type === 'Thu' && t.status === 'XacNhan').reduce((s, t) => s + t.amount, 0);
  const chi = rows.filter((t) => t.type === 'Chi' && t.status === 'XacNhan').reduce((s, t) => s + t.amount, 0);

  function save() {
    if (!form.amount || !form.content) return;
    const next: Transaction = {
      id: `t${Date.now()}`,
      date: form.date,
      type: 'Chi',
      category: form.category,
      amount: Number(form.amount),
      method: form.method,
      content: form.content,
      status: 'XacNhan',
    };
    setRows((p) => [next, ...p]);
    setOpen(false);
  }

  return (
    <div className="stack">
      <div className="stats">
        <div className="stat-card ok">
          <div className="label">Tổng thu</div>
          <div className="value" style={{ fontSize: '1.3rem' }}>{formatMoney(thu)}</div>
        </div>
        <div className="stat-card warn">
          <div className="label">Tổng chi</div>
          <div className="value" style={{ fontSize: '1.3rem' }}>{formatMoney(chi)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Chênh lệch</div>
          <div className="value" style={{ fontSize: '1.3rem' }}>{formatMoney(thu - chi)}</div>
        </div>
      </div>

      <div className="toolbar">
        <div />
        <div className="toolbar-right">
          <button className="btn btn-secondary">
            <Download size={16} /> Xuất
          </button>
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            <Plus size={16} /> Thêm phiếu chi
          </button>
        </div>
      </div>

      <div className="grid-2 equal">
        <div className="panel">
          <div className="panel-hd">
            <h2>Khoản thu</h2>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Nội dung</th>
                  <th>Khách hàng</th>
                  <th>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((t) => t.type === 'Thu')
                  .map((t) => (
                    <tr key={t.id}>
                      <td>{formatDate(t.date)}</td>
                      <td>{t.content}</td>
                      <td>{customers.find((c) => c.id === t.customerId)?.name || '—'}</td>
                      <td>{formatMoney(t.amount)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-hd">
            <h2>Khoản chi</h2>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Nội dung</th>
                  <th>Loại</th>
                  <th>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((t) => t.type === 'Chi')
                  .map((t) => (
                    <tr key={t.id}>
                      <td>{formatDate(t.date)}</td>
                      <td>{t.content}</td>
                      <td>{t.category}</td>
                      <td>{formatMoney(t.amount)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <HopThoai
        open={open}
        title="Thêm phiếu chi"
        onClose={() => setOpen(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpen(false)}>
              Hủy
            </button>
            <button className="btn btn-primary" onClick={save}>
              Lưu
            </button>
          </>
        }
      >
        <div className="field-row">
          <div className="field">
            <label>Ngày chi</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="field">
            <label>Loại chi phí</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="DienNuoc">Điện nước</option>
              <option value="BaoTri">Bảo trì</option>
              <option value="BaoVe">Bảo vệ</option>
              <option value="VeSinh">Vệ sinh</option>
              <option value="NhanCong">Nhân công</option>
              <option value="Khac">Khác</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label>Số tiền</label>
          <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        </div>
        <div className="field">
          <label>Nội dung</label>
          <input value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </div>
        <div className="field">
          <label>Phương thức</label>
          <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
            <option value="ChuyenKhoan">Chuyển khoản</option>
            <option value="TienMat">Tiền mặt</option>
          </select>
        </div>
      </HopThoai>
    </div>
  );
}
