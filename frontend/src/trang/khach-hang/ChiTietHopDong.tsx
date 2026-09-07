import { Link, useParams } from 'react-router-dom';
import { areas, contracts, invoices } from '../../du-lieu/duLieuMau';
import { areaTypeLabel, formatDate, formatMoney } from '../../thu-vien/dinhDang';
import { NhanTrangThaiHopDong, NhanTrangThaiThanhToan } from '../../thanh-phan/NhanTrangThai';

export function ChiTietHopDong() {
  const { id } = useParams();
  const contract = contracts.find((c) => c.id === id) || contracts[0];
  const area = areas.find((a) => a.id === contract.areaId);
  const schedule = invoices.filter((i) => i.contractId === contract.id);

  return (
    <div className="stack">
      <div style={{ display: 'flex', gap: 8 }}>
        <Link className="btn btn-secondary" to="/customer/contracts">
          Quay lại
        </Link>
        <button className="btn btn-primary">Gia hạn</button>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <h2>Thông tin chung · {contract.code}</h2>
          <NhanTrangThaiHopDong status={contract.status} />
        </div>
        <div className="panel-bd detail-grid">
          <div className="detail-item">
            <label>Khu vực</label>
            <strong>
              {area?.code} · {area?.name}
            </strong>
          </div>
          <div className="detail-item">
            <label>Diện tích</label>
            <strong>{contract.areaM2} m²</strong>
          </div>
          <div className="detail-item">
            <label>Loại khu vực</label>
            <strong>{area ? areaTypeLabel[area.type] : '—'}</strong>
          </div>
          <div className="detail-item">
            <label>Thời hạn</label>
            <strong>
              {formatDate(contract.startDate)} – {formatDate(contract.endDate)}
            </strong>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <h2>Thông tin tài chính</h2>
        </div>
        <div className="panel-bd">
          <div className="summary-box">
            <div className="row">
              <span>Đơn giá</span>
              <strong>{formatMoney(contract.unitPrice)}/m²/tháng</strong>
            </div>
            <div className="row">
              <span>Tiền thuê</span>
              <strong>{formatMoney(contract.monthlyRent)}</strong>
            </div>
            <div className="row">
              <span>Phí dịch vụ</span>
              <strong>{formatMoney(contract.serviceFee)}</strong>
            </div>
            <div className="row">
              <span>Tiền cọc</span>
              <strong>{formatMoney(contract.deposit)}</strong>
            </div>
            <div className="row total">
              <span>Tổng / kỳ</span>
              <strong>{formatMoney(contract.monthlyRent + contract.serviceFee)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <h2>Lịch sử thanh toán</h2>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Kỳ TT</th>
                <th>Ngày đến hạn</th>
                <th>Tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((i) => (
                <tr key={i.id}>
                  <td>{i.period}</td>
                  <td>{formatDate(i.dueDate)}</td>
                  <td>{formatMoney(i.total)}</td>
                  <td>
                    <NhanTrangThaiThanhToan status={i.status} />
                  </td>
                </tr>
              ))}
              {schedule.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="empty">Chưa có kỳ thanh toán</div>
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
