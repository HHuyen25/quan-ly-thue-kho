import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { areas, contracts } from '../../du-lieu/duLieuMau';
import { dungXacThuc } from '../../boi-canh/BoiCanhXacThuc';
import type { ContractStatus } from '../../kieu';
import { formatDate, formatMoney } from '../../thu-vien/dinhDang';
import { NhanTrangThaiHopDong } from '../../thanh-phan/NhanTrangThai';

export function HopDong() {
  const { user } = dungXacThuc();
  const customerId = user?.customerId || 'c1';
  const [statusFilter, setStatusFilter] = useState<ContractStatus | 'All'>('All');

  const rows = useMemo(() => {
    const mine = contracts.filter((c) => c.customerId === customerId);
    return statusFilter === 'All' ? mine : mine.filter((c) => c.status === statusFilter);
  }, [customerId, statusFilter]);

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar-left">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ContractStatus | 'All')}
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="DangHieuLuc">Đang hiệu lực</option>
            <option value="SapHetHan">Sắp hết hạn</option>
            <option value="DaKetThuc">Đã kết thúc</option>
          </select>
        </div>
        <button className="btn btn-secondary">Gia hạn hợp đồng</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã hợp đồng</th>
                <th>Khu vực</th>
                <th>Diện tích</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Tiền/tháng</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c, idx) => (
                <tr key={c.id}>
                  <td>{idx + 1}</td>
                  <td>{c.code}</td>
                  <td>{areas.find((a) => a.id === c.areaId)?.code}</td>
                  <td>{c.areaM2} m²</td>
                  <td>{formatDate(c.startDate)}</td>
                  <td>{formatDate(c.endDate)}</td>
                  <td>{formatMoney(c.monthlyRent)}</td>
                  <td>
                    <NhanTrangThaiHopDong status={c.status} />
                  </td>
                  <td>
                    <Link className="btn btn-ghost btn-sm" to={`/customer/contracts/${c.id}`}>
                      <Eye size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
