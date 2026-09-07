/** Xuất dữ liệu đang hiển thị thành CSV. Chạy hoàn toàn trên trình duyệt. */
export function xuatCsv(tieuDe: string, cot: string[], dong: Array<Array<string | number>>) {
  const bao = (giaTri: string | number) => `"${String(giaTri).replaceAll('"', '""')}"`;
  const noiDung = [cot, ...dong].map((row) => row.map(bao).join(',')).join('\n');
  const blob = new Blob([`\ufeff${noiDung}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${tieuDe}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
