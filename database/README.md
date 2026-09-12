# MongoDB — dữ liệu khởi tạo

Phần này **không phải backend**. Nó chỉ là script Mongo Shell cũ để tạo một phần dữ liệu minh họa. Script này thiếu các collection cần cho API (tài khoản, hóa đơn, giao dịch, yêu cầu thuê và kiểm kê), nên không dùng nó để khởi tạo backend hiện tại.

## Khởi tạo

Đảm bảo MongoDB đang chạy, sau đó tại thư mục `backend` chạy:

```bash
python seed.py
```

`backend/seed.py` tạo database `quan_ly_thue_kho`, toàn bộ collection của API, các chỉ mục cần thiết và dữ liệu đăng nhập mẫu. Lưu ý: script seed sẽ xóa dữ liệu trong các collection của ứng dụng trước khi thêm lại dữ liệu mẫu.

Ứng dụng frontend hiện vẫn chạy bằng dữ liệu mẫu tại `frontend/src/du-lieu/duLieuMau.ts`; không gọi API và không cần backend.
