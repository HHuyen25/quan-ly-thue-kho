import { useMemo, useState } from 'react';
import { Plus, Printer } from 'lucide-react';
import { contracts, customers, invoices as seed } from '../../du-lieu/duLieuMau';
import type { Invoice, PaymentStatus } from '../../kieu';
import { formatDate, formatMoney } from '../../thu-vien/dinhDang';
import { NhanTrangThaiThanhToan } from '../../thanh-phan/NhanTrangThai';
import { HopThoai } from '../../thanh-phan/HopThoai';

export function QuanLyHoaDon() {
  const [rows, setRows] = useState<Invoice[]>(seed);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'All'>('All');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    customerId: '',
    contractId: '',
    period: 'Tháng 9/2026',
    content: '',
    date: '2026-09-01',
  });

  const filtered = useMemo(
    () => (statusFilter === 'All' ? rows : rows.filter((i) => i.status === statusFilter)),
    [rows, statusFilter],
  );

  const selectedContract = contracts.find((c) => c.id === form.contractId);
  const amountBeforeTax = selectedContract
    ? selectedContract.monthlyRent + selectedContract.serviceFee
    : 0;
  const vat = Math.round(amountBeforeTax * 0.1);
  const total = amountBeforeTax + vat;

  const monthTotal = rows
    .filter((i) => i.date.startsWith('2026-08'))
    .reduce((s, i) => s + i.amountBeforeTax, 0);

  function save() {
    if (!form.customerId || !form.contractId) return;
    const next: Invoice = {
      id: `i${Date.now()}`,
      number: `HD-2026-${String(rows.length + 90)}`,
      date: form.date,
      customerId: form.customerId,
      contractId: form.contractId,
      period: form.period,
      content: form.content || `Tiền thuê ${form.period}`,
      amountBeforeTax,
      vat,
      total,
      dueDate: '2026-09-05',
      status: 'ChuaThanhToan',
      paidAmount: 0,
    };
    setRows((p) => [next, ...p]);
    setOpen(false);
  }

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar-left">
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | 'All')}>
            <option value="All">Trạng thái</option>
            <option value="ChuaThanhToan">Chưa thanh toán</option>
            <option value="ThanhToanMotPhan">Thanh toán một phần</option>
            <option value="DaThanhToan">Đã thanh toán</option>
            <option value="QuaHan">Quá hạn</option>
          </select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            <Plus size={16} /> Lập hóa đơn
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Số hóa đơn</th>
                <th>Ngày phát hành</th>
                <th>Khách hàng</th>
                <th>Nội dung</th>
                <th>Tiền (trước thuế)</th>
                <th>Thuế VAT</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((i) => (
                <tr key={i.id}>
                  <td>{i.number}</td>
                  <td>{formatDate(i.date)}</td>
                  <td>{customers.find((c) => c.id === i.customerId)?.name}</td>
                  <td>{i.content}</td>
                  <td>{formatMoney(i.amountBeforeTax)}</td>
                  <td>{formatMoney(i.vat)}</td>
                  <td>
                    <NhanTrangThaiThanhToan status={i.status} />
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm">
                      <Printer size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>TỔNG HÓA ĐƠN THÁNG 8: {formatMoney(monthTotal)}</span>
        </div>
      </div>

      <HopThoai
        open={open}
        title="Lập hóa đơn"
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
        <div className="field">
          <label>Số hóa đơn</label>
          <input value={`HD-2026-${rows.length + 90}`} disabled />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Ngày lập</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="field">
            <label>Kỳ thanh toán</label>
            <input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />
          </div>
        </div>
        <div className="field">
          <label>
            Khách hàng <span className="req">*</span>
          </label>
          <select
            value={form.customerId}
            onChange={(e) => setForm({ ...form, customerId: e.target.value, contractId: '' })}
          >
            <option value="">Chọn khách hàng</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>
            Hợp đồng <span className="req">*</span>
          </label>
          <select value={form.contractId} onChange={(e) => setForm({ ...form, contractId: e.target.value })}>
            <option value="">Chọn hợp đồng</option>
            {contracts
              .filter((c) => !form.customerId || c.customerId === form.customerId)
              .filter((c) => c.status === 'DangHieuLuc' || c.status === 'SapHetHan')
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code}
                </option>
              ))}
          </select>
        </div>
        <div className="field">
          <label>Nội dung</label>
          <input value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Tiền thuê tháng..." />
        </div>
        <div className="summary-box">
          <div className="row">
            <span>Tiền chưa thuế</span>
            <strong>{formatMoney(amountBeforeTax)}</strong>
          </div>
          <div className="row">
            <span>Thuế GTGT 10%</span>
            <strong>{formatMoney(vat)}</strong>
          </div>
          <div className="row total">
            <span>Tổng tiền</span>
            <strong>{formatMoney(total)}</strong>
          </div>
          <div className="row">
            <span>Hạn thanh toán</span>
            <strong>05/09/2026</strong>
          </div>
        </div>
      </HopThoai>
    </div>
  );
}
