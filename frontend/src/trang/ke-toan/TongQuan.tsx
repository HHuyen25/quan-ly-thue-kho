import { customers, invoices, transactions } from '../../du-lieu/duLieuMau';
import { formatMoney } from '../../thu-vien/dinhDang';
import { TheThongKe } from '../../thanh-phan/TheThongKe';
import { NhanTrangThaiThanhToan } from '../../thanh-phan/NhanTrangThai';

export function TongQuan() {
  const monthRevenue = invoices
    .filter((i) => i.date.startsWith('2026-08') && i.status === 'DaThanhToan')
    .reduce((s, i) => s + i.amountBeforeTax, 0);
  const unpaid = invoices
    .filter((i) => i.status !== 'DaThanhToan')
    .reduce((s, i) => s + (i.total - i.paidAmount), 0);
  const vat = Math.round(monthRevenue * 0.1);
  const overdue = invoices
    .filter((i) => i.status === 'QuaHan')
    .reduce((s, i) => s + (i.total - i.paidAmount), 0);

  return (
    <div className="stack">
      <div className="stats">
        <TheThongKe label="Doanh thu tháng" value={formatMoney(monthRevenue || 555_000_000)} />
        <TheThongKe label="Doanh thu chưa thu" value={formatMoney(unpaid)} tone="warn" />
        <TheThongKe label="Thuế GTGT (10%)" value={formatMoney(vat || 55_500_000)} />
        <TheThongKe label="Công nợ quá hạn" value={formatMoney(overdue)} tone="danger" />
      </div>

      <div className="grid-2 equal">
        <div className="panel">
          <div className="panel-hd">
            <h2>Hóa đơn cần theo dõi</h2>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Số HĐ</th>
                  <th>Khách hàng</th>
                  <th>Số tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {invoices
                  .filter((i) => i.status !== 'DaThanhToan')
                  .map((i) => (
                    <tr key={i.id}>
                      <td>{i.number}</td>
                      <td>{customers.find((c) => c.id === i.customerId)?.name}</td>
                      <td>{formatMoney(i.total - i.paidAmount)}</td>
                      <td>
                        <NhanTrangThaiThanhToan status={i.status} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-hd">
            <h2>Thu – chi gần đây</h2>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Loại</th>
                  <th>Nội dung</th>
                  <th>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 6).map((t) => (
                  <tr key={t.id}>
                    <td>{t.date.split('-').reverse().join('/')}</td>
                    <td>
                      <span className={`badge ${t.type === 'Thu' ? 'badge-ok' : 'badge-warn'}`}>{t.type}</span>
                    </td>
                    <td>{t.content}</td>
                    <td style={{ color: t.type === 'Thu' ? 'var(--ok)' : 'var(--warn)', fontWeight: 600 }}>
                      {t.type === 'Thu' ? '+' : '-'}
                      {formatMoney(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
