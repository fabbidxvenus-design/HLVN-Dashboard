import type { ApiErrorCode } from '@/types/api';

export const ERROR_MESSAGES: Record<ApiErrorCode | 'NETWORK' | 'UNKNOWN', string> = {
  AUTH_FAILED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  FORBIDDEN: 'Tài khoản không có quyền truy cập dashboard.',
  VALIDATION_ERROR: 'Thông tin đăng nhập không hợp lệ.',
  NOT_FOUND: 'Không tìm thấy dữ liệu.',
  QUOTA_EXCEEDED: 'Đã vượt quá giới hạn sử dụng.',
  PROVIDER_ERROR: 'Lỗi dịch vụ. Vui lòng thử lại sau.',
  RATE_LIMITED: 'Quá nhiều yêu cầu. Vui lòng chờ.',
  INTERNAL_ERROR: 'Đã xảy ra lỗi. Vui lòng thử lại.',
  NETWORK: 'Không thể kết nối đến máy chủ. Vui lòng thử lại.',
  UNKNOWN: 'Đã xảy ra lỗi. Vui lòng thử lại.',
};