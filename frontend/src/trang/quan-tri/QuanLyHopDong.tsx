import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Eye } from 'lucide-react';
import { areas as seedAreas, contracts as seed, customers, priceTable } from '../../du-lieu/duLieuMau';
import type { Area, Contract, ContractStatus, PaymentCycle } from '../../kieu';
import { areaTypeLabel, formatDate, formatMoney } from '../../thu-vien/dinhDang';
import { NhanTrangThaiHopDong } from '../../thanh-phan/NhanTrangThai';
import { HopThoai } from '../../thanh-phan/HopThoai';
import { BanDoKho } from '../../thanh-phan/BanDoKho';

export function QuanLyHopDong() {
  const location = useLocation();
  const [areas] = useState<Area[]>(seedAreas);
  const [rows, setRows] = useState<Contract[]>(seed);
  const [statusFilter, setStatusFilter] = useState<ContractStatus | 'All'>('All');
  const [customerFilter, setCustomerFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    customerId: '',
    areaId: '',
    startDate: '2026-09-15',
    endDate: '2027-09-14',
    paymentCycle: 'Thang' as PaymentCycle,
    deposit: '30000000',
    serviceFee: '500000',
  });

  useEffect(() => {
    const state = location.state as { areaId?: string; openCreate?: boolean } | null;
    if (state?.areaId && state.openCreate) {
      setForm((current) => ({ ...current, areaId: state.areaId! }));
      setOpen(true);
      // Không để trạng thái điều hướng cũ tự mở lại hộp thoại khi đổi bộ lọc.
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location.pathname, location.state]);

  const filtered = useMemo(
    () =>
      rows.filter((c) => {
        if (statusFilter !== 'All' && c.status !== statusFilter) return false;
        if (customerFilter !== 'All' && c.customerId !== customerFilter) return false;
        return true;
      }),
    [rows, statusFilter, customerFilter],
  );

  const selectedArea = areas.find((a) => a.id === form.areaId);
  const unitPrice = selectedArea
    ? priceTable.find((p) => p.type === selectedArea.type)?.unitPrice ?? 0
    : 0;
  const monthlyRent = selectedArea ? selectedArea.areaM2 * unitPrice : 0;
  const total = monthlyRent + Number(form.serviceFee || 0);

  function save() {
    if (!form.customerId || !form.areaId || !selectedArea) return;
    if (selectedArea.status !== 'Trong') return;
    const next: Contract = {
      id: `ct${Date.now()}`,
      code: `HD${String(rows.length + 1).padStart(3, '0')}`,
      customerId: form.customerId,
      areaId: form.areaId,
      areaM2: selectedArea.areaM2,
      startDate: form.startDate,
      endDate: form.endDate,
      unitPrice,
      monthlyRent,
      serviceFee: Number(form.serviceFee),
      deposit: Number(form.deposit),
      paymentCycle: form.paymentCycle,
      status: 'DangHieuLuc',
    };
    setRows((p) => [next, ...p]);
    setOpen(false);
  }

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar-left">
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ContractStatus | 'All')}>
            <option value="All">Trạng thái HĐ</option>
            <option value="DangHieuLuc">Đang hiệu lực</option>
            <option value="SapHetHan">Sắp hết hạn</option>
            <option value="DaKetThuc">Đã kết thúc</option>
            <option value="DaHuy">Đã hủy</option>
          </select>
          <select className="filter-select" value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)}>
            <option value="All">Khách hàng</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            <Plus size={16} /> Tạo hợp đồng
          </button>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-bd">
          <BanDoKho
            areas={areas}
            mode="chon-thue"
            choPhepChon={['Trong']}
            title="Chọn trực tiếp ô trống để tạo hợp đồng"
            onSelect={(area) => {
              setForm((current) => ({ ...current, areaId: area.id }));
              setOpen(true);
            }}
          />
        </div>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Mã HĐ</th>
                <th>Khách hàng</th>
                <th>Khu vực</th>
                <th>Diện tích</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Tiền thuê/tháng</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const kh = customers.find((x) => x.id === c.customerId);
                const kv = areas.find((x) => x.id === c.areaId);
                return (
                  <tr key={c.id}>
                    <td>{c.code}</td>
                    <td>{kh?.name}</td>
                    <td>{kv?.code}</td>
                    <td>{c.areaM2} m²</td>
                    <td>{formatDate(c.startDate)}</td>
                    <td>{formatDate(c.endDate)}</td>
                    <td>{formatMoney(c.monthlyRent)}</td>
                    <td>
                      <NhanTrangThaiHopDong status={c.status} />
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>
            Hiển thị 1–{filtered.length} / {rows.length} hợp đồng
          </span>
        </div>
      </div>

      <HopThoai
        open={open}
        title="Tạo hợp đồng mới"
        wide
        onClose={() => setOpen(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpen(false)}>
              Hủy
            </button>
            <button className="btn btn-primary" onClick={save} disabled={!form.customerId || !form.areaId}>
              Lưu
            </button>
          </>
        }
      >
        <div className="field">
          <label>Mã hợp đồng</label>
          <input value={`HD${String(rows.length + 1).padStart(3, '0')}`} disabled />
        </div>
        <div className="field">
          <label>
            Khách hàng <span className="req">*</span>
          </label>
          <select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}>
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
            Chọn chỗ thuê trên bản đồ <span className="req">*</span>
          </label>
          <BanDoKho
            areas={areas}
            mode="chon-thue"
            choPhepChon={['Trong']}
            selectedId={form.areaId || null}
            onSelect={(a) => setForm({ ...form, areaId: a.id })}
            title="Bản đồ kho — chỉ chọn ô đang trống"
          />
        </div>

        {selectedArea && (
          <div className="field-row">
            <div className="field">
              <label>Diện tích</label>
              <input value={`${selectedArea.areaM2} m²`} disabled />
            </div>
            <div className="field">
              <label>Loại khu vực</label>
              <input value={areaTypeLabel[selectedArea.type]} disabled />
            </div>
          </div>
        )}
        <div className="field-row">
          <div className="field">
            <label>
              Ngày bắt đầu <span className="req">*</span>
            </label>
            <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          </div>
          <div className="field">
            <label>
              Ngày kết thúc <span className="req">*</span>
            </label>
            <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Chu kỳ thanh toán</label>
            <select
              value={form.paymentCycle}
              onChange={(e) => setForm({ ...form, paymentCycle: e.target.value as PaymentCycle })}
            >
              <option value="Thang">Theo tháng</option>
              <option value="Quy">Theo quý</option>
              <option value="Nam">Theo năm</option>
            </select>
          </div>
          <div className="field">
            <label>Tiền cọc</label>
            <input type="number" value={form.deposit} onChange={(e) => setForm({ ...form, deposit: e.target.value })} />
          </div>
        </div>
        <div className="summary-box">
          <div className="row">
            <span>Đơn giá</span>
            <strong>{formatMoney(unitPrice)}/m²/tháng</strong>
          </div>
          <div className="row">
            <span>Tiền thuê</span>
            <strong>{formatMoney(monthlyRent)}</strong>
          </div>
          <div className="row">
            <span>Phí dịch vụ</span>
            <strong>{formatMoney(Number(form.serviceFee || 0))}</strong>
          </div>
          <div className="row total">
            <span>Tổng / kỳ</span>
            <strong>{formatMoney(total)}</strong>
          </div>
        </div>
      </HopThoai>
    </div>
  );
}
