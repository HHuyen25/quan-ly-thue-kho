import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  BarChart3,
  ClipboardCheck,
  FileText,
  Inbox,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
  Wallet,
  Warehouse,
  CreditCard,
  FileSpreadsheet,
  Landmark,
  UserCircle,
} from 'lucide-react';
import { NhaCungCapXacThuc, dungXacThuc } from './boi-canh/BoiCanhXacThuc';
import { BoCucUngDung, type MucDieuHuong } from './bo-cuc/BoCucUngDung';
import type { Role } from './kieu';
import { DangNhap } from './trang/dang-nhap/DangNhap';
import { TongQuan as TongQuanQuanTri } from './trang/quan-tri/TongQuan';
import { QuanLyKho } from './trang/quan-tri/QuanLyKho';
import { QuanLyKhachHang } from './trang/quan-tri/QuanLyKhachHang';
import { QuanLyHopDong } from './trang/quan-tri/QuanLyHopDong';
import { CaiDatHeThong } from './trang/quan-tri/CaiDatHeThong';
import { KeToan } from './trang/quan-tri/KeToan';
import { TaiKhoan } from './trang/quan-tri/TaiKhoan';
import { TongQuan as TongQuanNhanVien } from './trang/nhan-vien-kho/TongQuan';
import { KiemKeKho } from './trang/nhan-vien-kho/KiemKeKho';
import { YeuCauThue } from './trang/nhan-vien-kho/YeuCauThue';
import { TongQuan as TongQuanKeToan } from './trang/ke-toan/TongQuan';
import { QuanLyHoaDon } from './trang/ke-toan/QuanLyHoaDon';
import { CongNo as CongNoKeToan } from './trang/ke-toan/CongNo';
import { ThuChi } from './trang/ke-toan/ThuChi';
import { TheoDoiThue } from './trang/ke-toan/TheoDoiThue';
import { BaoCao } from './trang/ke-toan/BaoCao';
import { TongQuan as TongQuanKhachHang } from './trang/khach-hang/TongQuan';
import { HopDong } from './trang/khach-hang/HopDong';
import { ChiTietHopDong } from './trang/khach-hang/ChiTietHopDong';
import { HoaDon } from './trang/khach-hang/HoaDon';
import { CongNo as CongNoKhachHang } from './trang/khach-hang/CongNo';
import { ThanhToan } from './trang/khach-hang/ThanhToan';
import { DangKyThue } from './trang/khach-hang/DangKyThue';

const homeByRole: Record<Role, string> = {
  admin: '/admin',
  staff: '/staff',
  accountant: '/accountant',
  customer: '/customer',
};

function RequireRole({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { user } = dungXacThuc();
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to={homeByRole[user.role]} replace />;
  return <>{children}</>;
}

function AdminShell() {
  const { pathname } = useLocation();
  const titles: Record<string, string> = {
    '/admin': 'Tổng quan',
    '/admin/areas': 'Quản lý kho',
    '/admin/customers': 'Khách hàng',
    '/admin/contracts': 'Hợp đồng',
    '/admin/accounting': 'Kế toán',
    '/admin/reports': 'Báo cáo',
    '/admin/settings': 'Cài đặt hệ thống',
    '/admin/account': 'Tài khoản',
    '/admin/rental-requests': 'Phê duyệt yêu cầu thuê',
  };
  const nav: MucDieuHuong[] = [
    { to: '/admin', label: 'Tổng quan', icon: LayoutDashboard },
    { to: '/admin/areas', label: 'Quản lý kho', icon: Warehouse },
    { to: '/admin/customers', label: 'Khách hàng', icon: Users },
    { to: '/admin/contracts', label: 'Hợp đồng', icon: FileText },
    { to: '/admin/rental-requests', label: 'Duyệt yêu cầu thuê', icon: Inbox },
    { to: '/admin/accounting', label: 'Kế toán', icon: Wallet },
    { to: '/admin/reports', label: 'Báo cáo', icon: BarChart3 },
    { to: '/admin/settings', label: 'Cài đặt', icon: Settings },
    { to: '/admin/account', label: 'Tài khoản', icon: UserCircle },
  ];
  return (
    <BoCucUngDung
      title={titles[pathname] || 'Quản trị'}
      subtitle="Admin"
      brandSub="Cổng quản trị"
      nav={nav}
    />
  );
}

function StaffShell() {
  const { pathname } = useLocation();
  const titles: Record<string, string> = {
    '/staff': 'Tổng quan kho',
    '/staff/areas': 'Khu vực kho và kiểm kê',
    '/staff/requests': 'Yêu cầu thuê',
  };
  const nav: MucDieuHuong[] = [
    { to: '/staff', label: 'Tổng quan', icon: LayoutDashboard },
    { to: '/staff/areas', label: 'Khu vực kho và kiểm kê', icon: ClipboardCheck },
    { to: '/staff/requests', label: 'Tiếp nhận yêu cầu thuê', icon: Inbox },
  ];
  return (
    <BoCucUngDung
      title={titles[pathname] || 'Nhân viên kho'}
      subtitle="Nhân viên kho"
      brandSub="Vận hành kho"
      nav={nav}
    />
  );
}

function AccountantShell() {
  const { pathname } = useLocation();
  const titles: Record<string, string> = {
    '/accountant': 'Tổng quan kế toán',
    '/accountant/invoices': 'Hóa đơn',
    '/accountant/debts': 'Công nợ',
    '/accountant/cashflow': 'Thu – Chi',
    '/accountant/tax': 'Theo dõi thuế',
    '/accountant/reports': 'Báo cáo',
  };
  const nav: MucDieuHuong[] = [
    { to: '/accountant', label: 'Tổng quan', icon: LayoutDashboard },
    { to: '/accountant/invoices', label: 'Hóa đơn', icon: Receipt },
    { to: '/accountant/debts', label: 'Công nợ', icon: Wallet },
    { to: '/accountant/cashflow', label: 'Thu – Chi', icon: Landmark },
    { to: '/accountant/tax', label: 'Thuế', icon: FileSpreadsheet },
    { to: '/accountant/reports', label: 'Báo cáo', icon: BarChart3 },
  ];
  return (
    <BoCucUngDung
      title={titles[pathname] || 'Kế toán'}
      subtitle="Kế toán"
      brandSub="Tài chính kho"
      nav={nav}
    />
  );
}

function CustomerShell() {
  const { pathname } = useLocation();
  const titles: Record<string, string> = {
    '/customer': 'Tổng quan thuê kho',
    '/customer/contracts': 'Hợp đồng của tôi',
    '/customer/invoices': 'Hóa đơn',
    '/customer/debts': 'Công nợ',
    '/customer/payment': 'Thanh toán',
    '/customer/rental-request': 'Đăng ký thuê mặt bằng',
  };
  const title =
    titles[pathname] ||
    (pathname.startsWith('/customer/contracts/') ? 'Chi tiết hợp đồng' : 'Khách hàng');
  const nav: MucDieuHuong[] = [
    { to: '/customer', label: 'Tổng quan', icon: LayoutDashboard },
    { to: '/customer/contracts', label: 'Hợp đồng', icon: FileText },
    { to: '/customer/rental-request', label: 'Đăng ký thuê', icon: Warehouse },
    { to: '/customer/invoices', label: 'Hóa đơn', icon: Receipt },
    { to: '/customer/debts', label: 'Công nợ', icon: Wallet },
    { to: '/customer/payment', label: 'Thanh toán', icon: CreditCard },
  ];
  return (
    <BoCucUngDung title={title} subtitle="Khách hàng" brandSub="Cổng khách hàng" nav={nav} />
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<DangNhap />} />
      <Route path="/" element={<RootRedirect />} />

      <Route
        path="/admin"
        element={
          <RequireRole roles={['admin']}>
            <AdminShell />
          </RequireRole>
        }
      >
        <Route index element={<TongQuanQuanTri />} />
        <Route path="areas" element={<QuanLyKho />} />
        <Route path="customers" element={<QuanLyKhachHang />} />
        <Route path="contracts" element={<QuanLyHopDong />} />
        <Route path="accounting" element={<KeToan />} />
        <Route path="reports" element={<BaoCao />} />
        <Route path="settings" element={<CaiDatHeThong />} />
        <Route path="account" element={<TaiKhoan />} />
        <Route path="rental-requests" element={<YeuCauThue mode="pheDuyet" />} />
      </Route>

      <Route
        path="/staff"
        element={
          <RequireRole roles={['staff', 'admin']}>
            <StaffShell />
          </RequireRole>
        }
      >
        <Route index element={<TongQuanNhanVien />} />
        <Route path="areas" element={<KiemKeKho />} />
        <Route path="inspection" element={<Navigate to="/staff/areas" replace />} />
        <Route path="requests" element={<YeuCauThue mode="tiepNhan" />} />
      </Route>

      <Route
        path="/accountant"
        element={
          <RequireRole roles={['accountant', 'admin']}>
            <AccountantShell />
          </RequireRole>
        }
      >
        <Route index element={<TongQuanKeToan />} />
        <Route path="invoices" element={<QuanLyHoaDon />} />
        <Route path="debts" element={<CongNoKeToan />} />
        <Route path="cashflow" element={<ThuChi />} />
        <Route path="tax" element={<TheoDoiThue />} />
        <Route path="reports" element={<BaoCao />} />
      </Route>

      <Route
        path="/customer"
        element={
          <RequireRole roles={['customer']}>
            <CustomerShell />
          </RequireRole>
        }
      >
        <Route index element={<TongQuanKhachHang />} />
        <Route path="contracts" element={<HopDong />} />
        <Route path="contracts/:id" element={<ChiTietHopDong />} />
        <Route path="invoices" element={<HoaDon />} />
        <Route path="debts" element={<CongNoKhachHang />} />
        <Route path="payment" element={<ThanhToan />} />
        <Route path="rental-request" element={<DangKyThue />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function RootRedirect() {
  const { user } = dungXacThuc();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={homeByRole[user.role]} replace />;
}

export default function UngDung() {
  return (
    <NhaCungCapXacThuc>
      <AppRoutes />
    </NhaCungCapXacThuc>
  );
}
