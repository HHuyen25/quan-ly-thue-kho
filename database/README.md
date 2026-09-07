# MongoDB — dữ liệu khởi tạo

Phần này **không phải backend**. Nó là dữ liệu khởi tạo cho MongoDB, tách riêng khỏi giao diện React để bạn tự kết nối môi trường database khi cần.

## Khởi tạo

Đảm bảo MongoDB đang chạy, sau đó tại thư mục gốc dự án chạy:

```bash
mongosh < database/mongo-seed.js
```

Script tạo database `quan_ly_thue_kho`, các collection `areas`, `customers`, `contracts`, `priceTable` cùng các chỉ mục mã duy nhất. Script chạy lặp lại an toàn: chỉ thêm/cập nhật các bản ghi demo cùng mã, không xóa collection hay dữ liệu khác. Dữ liệu khu vực khớp với sơ đồ kho mới ở frontend: chỉ bao gồm các dãy/kệ trong kho và vẫn có `areaM2`.

Ứng dụng frontend hiện vẫn chạy bằng dữ liệu mẫu tại `frontend/src/du-lieu/duLieuMau.ts`; không gọi API và không cần backend.
