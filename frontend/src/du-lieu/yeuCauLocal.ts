import { rentalRequests as seed } from './duLieuMau';
import type { RentalRequest } from '../kieu';

const KEY = 'thue-kho-rental-requests';

export function taiYeuCau(): RentalRequest[] {
  try {
    const value = localStorage.getItem(KEY);
    return value ? JSON.parse(value) as RentalRequest[] : seed;
  } catch {
    return seed;
  }
}

export function luuYeuCau(rows: RentalRequest[]) {
  localStorage.setItem(KEY, JSON.stringify(rows));
}
