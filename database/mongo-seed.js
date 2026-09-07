// Chạy bằng: mongosh < database/mongo-seed.js
// Đây chỉ là dữ liệu khởi tạo MongoDB, không phải backend/API.
const database = db.getSiblingDB('quan_ly_thue_kho');
const upsertAll = (collection, rows) => collection.bulkWrite(
  rows.map((row) => ({ replaceOne: { filter: { _id: row._id }, replacement: row, upsert: true } })),
);

upsertAll(database.areas, [
  { _id: 'a1', code: 'KV-A01', name: 'Dãy A1', areaM2: 100, type: 'Ke', status: 'DaThue', location: 'Khu kho · dãy trái', map: { floor: 1, row: 1, col: 1, rowSpan: 2, colSpan: 2 } },
  { _id: 'a2', code: 'KV-A02', name: 'Dãy A2', areaM2: 80, type: 'Ke', status: 'Trong', location: 'Khu kho · dãy trái', map: { floor: 1, row: 3, col: 1, rowSpan: 2, colSpan: 2 } },
  { _id: 'a3', code: 'KV-B01', name: 'Dãy B1', areaM2: 60, type: 'Treo', status: 'DaThue', location: 'Khu kho · dãy giữa trái', map: { floor: 1, row: 1, col: 4, rowSpan: 2, colSpan: 2 } },
  { _id: 'a4', code: 'KV-C01', name: 'Kệ trung tâm 1', areaM2: 50, type: 'KeVIP', status: 'DaThue', location: 'Khu kho · dãy trung tâm', map: { floor: 1, row: 1, col: 7, rowSpan: 2, colSpan: 2 } },
  { _id: 'a5', code: 'KV-C02', name: 'Kệ trung tâm 2', areaM2: 50, type: 'Ke', status: 'BaoTri', location: 'Khu kho · dãy trung tâm', map: { floor: 1, row: 3, col: 7, rowSpan: 2, colSpan: 2 } },
  { _id: 'a6', code: 'KV-C03', name: 'Kệ trung tâm 3', areaM2: 40, type: 'Ke', status: 'Trong', location: 'Khu kho · dãy trung tâm', map: { floor: 1, row: 5, col: 7, rowSpan: 2, colSpan: 2 } },
  { _id: 'a7', code: 'KV-D01', name: 'Dãy đóng hàng 1', areaM2: 90, type: 'Ke', status: 'Trong', location: 'Khu kho · phía cuối kho', map: { floor: 1, row: 7, col: 7, rowSpan: 2, colSpan: 3 } },
  { _id: 'a8', code: 'KV-D02', name: 'Dãy đóng hàng 2', areaM2: 45, type: 'KeVIP', status: 'DaThue', location: 'Khu kho · phía cuối kho', map: { floor: 1, row: 7, col: 10, rowSpan: 2, colSpan: 3 } },
  { _id: 'a9', code: 'KV-A03', name: 'Dãy A3', areaM2: 80, type: 'Ke', status: 'Trong', location: 'Khu kho · dãy trái', map: { floor: 1, row: 5, col: 1, rowSpan: 2, colSpan: 2 } },
  { _id: 'a10', code: 'KV-A04', name: 'Dãy A4', areaM2: 60, type: 'Ke', status: 'BaoTri', location: 'Khu kho · dãy trái', map: { floor: 1, row: 7, col: 1, rowSpan: 2, colSpan: 2 } },
  { _id: 'a11', code: 'KV-B02', name: 'Dãy B2', areaM2: 60, type: 'Treo', status: 'Trong', location: 'Khu kho · dãy giữa trái', map: { floor: 1, row: 3, col: 4, rowSpan: 2, colSpan: 2 } },
  { _id: 'a12', code: 'KV-B03', name: 'Dãy B3', areaM2: 50, type: 'Treo', status: 'DaThue', location: 'Khu kho · dãy giữa trái', map: { floor: 1, row: 5, col: 4, rowSpan: 2, colSpan: 2 } },
  { _id: 'a13', code: 'KV-B04', name: 'Dãy B4', areaM2: 50, type: 'Treo', status: 'Trong', location: 'Khu kho · dãy giữa trái', map: { floor: 1, row: 7, col: 4, rowSpan: 2, colSpan: 2 } },
]);

upsertAll(database.customers, [
  { _id: 'c1', code: 'KH001', name: 'Shop Thời Trang Luna', type: 'DoanhNghiep', phone: '0901234567', email: 'luna@shop.vn', taxCode: '0101234567', rentedM2: 160, debt: 15500000, status: 'DangThue' },
  { _id: 'c2', code: 'KH002', name: 'Xưởng may Gia Bảo', type: 'DoanhNghiep', phone: '0912345678', email: 'bao@may.vn', rentedM2: 50, debt: 0, status: 'DangThue' },
  { _id: 'c3', code: 'KH003', name: 'Nguyễn Thị Mai', type: 'CaNhan', phone: '0934567890', email: 'mai@gmail.com', rentedM2: 45, debt: 30000000, status: 'DangThue' },
]);

upsertAll(database.contracts, [
  { _id: 'ct1', code: 'HD001', customerId: 'c1', areaId: 'a1', areaM2: 100, startDate: ISODate('2026-01-01'), endDate: ISODate('2026-12-31'), unitPrice: 150000, monthlyRent: 15000000, serviceFee: 500000, deposit: 30000000, paymentCycle: 'Thang', status: 'DangHieuLuc' },
  { _id: 'ct2', code: 'HD002', customerId: 'c1', areaId: 'a3', areaM2: 60, startDate: ISODate('2026-03-01'), endDate: ISODate('2026-09-30'), unitPrice: 200000, monthlyRent: 12000000, serviceFee: 400000, deposit: 24000000, paymentCycle: 'Thang', status: 'SapHetHan' },
  { _id: 'ct3', code: 'HD003', customerId: 'c2', areaId: 'a4', areaM2: 50, startDate: ISODate('2026-02-01'), endDate: ISODate('2027-01-31'), unitPrice: 250000, monthlyRent: 12500000, serviceFee: 600000, deposit: 25000000, paymentCycle: 'Quy', status: 'DangHieuLuc' },
]);

upsertAll(database.priceTable, [
  { _id: 'p1', type: 'Ke', unitPrice: 150000, unit: 'đồng/m²/tháng', effectiveFrom: ISODate('2026-01-01'), status: 'DangApDung' },
  { _id: 'p2', type: 'Treo', unitPrice: 200000, unit: 'đồng/m²/tháng', effectiveFrom: ISODate('2026-01-01'), status: 'DangApDung' },
  { _id: 'p3', type: 'KeVIP', unitPrice: 250000, unit: 'đồng/m²/tháng', effectiveFrom: ISODate('2026-01-01'), status: 'DangApDung' },
]);

database.areas.createIndex({ code: 1 }, { unique: true });
database.customers.createIndex({ code: 1 }, { unique: true });
database.contracts.createIndex({ code: 1 }, { unique: true });
database.contracts.createIndex({ customerId: 1, areaId: 1, status: 1 });
print(`Đã tạo database ${database.getName()} với ${database.areas.countDocuments()} khu vực kho.`);
