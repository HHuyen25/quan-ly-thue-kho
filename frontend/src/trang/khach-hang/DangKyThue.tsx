import { useState } from 'react';
import { areas } from '../../du-lieu/duLieuMau';
import type { Area, AreaType } from '../../kieu';
import { BanDoKho } from '../../thanh-phan/BanDoKho';
import { dungXacThuc } from '../../boi-canh/BoiCanhXacThuc';
import { luuYeuCau, taiYeuCau } from '../../du-lieu/yeuCauLocal';

export function DangKyThue() {
  const { user } = dungXacThuc();
  const [selected, setSelected] = useState<Area | null>(null);
  const [form, setForm] = useState({ requestedM2: '', preferredType: 'Ke' as AreaType, startDate: '', endDate: '', note: '' });
  const [sent, setSent] = useState(false);

  function chonKhuVuc(area: Area) {
    setSelected(area);
    setForm((current) => ({ ...current, requestedM2: String(area.areaM2), preferredType: area.type }));
  }

  function guiYeuCau() {
    const rows = taiYeuCau();
    luuYeuCau([{ id: `r${Date.now()}`, code: `YC${String(rows.length + 1).padStart(3, '0')}`, customerName: user?.name ?? 'Khách hàng', phone: user?.phone ?? '', email: user?.email ?? '', requestedM2: Number(form.requestedM2), preferredType: form.preferredType, startDate: form.startDate, endDate: form.endDate, specialRequest: form.note || undefined, date: new Date().toISOString().slice(0, 10), status: 'Moi' }, ...rows]);
    setSent(true);
  }

  if (sent) {
    return <div className="summary-box"><strong>Đã gửi yêu cầu thuê.</strong> Nhân viên kho sẽ tiếp nhận trước, sau đó quản trị viên phê duyệt và phản hồi cho bạn.</div>;
  }

  return (
    <div className="stack">
      <div className="panel"><div className="panel-bd">
        <BanDoKho areas={areas} mode="chon-thue" choPhepChon={['Trong']} selectedId={selected?.id} onSelect={chonKhuVuc} title="Chọn mặt bằng còn trống trên bản đồ" />
      </div></div>
      <div className="panel"><div className="panel-hd"><h2>Đăng ký thuê mặt bằng</h2></div><div className="panel-bd stack">
        <div className="field-row">
          <div className="field"><label>Diện tích yêu cầu (m²) *</label><input type="number" value={form.requestedM2} onChange={(event) => setForm({ ...form, requestedM2: event.target.value })} /></div>
          <div className="field"><label>Loại khu vực</label><select value={form.preferredType} onChange={(event) => setForm({ ...form, preferredType: event.target.value as AreaType })}><option value="Ke">Kệ</option><option value="Treo">Treo</option><option value="KeVIP">Kệ VIP</option></select></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Ngày bắt đầu *</label><input type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} /></div>
          <div className="field"><label>Ngày kết thúc *</label><input type="date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} /></div>
        </div>
        <div className="field"><label>Ghi chú</label><textarea rows={3} value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="Yêu cầu về vị trí, điều hòa..." /></div>
        <div><button className="btn btn-primary" disabled={!form.requestedM2 || !form.startDate || !form.endDate} onClick={guiYeuCau}>Gửi yêu cầu thuê</button></div>
      </div></div>
    </div>
  );
}
