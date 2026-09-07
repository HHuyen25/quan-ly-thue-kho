import type {
  Area,
  Contract,
  Customer,
  Invoice,
  PriceRow,
  RentalRequest,
  Transaction,
  User,
} from '../kieu';

export const users: User[] = [
  {
    id: 'u1',
    username: 'admin',
    password: '123456',
    name: 'Hoàng Thu Huyền',
    role: 'admin',
    email: 'admin@thuekho.vn',
  },
  {
    id: 'u2',
    username: 'staff',
    password: '123456',
    name: 'Lê Văn Hiếu',
    role: 'staff',
    email: 'kho@thuekho.vn',
  },
  {
    id: 'u3',
    username: 'ketoan',
    password: '123456',
    name: 'Lê Ngọc Ánh',
    role: 'accountant',
    email: 'ketoan@thuekho.vn',
  },
  {
    id: 'u4',
    username: '0901234567',
    password: '123456',
    name: 'Shop Thời Trang Luna',
    role: 'customer',
    phone: '0901234567',
    email: 'luna@shop.vn',
    customerId: 'c1',
  },
];

export const areas: Area[] = [
  { id: 'a1', code: 'KV-A01', name: 'Dãy A1', areaM2: 100, type: 'Ke', status: 'DaThue', location: 'Khu kho · dãy trái', map: { floor: 1, row: 1, col: 1, rowSpan: 2, colSpan: 2 } },
  { id: 'a2', code: 'KV-A02', name: 'Dãy A2', areaM2: 80, type: 'Ke', status: 'Trong', location: 'Khu kho · dãy trái', map: { floor: 1, row: 3, col: 1, rowSpan: 2, colSpan: 2 } },
  { id: 'a9', code: 'KV-A03', name: 'Dãy A3', areaM2: 80, type: 'Ke', status: 'Trong', location: 'Khu kho · dãy trái', map: { floor: 1, row: 5, col: 1, rowSpan: 2, colSpan: 2 } },
  { id: 'a10', code: 'KV-A04', name: 'Dãy A4', areaM2: 60, type: 'Ke', status: 'BaoTri', location: 'Khu kho · dãy trái', map: { floor: 1, row: 7, col: 1, rowSpan: 2, colSpan: 2 } },
  { id: 'a3', code: 'KV-B01', name: 'Dãy B1', areaM2: 60, type: 'Treo', status: 'DaThue', location: 'Khu kho · dãy giữa trái', map: { floor: 1, row: 1, col: 4, rowSpan: 2, colSpan: 2 } },
  { id: 'a11', code: 'KV-B02', name: 'Dãy B2', areaM2: 60, type: 'Treo', status: 'Trong', location: 'Khu kho · dãy giữa trái', map: { floor: 1, row: 3, col: 4, rowSpan: 2, colSpan: 2 } },
  { id: 'a12', code: 'KV-B03', name: 'Dãy B3', areaM2: 50, type: 'Treo', status: 'DaThue', location: 'Khu kho · dãy giữa trái', map: { floor: 1, row: 5, col: 4, rowSpan: 2, colSpan: 2 } },
  { id: 'a13', code: 'KV-B04', name: 'Dãy B4', areaM2: 50, type: 'Treo', status: 'Trong', location: 'Khu kho · dãy giữa trái', map: { floor: 1, row: 7, col: 4, rowSpan: 2, colSpan: 2 } },
  { id: 'a4', code: 'KV-C01', name: 'Kệ trung tâm 1', areaM2: 50, type: 'KeVIP', status: 'DaThue', location: 'Khu kho · dãy trung tâm', map: { floor: 1, row: 1, col: 7, rowSpan: 2, colSpan: 2 } },
  { id: 'a5', code: 'KV-C02', name: 'Kệ trung tâm 2', areaM2: 50, type: 'Ke', status: 'BaoTri', location: 'Khu kho · dãy trung tâm', map: { floor: 1, row: 3, col: 7, rowSpan: 2, colSpan: 2 } },
  { id: 'a6', code: 'KV-C03', name: 'Kệ trung tâm 3', areaM2: 40, type: 'Ke', status: 'Trong', location: 'Khu kho · dãy trung tâm', map: { floor: 1, row: 5, col: 7, rowSpan: 2, colSpan: 2 } },
  { id: 'a7', code: 'KV-D01', name: 'Dãy đóng hàng 1', areaM2: 90, type: 'Ke', status: 'Trong', location: 'Khu kho · phía cuối kho', map: { floor: 1, row: 7, col: 7, rowSpan: 2, colSpan: 3 } },
  { id: 'a8', code: 'KV-D02', name: 'Dãy đóng hàng 2', areaM2: 45, type: 'KeVIP', status: 'DaThue', location: 'Khu kho · phía cuối kho', map: { floor: 1, row: 7, col: 10, rowSpan: 2, colSpan: 3 } },
];

export const customers: Customer[] = [
  { id: 'c1', code: 'KH001', name: 'Shop Thời Trang Luna', type: 'DoanhNghiep', phone: '0901234567', email: 'luna@shop.vn', taxCode: '0101234567', rentedM2: 160, debt: 15500000, status: 'DangThue' },
  { id: 'c2', code: 'KH002', name: 'Xưởng may Gia Bảo', type: 'DoanhNghiep', phone: '0912345678', email: 'giabao@may.vn', taxCode: '0109876543', rentedM2: 50, debt: 0, status: 'DangThue' },
  { id: 'c3', code: 'KH003', name: 'Nguyễn Thị Mai', type: 'CaNhan', phone: '0934567890', email: 'mai@gmail.com', rentedM2: 45, debt: 30000000, status: 'DangThue' },
  { id: 'c4', code: 'KH004', name: 'Boutique Ánh', type: 'DoanhNghiep', phone: '0945678901', email: 'anh@boutique.vn', rentedM2: 0, debt: 0, status: 'NgungThue' },
  { id: 'c5', code: 'KH005', name: 'Shop Online Hieu', type: 'CaNhan', phone: '0956789012', email: 'hieu@online.vn', rentedM2: 100, debt: 10000000, status: 'DangThue' },
];

export const contracts: Contract[] = [
  { id: 'ct1', code: 'HD001', customerId: 'c1', areaId: 'a1', areaM2: 100, startDate: '2026-01-01', endDate: '2026-12-31', unitPrice: 150000, monthlyRent: 15000000, serviceFee: 500000, deposit: 30000000, paymentCycle: 'Thang', status: 'DangHieuLuc' },
  { id: 'ct2', code: 'HD002', customerId: 'c1', areaId: 'a3', areaM2: 60, startDate: '2026-03-01', endDate: '2026-09-30', unitPrice: 200000, monthlyRent: 12000000, serviceFee: 400000, deposit: 24000000, paymentCycle: 'Thang', status: 'SapHetHan' },
  { id: 'ct3', code: 'HD003', customerId: 'c2', areaId: 'a4', areaM2: 50, startDate: '2026-02-01', endDate: '2027-01-31', unitPrice: 250000, monthlyRent: 12500000, serviceFee: 600000, deposit: 25000000, paymentCycle: 'Quy', status: 'DangHieuLuc' },
  { id: 'ct4', code: 'HD004', customerId: 'c3', areaId: 'a8', areaM2: 45, startDate: '2025-10-01', endDate: '2026-09-30', unitPrice: 250000, monthlyRent: 11250000, serviceFee: 500000, deposit: 22500000, paymentCycle: 'Thang', status: 'SapHetHan' },
  { id: 'ct5', code: 'HD005', customerId: 'c5', areaId: 'a1', areaM2: 100, startDate: '2025-01-01', endDate: '2025-12-31', unitPrice: 150000, monthlyRent: 15000000, serviceFee: 500000, deposit: 30000000, paymentCycle: 'Thang', status: 'DaKetThuc' },
];

export const invoices: Invoice[] = [
  { id: 'i1', number: 'HD-2026-081', date: '2026-08-01', customerId: 'c1', contractId: 'ct1', period: 'Tháng 8/2026', content: 'Tiền thuê tháng 8 - KV-A01', amountBeforeTax: 15500000, vat: 1550000, total: 17050000, dueDate: '2026-08-05', status: 'ChuaThanhToan', paidAmount: 0 },
  { id: 'i2', number: 'HD-2026-082', date: '2026-08-01', customerId: 'c1', contractId: 'ct2', period: 'Tháng 8/2026', content: 'Tiền thuê tháng 8 - KV-T01', amountBeforeTax: 12400000, vat: 1240000, total: 13640000, dueDate: '2026-08-05', status: 'DaThanhToan', paidAmount: 13640000 },
  { id: 'i3', number: 'HD-2026-071', date: '2026-07-01', customerId: 'c1', contractId: 'ct1', period: 'Tháng 7/2026', content: 'Tiền thuê tháng 7 - KV-A01', amountBeforeTax: 15500000, vat: 1550000, total: 17050000, dueDate: '2026-07-05', status: 'DaThanhToan', paidAmount: 17050000 },
  { id: 'i4', number: 'HD-2026-083', date: '2026-08-01', customerId: 'c3', contractId: 'ct4', period: 'Tháng 8/2026', content: 'Tiền thuê tháng 8 - KV-V02', amountBeforeTax: 11750000, vat: 1175000, total: 12925000, dueDate: '2026-08-05', status: 'QuaHan', paidAmount: 0 },
  { id: 'i5', number: 'HD-2026-084', date: '2026-08-01', customerId: 'c5', contractId: 'ct5', period: 'Tháng 8/2026', content: 'Phí phát sinh cuối hợp đồng', amountBeforeTax: 10000000, vat: 1000000, total: 11000000, dueDate: '2026-08-10', status: 'ThanhToanMotPhan', paidAmount: 5000000 },
  { id: 'i6', number: 'HD-2026-Q3', date: '2026-07-01', customerId: 'c2', contractId: 'ct3', period: 'Quý 3/2026', content: 'Tiền thuê quý 3 - KV-V01', amountBeforeTax: 39300000, vat: 3930000, total: 43230000, dueDate: '2026-07-10', status: 'DaThanhToan', paidAmount: 43230000 },
];

export const transactions: Transaction[] = [
  { id: 't1', date: '2026-08-03', type: 'Thu', category: 'TienThue', customerId: 'c1', contractId: 'ct2', invoiceId: 'i2', amount: 13640000, method: 'ChuyenKhoan', content: 'Thu tiền thuê tháng 8 HD002', status: 'XacNhan' },
  { id: 't2', date: '2026-07-04', type: 'Thu', category: 'TienThue', customerId: 'c1', contractId: 'ct1', invoiceId: 'i3', amount: 17050000, method: 'ChuyenKhoan', content: 'Thu tiền thuê tháng 7 HD001', status: 'XacNhan' },
  { id: 't3', date: '2026-08-05', type: 'Thu', category: 'TienThue', customerId: 'c5', invoiceId: 'i5', amount: 5000000, method: 'TienMat', content: 'Thanh toán một phần HD-2026-084', status: 'XacNhan' },
  { id: 't4', date: '2026-08-01', type: 'Chi', category: 'DienNuoc', amount: 8500000, method: 'ChuyenKhoan', content: 'Thanh toán điện nước tháng 7', status: 'XacNhan' },
  { id: 't5', date: '2026-08-02', type: 'Chi', category: 'BaoTri', amount: 4200000, method: 'ChuyenKhoan', content: 'Sửa chữa kệ tầng 2', status: 'XacNhan' },
  { id: 't6', date: '2026-08-04', type: 'Chi', category: 'BaoVe', amount: 12000000, method: 'ChuyenKhoan', content: 'Chi phí bảo vệ tháng 8', status: 'XacNhan' },
  { id: 't7', date: '2026-08-06', type: 'Chi', category: 'VeSinh', amount: 3500000, method: 'TienMat', content: 'Vệ sinh kho định kỳ', status: 'XacNhan' },
  { id: 't8', date: '2026-07-15', type: 'Thu', category: 'TienThue', customerId: 'c2', invoiceId: 'i6', amount: 43230000, method: 'ChuyenKhoan', content: 'Thu tiền thuê quý 3 HD003', status: 'XacNhan' },
];

export const rentalRequests: RentalRequest[] = [
  { id: 'r1', code: 'YC001', customerName: 'Shop Vintage Hà Nội', phone: '0961112233', email: 'vintage@hn.vn', requestedM2: 70, preferredType: 'Ke', startDate: '2026-09-15', endDate: '2027-09-14', specialRequest: 'Gần cửa, có điều hòa', date: '2026-09-01', status: 'Moi' },
  { id: 'r2', code: 'YC002', customerName: 'Đặng Gia Bảo', phone: '0972223344', email: 'bao@mail.vn', requestedM2: 40, preferredType: 'Treo', startDate: '2026-10-01', endDate: '2027-03-31', date: '2026-08-28', status: 'Moi' },
  { id: 'r3', code: 'YC003', customerName: 'Boutique Sài Gòn', phone: '0983334455', email: 'sg@boutique.vn', requestedM2: 50, preferredType: 'KeVIP', startDate: '2026-09-01', endDate: '2027-08-31', specialRequest: 'Phòng lạnh', date: '2026-08-20', status: 'DaDuyet' },
  { id: 'r4', code: 'YC004', customerName: 'Shop Kids', phone: '0994445566', email: 'kids@shop.vn', requestedM2: 30, preferredType: 'Ke', startDate: '2026-08-01', endDate: '2026-12-31', date: '2026-07-15', status: 'TuChoi', note: 'Không còn diện tích phù hợp' },
];

export const priceTable: PriceRow[] = [
  { id: 'p1', type: 'Ke', unitPrice: 150000, unit: 'đồng/m²/tháng', effectiveFrom: '2026-01-01', status: 'DangApDung' },
  { id: 'p2', type: 'Treo', unitPrice: 200000, unit: 'đồng/m²/tháng', effectiveFrom: '2026-01-01', status: 'DangApDung' },
  { id: 'p3', type: 'KeVIP', unitPrice: 250000, unit: 'đồng/m²/tháng', effectiveFrom: '2026-01-01', status: 'DangApDung' },
];

export const revenueByMonth = [
  { month: 'T3', revenue: 420 },
  { month: 'T4', revenue: 455 },
  { month: 'T5', revenue: 480 },
  { month: 'T6', revenue: 510 },
  { month: 'T7', revenue: 535 },
  { month: 'T8', revenue: 555 },
];

export const fillRateByMonth = [
  { month: 'T3', total: 585, rented: 420, rate: 72 },
  { month: 'T4', total: 585, rented: 450, rate: 77 },
  { month: 'T5', total: 585, rented: 470, rate: 80 },
  { month: 'T6', total: 585, rented: 490, rate: 84 },
  { month: 'T7', total: 585, rented: 505, rate: 86 },
  { month: 'T8', total: 585, rented: 255, rate: 44 },
];
