import { useMemo } from 'react';
import type { Area, AreaStatus } from '../kieu';
import { areaStatusLabel, areaTypeLabel } from '../thu-vien/dinhDang';

export type CheDoBanDo = 'xem' | 'chon-thue' | 'kiem-ke';

interface BanDoKhoProps {
  areas: Area[];
  /** Trạng thái hiển thị trên ô (mặc định lấy từ area.status) */
  statusById?: Record<string, AreaStatus>;
  selectedId?: string | null;
  onSelect?: (area: Area) => void;
  mode?: CheDoBanDo;
  title?: string;
  /** Chỉ cho chọn các ô có status trong danh sách (vd: ['Trong'] khi thuê) */
  choPhepChon?: AreaStatus[];
}

const FLOOR_COLS = 12;
const FLOOR_ROWS = 9;

export function BanDoKho({
  areas,
  statusById,
  selectedId,
  onSelect,
  mode = 'xem',
  title = 'Bản đồ kho',
  choPhepChon,
}: BanDoKhoProps) {
  const floors = useMemo(
    () => [...new Set(areas.map((a) => a.map.floor))].sort((a, b) => a - b),
    [areas],
  );
  const floor = floors[0] ?? 1;
  const onFloor = areas.filter((a) => a.map.floor === floor);

  function statusOf(a: Area): AreaStatus {
    return statusById?.[a.id] ?? a.status;
  }

  function coTheChon(a: Area): boolean {
    if (!onSelect) return false;
    if (mode === 'kiem-ke') return true;
    if (mode === 'chon-thue') {
      const st = statusOf(a);
      if (choPhepChon) return choPhepChon.includes(st);
      return st === 'Trong';
    }
    return mode === 'xem' ? Boolean(onSelect) : false;
  }

  function handleClick(a: Area) {
    if (!coTheChon(a)) return;
    onSelect?.(a);
  }

  const counts = {
    Trong: areas.filter((a) => statusOf(a) === 'Trong').length,
    DaThue: areas.filter((a) => statusOf(a) === 'DaThue').length,
    BaoTri: areas.filter((a) => statusOf(a) === 'BaoTri').length,
  };

  return (
    <div className="ban-do-kho">
      <div className="ban-do-kho__hd">
        <div>
          <h3>{title}</h3>
          <p className="ban-do-kho__hint">
            {mode === 'chon-thue' && 'Nhấp vào ô đang trống để chọn chỗ thuê.'}
            {mode === 'kiem-ke' && 'Nhấp vào ô trên bản đồ để ghi nhận kiểm kê.'}
            {mode === 'xem' && 'Sơ đồ mặt bằng khu kho; nhấp vào một khu vực để xem chi tiết.'}
          </p>
        </div>
        <span className="ban-do-kho__location">Khu kho · {onFloor.length} khu vực</span>
      </div>

      <div className="ban-do-kho__legend">
        <span className="lg lg-trong">Đang trống ({counts.Trong})</span>
        <span className="lg lg-thue">Đang cho thuê ({counts.DaThue})</span>
        <span className="lg lg-baotri">Đang bảo dưỡng ({counts.BaoTri})</span>
      </div>

      <div className="ban-do-kho__stage">
        <div className="ban-do-kho__warehouse-label">MẶT BẰNG KHU KHO</div>
        <div
          className="ban-do-kho__grid"
          style={{
            gridTemplateColumns: `repeat(${FLOOR_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${FLOOR_ROWS}, minmax(54px, 1fr))`,
          }}
        >
          {onFloor.map((a) => {
            const st = statusOf(a);
            const selectable = coTheChon(a);
            const selected = selectedId === a.id;
            return (
              <button
                key={a.id}
                type="button"
                className={[
                  'ban-do-o',
                  `ban-do-o--${st}`,
                  selectable ? 'ban-do-o--clickable' : 'ban-do-o--locked',
                  selected ? 'ban-do-o--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  gridRow: `${a.map.row} / span ${a.map.rowSpan ?? 1}`,
                  gridColumn: `${a.map.col} / span ${a.map.colSpan ?? 1}`,
                }}
                onClick={() => handleClick(a)}
                disabled={!selectable}
                title={`${a.code} · ${areaStatusLabel[st]}`}
              >
                <strong>{a.code}</strong>
                <span className="ban-do-o__name">{a.name}</span>
                <span className="ban-do-o__meta">
                  {a.areaM2} m² · {areaTypeLabel[a.type]}
                </span>
                <span className={`ban-do-o__status ban-do-o__status--${st}`}>
                  {areaStatusLabel[st]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedId && (
        <div className="ban-do-kho__selected">
          {(() => {
            const a = areas.find((x) => x.id === selectedId);
            if (!a) return null;
            const st = statusOf(a);
            return (
              <>
                Đã chọn: <strong>{a.code}</strong> — {a.name} ({a.areaM2} m²) ·{' '}
                <em>{areaStatusLabel[st]}</em>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
