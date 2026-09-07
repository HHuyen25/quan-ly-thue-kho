import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Plus, Pencil, Trash2 } from 'lucide-react';
import { areas as seedAreas } from '../../du-lieu/duLieuMau';
import type { Area, AreaStatus, AreaType } from '../../kieu';
import { areaTypeLabel, formatMoney } from '../../thu-vien/dinhDang';
import { NhanTrangThaiKhuVuc } from '../../thanh-phan/NhanTrangThai';
import { HopThoai } from '../../thanh-phan/HopThoai';
import { BanDoKho } from '../../thanh-phan/BanDoKho';
import { xuatCsv } from '../../thu-vien/xuatCsv';

const emptyForm = {
  name: '',
  areaM2: '',
  type: 'Ke' as AreaType,
  location: '',
  note: '',
};

export function QuanLyKho() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState<Area[]>(seedAreas);
  const [statusFilter, setStatusFilter] = useState<AreaStatus | 'All'>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(
    () => (statusFilter === 'All' ? areas : areas.filter((a) => a.status === statusFilter)),
    [areas, statusFilter],
  );

  function save() {
    if (!form.name.trim() || !form.areaM2) {
      setError('Vui lòng nhập đầy đủ các trường bắt buộc.');
      return;
    }
    const existing = areas.find((area) => area.id === editingId);
    const next: Area = {
      id: existing?.id ?? `a${Date.now()}`,
      code: existing?.code ?? `KV-${String(areas.length + 1).padStart(3, '0')}`,
      name: form.name.trim(),
      areaM2: Number(form.areaM2),
      type: form.type,
      status: existing?.status ?? 'Trong',
      location: form.location,
      note: form.note,
      // Khu mới xuất hiện ở cuối sơ đồ, không đè lên các khu đã có.
      map: existing?.map ?? { floor: 1, row: 9, col: 10, rowSpan: 1, colSpan: 3 },
    };
    setAreas((prev) => (existing ? prev.map((area) => (area.id === next.id ? next : area)) : [...prev, next]));
    setOpen(false);
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  }

  function moThem() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setOpen(true);
  }

  function moSua(area: Area) {
    setEditingId(area.id);
    setForm({ name: area.name, areaM2: String(area.areaM2), type: area.type, location: area.location, note: area.note ?? '' });
    setError(null);
    setOpen(true);
  }

  function xoa(area: Area) {
    if (!window.confirm(`Xóa khu vực ${area.code}? Thao tác này chỉ thay đổi dữ liệu đang mở trên giao diện.`)) return;
    setAreas((prev) => prev.filter((item) => item.id !== area.id));
    if (selectedId === area.id) setSelectedId(null);
  }

  function xuatDanhSach() {
    xuatCsv('danh-sach-khu-vuc-kho', ['Mã khu vực', 'Tên khu vực', 'Diện tích (m²)', 'Loại', 'Vị trí', 'Trạng thái'], filtered.map((area) => [area.code, area.name, area.areaM2, areaTypeLabel[area.type], area.location, area.status]));
  }

  return (
    <div className="stack">
      <div className="panel">
        <div className="panel-bd">
          <BanDoKho
            areas={areas}
            mode="xem"
            selectedId={selectedId}
            onSelect={(a) => setSelectedId(a.id)}
            title="Bản đồ kho — xem trạng thái ô thuê"
          />
          {selectedId && (() => {
            const selected = areas.find((area) => area.id === selectedId);
            if (!selected) return null;
            return (
              <div className="ban-do-kho__quick-action">
                <span>
                  {selected.status === 'Trong'
                    ? `Đã chọn ${selected.code}. Bạn có thể tạo hợp đồng ngay cho ${selected.areaM2} m².`
                    : `${selected.code} hiện không còn trống, không thể tạo hợp đồng mới.`}
                </span>
                {selected.status === 'Trong' && (
                  <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin/contracts', { state: { areaId: selected.id, openCreate: true } })}>
                    Tạo hợp đồng cho khu này
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AreaStatus | 'All')}
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="Trong">Đang trống</option>
            <option value="DaThue">Đang cho thuê</option>
            <option value="BaoTri">Đang bảo dưỡng</option>
          </select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-secondary" onClick={xuatDanhSach}>
            <Download size={16} /> Xuất Excel
          </button>
          <button className="btn btn-primary" onClick={moThem}>
            <Plus size={16} /> Thêm khu vực
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Mã KV</th>
                <th>Tên khu vực</th>
                <th>Diện tích</th>
                <th>Loại</th>
                <th>Vị trí</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelectedId(a.id)}
                  style={{ cursor: 'pointer', background: selectedId === a.id ? '#f0f7f4' : undefined }}
                >
                  <td>{a.code}</td>
                  <td>{a.name}</td>
                  <td>{a.areaM2} m²</td>
                  <td>{areaTypeLabel[a.type]}</td>
                  <td>{a.location}</td>
                  <td>
                    <NhanTrangThaiKhuVuc status={a.status} />
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-ghost btn-sm" title={`Sửa ${a.code}`} onClick={(event) => { event.stopPropagation(); moSua(a); }}>
                        <Pencil size={14} />
                      </button>
                      <button className="btn btn-ghost btn-sm" title={`Xóa ${a.code}`} onClick={(event) => { event.stopPropagation(); xoa(a); }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>
            Hiển thị 1–{filtered.length} / {filtered.length} khu vực
          </span>
          <span>Đơn giá tham chiếu: Kệ {formatMoney(150000)}/m²</span>
        </div>
      </div>

      <HopThoai
        open={open}
        title={editingId ? 'Cập nhật khu vực kho' : 'Thêm khu vực kho'}
          onClose={() => {
            setOpen(false);
            setEditingId(null);
            setError(null);
        }}
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
        {error && <div className="error-box">{error}</div>}
        <div className="field">
          <label>Mã khu vực</label>
          <input value={editingId ? areas.find((area) => area.id === editingId)?.code : `KV-${String(areas.length + 1).padStart(3, '0')}`} disabled />
        </div>
        <div className="field">
          <label>
            Tên khu vực <span className="req">*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="VD: Kệ tầng 1 - Dãy D"
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label>
              Diện tích (m²) <span className="req">*</span>
            </label>
            <input
              type="number"
              value={form.areaM2}
              onChange={(e) => setForm({ ...form, areaM2: e.target.value })}
              placeholder="100"
            />
          </div>
          <div className="field">
            <label>Loại khu vực</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as AreaType })}>
              <option value="Ke">Kệ</option>
              <option value="Treo">Treo</option>
              <option value="KeVIP">Kệ VIP</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label>Vị trí</label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="VD: Khu kho · dãy trái"
          />
        </div>
        <div className="field">
          <label>Ghi chú</label>
          <textarea
            rows={3}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </div>
      </HopThoai>
    </div>
  );
}
