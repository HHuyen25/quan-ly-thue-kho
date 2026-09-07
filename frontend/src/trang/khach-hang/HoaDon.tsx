import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { invoices } from '../../du-lieu/duLieuMau';
import { dungXacThuc } from '../../boi-canh/BoiCanhXacThuc';
import type { PaymentStatus } from '../../kieu';
import { formatDate, formatMoney } from '../../thu-vien/dinhDang';
import { NhanTrangThaiThanhToan } from '../../thanh-phan/NhanTrangThai';

export function HoaDon() {
  const { user } = dungXacThuc();
  const customerId = user?.customerId || 'c1';
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'All'>('All');

  const rows = useMemo(() => {
    const mine = invoices.filter((i) => i.customerId === customerId);
    return statusFilter === 'All' ? mine : mine.filter((i) => i.status === statusFilter);
  }, [customerId, statusFilter]);

  const total = rows.reduce((s, i) => s + i.total, 0);

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar-left">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | 'All')}
          >
            <option value="All">Trạng thái</option>
            <option value="ChuaThanhToan">Chưa thanh toán</option>
            <option value="DaThanhToan">Đã thanh toán</option>
            <option value="QuaHan">Quá hạn</option>
          </select>
        </div>
        <Link className="btn btn-primary" to="/customer/payment">
          Thanh toán hóa đơn
        </Link>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Số HD</th>
                <th>Ngày</th>
                <th>Nội dung</th>
                <th>Tổng tiền</th>
                <th>Hạn thanh toán</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.id}>
                  <td>{i.number}</td>
                  <td>{formatDate(i.date)}</td>
                  <td>{i.content}</td>
                  <td>{formatMoney(i.total)}</td>
                  <td>{formatDate(i.dueDate)}</td>
                  <td>
                    <NhanTrangThaiThanhToan status={i.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>Tổng cộng: {formatMoney(total)}</span>
        </div>
      </div>
    </div>
  );
}
