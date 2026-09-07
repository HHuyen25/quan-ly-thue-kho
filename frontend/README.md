# Frontend — Quản lý cho thuê kho quần áo

Ứng dụng giao diện (React + Vite + TypeScript). Dữ liệu demo trong `src/du-lieu/duLieuMau.ts`. Backend chưa kết nối.

## Chạy

```bash
cd frontend
npm install
npm run dev
```

Mở http://localhost:5173

## Tài khoản demo (mật khẩu: `123456`)

| Vai trò | Username | Màn hình |
|--------|----------|----------|
| Quản trị | `admin` | Tổng quan, Kho, KH, HĐ, Kế toán, Báo cáo, Cài đặt, Tài khoản |
| Nhân viên kho | `staff` | Tổng quan kho, Khu vực, Kiểm kê, Yêu cầu thuê |
| Kế toán | `ketoan` | Tổng quan, Hóa đơn, Công nợ, Thu–Chi, Thuế, Báo cáo |
| Khách hàng | `0901234567` | Tổng quan, HĐ, Chi tiết HĐ, Hóa đơn, Công nợ, Thanh toán |

## Cấu trúc `src/`

```
src/
  main.tsx                 ← điểm vào Vite
  UngDung.tsx              ← định tuyến & vỏ từng vai trò
  thanh-phan/              ← HopThoai, TheThongKe, NhanTrangThai
  bo-cuc/                  ← BoCucUngDung
  boi-canh/                ← BoiCanhXacThuc (xác thực giả lập)
  du-lieu/duLieuMau.ts     ← dữ liệu demo
  thu-vien/dinhDang.ts     ← định dạng tiền/ngày, nhãn
  kieu/                    ← kiểu TypeScript
  kieu-dang/toanCuc.css    ← CSS toàn cục
  trang/
    dang-nhap/
    quan-tri/
    nhan-vien-kho/
    ke-toan/
    khach-hang/
  assets/
```
