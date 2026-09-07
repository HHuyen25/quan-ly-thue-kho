# Backend — Quản lý cho thuê kho quần áo

**Chưa triển khai.** Thư mục này chỉ là chỗ dành sẵn cho API (REST / Nest / Spring / …).

Hiện toàn bộ dữ liệu demo nằm ở frontend: `frontend/src/du-lieu/duLieuMau.ts`, xác thực giả lập qua `frontend/src/boi-canh/BoiCanhXacThuc.tsx`.

## Khi làm backend

Gợi ý các nhóm API:

- Xác thực / phiên đăng nhập
- Khu vực kho, khách hàng, hợp đồng
- Hóa đơn, công nợ, thu–chi, thuế
- Yêu cầu thuê, kiểm kê

Frontend sẽ thay nguồn mock bằng gọi API, không cần đổi cấu trúc trang (`trang/quan-tri`, `trang/nhan-vien-kho`, …).
