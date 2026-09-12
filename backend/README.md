# Backend — Quản lý cho thuê kho quần áo

API viết bằng **Python + FastAPI**, dữ liệu lưu trên **MongoDB** (qua Beanie/PyMongo Async), xác thực bằng **JWT**. JSON trả về dùng camelCase để khớp thẳng với các type trong `frontend/src/kieu/index.ts` — frontend chỉ cần đổi `duLieuMau.ts` sang gọi API, không cần đổi field name hay cấu trúc trang (`trang/quan-tri`, `trang/nhan-vien-kho`, …).

## Cài đặt

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
copy .env.example .env      # rồi sửa JWT_SECRET, MONGO_URI nếu cần
```

Mật khẩu được băm trực tiếp bằng `bcrypt`.

Cần có dịch vụ MongoDB đang chạy cục bộ tại `mongodb://localhost:27017`.

## Chạy server

```bash
uvicorn app.main:app --reload
```

Swagger UI: http://localhost:8000/docs

## Nạp dữ liệu mẫu

```bash
python seed.py
```

Tạo sẵn 4 tài khoản (mật khẩu `123456`): `admin`, `staff`, `ketoan`, `0901234567` (khách hàng), cùng vài khu vực/khách hàng/hợp đồng/hóa đơn mẫu tương ứng `frontend/src/du-lieu/duLieuMau.ts`.

## Cấu trúc

```
app/
  main.py        FastAPI app + đăng ký router
  config.py      Settings đọc từ .env
  database.py    Kết nối Mongo, init Beanie
  security.py    Hash mật khẩu, tạo/giải mã JWT
  deps.py        get_current_user, require_roles(...)
  models/        Beanie Document — 1 file / collection
  schemas/       Pydantic request/response (camelCase)
  services/      Nghiệp vụ: tính tiền thuê, công nợ, báo cáo
  routers/       Endpoint theo từng nhóm chức năng
seed.py          Script nạp dữ liệu mẫu
```

## Nhóm API chính

| Prefix | Vai trò được phép | Nội dung |
|---|---|---|
| `/api/auth` | Ai cũng gọi được | Đăng nhập, lấy thông tin bản thân |
| `/api/users` | admin | Quản trị tài khoản (collection MongoDB: `account`) |
| `/api/areas` | Xem: mọi role đăng nhập · Sửa: admin/staff | Khu vực kho |
| `/api/customers` | admin/staff/accountant | Khách hàng |
| `/api/contracts` | Xem: mọi role · Tạo/sửa: admin/staff | Hợp đồng, tự tính tiền thuê + cập nhật trạng thái khu vực |
| `/api/invoices` | Xem: mọi role · Tạo/thu tiền: admin/accountant | Hóa đơn, thanh toán (hỗ trợ trả nhiều lần) |
| `/api/transactions` | admin/accountant | Phiếu thu – chi |
| `/api/rental-requests` | Tạo: công khai · Duyệt: admin/staff | Đăng ký thuê |
| `/api/prices` | Xem: mọi role · Sửa: admin | Bảng giá thuê |
| `/api/inspections` | admin/staff | Biên bản kiểm kê |
| `/api/reports` | admin/accountant | Doanh thu, tỷ lệ lấp đầy, công nợ, thu–chi |

## Vài quyết định thiết kế cần biết

- **Không tách `warehouses` riêng** như bản thiết kế ban đầu (`Thiết kế.docx`) — frontend hiện coi cả kho là một, chỉ quản lý theo `Area`. Có thể tách lại sau nếu mở rộng nhiều kho.
- **Khóa ngoại là string thường** (`customerId`, `areaId`, …) thay vì `Link` của Beanie, để khớp đúng kiểu `string` bên frontend và đơn giản hơn khi serialize.
- **Xóa mềm cho giao dịch tài chính**: hủy hóa đơn/giao dịch nên chuyển `status` sang hủy thay vì xóa — endpoint xóa cứng hiện chỉ có ở `account` và `areas`.
- Chưa làm: sinh hóa đơn tự động theo kỳ thanh toán (cron/`mark_overdue_invoices` mới chỉ có sẵn hàm, chưa gắn job), export PDF/Excel, endpoint tự-phục-vụ cho khách hàng (`/me/...`), tính thuế TNDN/kỳ khai thuế. Đây là các phần nghiệp vụ đã liệt kê trong `BÁO CÁO BTL...docx` nhưng chưa cấp bách cho bản chạy được đầu tiên.

## Lưu ý

Máy dùng để dựng khung này **chưa có Python cài sẵn** nên code **chưa được chạy thử**. Trước khi tích hợp với frontend, cài Python 3.11+ / pip, chạy theo hướng dẫn trên và kiểm tra qua Swagger UI, báo lại nếu có lỗi để sửa tiếp.
