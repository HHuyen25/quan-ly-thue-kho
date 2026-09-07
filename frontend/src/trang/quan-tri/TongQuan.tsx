import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { areas, contracts, customers, revenueByMonth } from '../../du-lieu/duLieuMau';
import { daysUntil, formatDate, formatMoney } from '../../thu-vien/dinhDang';
import { BangDieuKhien, TheThongKe } from '../../thanh-phan/TheThongKe';
import { NhanTrangThaiHopDong } from '../../thanh-phan/NhanTrangThai';

export function TongQuan() {
  const rentedM2 = areas.filter((a) => a.status === 'DaThue').reduce((s, a) => s + a.areaM2, 0);
  const totalM2 = areas.reduce((s, a) => s + a.areaM2, 0);
  const fillRate = Math.round((rentedM2 / totalM2) * 100);
  const activeContracts = contracts.filter((c) => c.status === 'DangHieuLuc' || c.status === 'SapHetHan');
  const expiring = contracts
    .filter((c) => c.status === 'SapHetHan' || (c.status === 'DangHieuLuc' && daysUntil(c.endDate) <= 60))
    .sort((a, b) => daysUntil(a.endDate) - daysUntil(b.endDate));

  return (
    <div className="stack">
      <div className="stats">
        <TheThongKe label="Tổng khách hàng" value={customers.length} hint={`${customers.filter((c) => c.status === 'DangThue').length} đang thuê`} />
        <TheThongKe label="Diện tích đã thuê" value={`${rentedM2} m²`} hint={`Tổng ${totalM2} m²`} />
        <TheThongKe label="Tỷ lệ lấp đầy" value={`${fillRate}%`} tone={fillRate >= 70 ? 'ok' : 'warn'} />
        <TheThongKe label="Doanh thu tháng 8" value={formatMoney(555_000_000)} hint="Tiền thuê + phí dịch vụ" />
        <TheThongKe label="HĐ đang hiệu lực" value={activeContracts.length} />
      </div>

      <div className="grid-2">
        <BangDieuKhien title="Biểu đồ doanh thu theo tháng (triệu đồng)">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eef5" />
                <XAxis dataKey="month" tick={{ fill: '#6b7a8d', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6b7a8d', fontSize: 12 }} />
                <Tooltip formatter={(v) => [`${v} triệu`, 'Doanh thu']} />
                <Bar dataKey="revenue" fill="#1f6b5a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BangDieuKhien>

        <BangDieuKhien title="Hợp đồng sắp hết hạn">
          <div className="list-alert">
            {expiring.map((c) => {
              const customer = customers.find((x) => x.id === c.customerId);
              const d = daysUntil(c.endDate);
              return (
                <div className="alert-item" key={c.id}>
                  <div>
                    <strong>{c.code} · {customer?.name}</strong>
                    <span>Hết hạn {formatDate(c.endDate)} · Còn {d} ngày</span>
                  </div>
                  <NhanTrangThaiHopDong status={c.status} />
                </div>
              );
            })}
            {expiring.length === 0 && <div className="empty">Không có hợp đồng sắp hết hạn</div>}
          </div>
        </BangDieuKhien>
      </div>
    </div>
  );
}
