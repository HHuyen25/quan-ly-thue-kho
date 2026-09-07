# Quản lý cho thuê kho quần áo

Hệ thống quản lý cho thuê kho (đồ án / BTL). Hiện **chỉ có frontend** chạy được; backend là thư mục dự phòng.

## Cấu trúc monorepo

```
quan-ly-thue-kho/
  frontend/     React + Vite + TypeScript (UI đầy đủ, dữ liệu mẫu)
  backend/      Placeholder — API chưa triển khai
```

## Chạy frontend

```bash
cd frontend
npm install
npm run dev
```

Truy cập http://localhost:5173

Tài khoản demo (mật khẩu `123456`): `admin`, `staff`, `ketoan`, `0901234567`.

## Frontend — thư mục nguồn tiếng Việt

| Cũ (EN) | Mới (VI) |
|---------|----------|
| `components/` | `thanh-phan/` |
| `context/` | `boi-canh/` |
| `data/` | `du-lieu/` |
| `layouts/` | `bo-cuc/` |
| `lib/` | `thu-vien/` |
| `pages/` | `trang/` |
| `styles/` | `kieu-dang/` |
| `types/` | `kieu/` |
| `App.tsx` | `UngDung.tsx` |

Trang theo vai trò: `trang/dang-nhap`, `trang/quan-tri`, `trang/nhan-vien-kho`, `trang/ke-toan`, `trang/khach-hang`.

## Backend

Xem `backend/README.md`. Khi có API REST, frontend chỉ cần thay `du-lieu/duLieuMau.ts` bằng gọi HTTP, giữ nguyên các trang.
