import type { ReactNode } from 'react';

interface TheThongKeProps {
  label: string;
  value: string | number;
  hint?: string;
  tone?: 'default' | 'warn' | 'danger' | 'ok';
}

export function TheThongKe({ label, value, hint, tone = 'default' }: TheThongKeProps) {
  return (
    <div className={`stat-card${tone !== 'default' ? ` ${tone}` : ''}`}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}

export function BangDieuKhien({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="panel">
      <div className="panel-hd">
        <h2>{title}</h2>
        {action}
      </div>
      <div className="panel-bd">{children}</div>
    </section>
  );
}
