import { Link } from 'react-router-dom';
import { areas, contracts, invoices } from '../../du-lieu/duLieuMau';
import { dungXacThuc } from '../../boi-canh/BoiCanhXacThuc';
import { formatDate, formatMoney } from '../../thu-vien/dinhDang';
import { NhanTrangThaiHopDong, NhanTrangThaiThanhToan } from '../../thanh-phan/NhanTrangThai';
import { TheThongKe } from '../../thanh-phan/TheThongKe';

export function TongQuan() {
  const { user } = dungXacThuc();
  const customerId = user?.customerId || 'c1';
  const myContracts = contracts.filter(
    (c) => c.customerId === customerId && (c.status === 'DangHieuLuc' || c.status === 'SapHetHan'),
  );
  const rentedM2 = myContracts.reduce((s, c) => s + c.areaM2, 0);
  const paid = invoices
    .filter((i) => i.customerId === customerId && i.status === 'DaThanhToan')
    .reduce((s, i) => s + i.paidAmount, 0);
  const unpaid = invoices.filter(
    (i) => i.customerId === customerId && i.status !== 'DaThanhToan',
  );

  return (
    <div className="stack">
      <div className="stats">
        <TheThongKe label="Hợp đồng đang thuê" value={myContracts.length} />
        <TheThongKe label="Tổng diện tích đang thuê" value={`${rentedM2} m²`} />
        <TheThongKe label="Tiền đã thanh toán" value={formatMoney(paid)} tone="ok" />
      </div>

      <div className="panel">
        <div className="panel-hd">
          <h2>Hợp đồng đang hiệu lực</h2>
          <Link className="btn btn-secondary btn-sm" to="/customer/contracts">
            Xem tất cả
          </Link>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Mã HD</th>
                <th>Khu vực</th>
                <th>Diện tích</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {myContracts.map((c) => (
                <tr key={c.id}>
                  <td>{c.code}</td>
                  <td>{areas.find((a) => a.id === c.areaId)?.code}</td>
                  <td>{c.areaM2} m²</td>
                  <td>{formatDate(c.startDate)}</td>
                  <td>{formatDate(c.endDate)}</td>
                  <td>
                    <NhanTrangThaiHopDong status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <h2>Hóa đơn chưa thanh toán</h2>
          <Link className="btn btn-primary btn-sm" to="/customer/payment">
            Thanh toán ngay
          </Link>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Số HD</th>
                <th>Kỳ thanh toán</th>
                <th>Số tiền</th>
                <th>Hạn thanh toán</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {unpaid.map((i) => (
                <tr key={i.id}>
                  <td>{i.number}</td>
                  <td>{i.period}</td>
                  <td>{formatMoney(i.total - i.paidAmount)}</td>
                  <td>{formatDate(i.dueDate)}</td>
                  <td>
                    <NhanTrangThaiThanhToan status={i.status} />
                  </td>
                </tr>
              ))}
              {unpaid.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="empty">Không có hóa đơn chưa thanh toán</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
