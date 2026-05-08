import type { ApiResponse, ApiErrorCode } from '@/types/api';
import type { AuthSession } from '@/types/auth';
import type { UserProfile, UserRole } from '@/types/user';

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const mockAdminUser: UserProfile = {
  id: 'user-001',
  email: 'admin@hlvn.vn',
  role: 'admin',
  createdAt: '2025-01-15T08:00:00.000Z',
  updatedAt: '2025-05-01T10:30:00.000Z',
  lastLogin: '2025-05-07T09:15:00.000Z',
};

export const mockAdminSession: AuthSession = {
  accessToken: 'mock-admin-token-12345',
  refreshToken: 'mock-refresh-token-67890',
  user: mockAdminUser,
};

export const mockNonAdminUser: UserProfile = {
  id: 'user-002',
  email: 'nguyen.van.a@hlvn.vn',
  role: 'user',
  createdAt: '2025-02-20T14:00:00.000Z',
  updatedAt: '2025-04-10T08:45:00.000Z',
  lastLogin: '2025-05-06T16:20:00.000Z',
};

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const mockUsers: UserProfile[] = [
  mockAdminUser,
  mockNonAdminUser,
  {
    id: 'user-003',
    email: 'tran.thi.b@hlvn.vn',
    role: 'manager',
    createdAt: '2025-01-20T09:30:00.000Z',
    updatedAt: '2025-05-05T11:00:00.000Z',
    lastLogin: '2025-05-07T08:00:00.000Z',
  },
  {
    id: 'user-004',
    email: 'le.van.c@hlvn.vn',
    role: 'user',
    createdAt: '2025-03-01T10:00:00.000Z',
    updatedAt: '2025-04-28T15:30:00.000Z',
    lastLogin: '2025-05-06T14:00:00.000Z',
  },
  {
    id: 'user-005',
    email: 'pham.thi.d@hlvn.vn',
    role: 'user',
    createdAt: '2025-03-10T11:00:00.000Z',
    updatedAt: '2025-05-01T09:00:00.000Z',
    lastLogin: '2025-05-05T10:30:00.000Z',
  },
];

// ---------------------------------------------------------------------------
// Scans
// ---------------------------------------------------------------------------

export const mockScans = [
  {
    id: 'scan-001',
    userId: 'user-002',
    userEmail: 'nguyen.van.a@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan001/400/600',
    timestamp: '2025-05-07T10:00:00.000Z',
    ocrStructured: {
      title: 'Sữa tươi Vinamilk 180ml',
      fields: [
        { field: 'Tên sản phẩm', value: 'Sữa tươi Vinamilk 180ml', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '28.000', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '15/06/2025', confidence: 'high', category: 'main' },
        { field: 'Barcode', value: '8934567890123', confidence: 'high', category: 'other' },
      ],
      sizes: [],
      rawText: 'Sữa tươi Vinamilk 180ml\nGiá: 28.000đ\nHSD: 15/06/2025\nBarcode: 8934567890123',
    },
    tokenUsage: { input: 650, output: 200, cost: 0.0017 },
    apiKeyIndex: 1,
    modelTier: 'default',
    edited: false,
    createdAt: '2025-05-07T10:00:00.000Z',
    updatedAt: '2025-05-07T10:00:00.000Z',
  },
  {
    id: 'scan-002',
    userId: 'user-003',
    userEmail: 'tran.thi.b@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan002/400/600',
    timestamp: '2025-05-07T11:30:00.000Z',
    ocrStructured: {
      title: 'Bánh Oreo 133g',
      fields: [
        { field: 'Tên sản phẩm', value: 'Bánh Oreo 133g', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '22.000', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '20/08/2025', confidence: 'high', category: 'main' },
        { field: 'Barcode', value: '4400000000127', confidence: 'high', category: 'other' },
      ],
      sizes: [],
      rawText: 'Bánh Oreo 133g\nGiá: 22.000đ\nHSD: 20/08/2025\nBarcode: 4400000000127',
    },
    tokenUsage: { input: 680, output: 240, cost: 0.00184 },
    apiKeyIndex: 0,
    modelTier: 'default',
    edited: false,
    createdAt: '2025-05-07T11:30:00.000Z',
    updatedAt: '2025-05-07T11:30:00.000Z',
  },
  {
    id: 'scan-003',
    userId: 'user-004',
    userEmail: 'le.van.c@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan003/400/600',
    timestamp: '2025-05-06T14:20:00.000Z',
    ocrStructured: {
      title: 'Mì Hảo Hảo tôm chua cay 75g',
      fields: [
        { field: 'Tên sản phẩm', value: 'Mì Hảo Hảo tôm chua cay 75g', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '6.500', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '10/12/2025', confidence: 'high', category: 'main' },
        { field: 'Barcode', value: '8934567000014', confidence: 'high', category: 'other' },
      ],
      sizes: [],
      rawText: 'Mì Hảo Hảo tôm chua cay 75g\nGiá: 6.500đ\nHSD: 10/12/2025\nBarcode: 8934567000014',
    },
    tokenUsage: { input: 580, output: 200, cost: 0.00156 },
    apiKeyIndex: 2,
    modelTier: 'default',
    edited: false,
    createdAt: '2025-05-06T14:20:00.000Z',
    updatedAt: '2025-05-06T14:20:00.000Z',
  },
  {
    id: 'scan-004',
    userId: 'user-002',
    userEmail: 'nguyen.van.a@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan004/400/600',
    timestamp: '2025-05-06T09:15:00.000Z',
    ocrStructured: {
      title: 'Nước ngọt Coca Cola 330ml',
      fields: [
        { field: 'Tên sản phẩm', value: 'Nước ngọt Coca Cola 330ml', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '12.000', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '05/03/2026', confidence: 'high', category: 'main' },
        { field: 'Barcode', value: '5449000000996', confidence: 'high', category: 'other' },
      ],
      sizes: [],
      rawText: 'Nước ngọt Coca Cola 330ml\nGiá: 12.000đ\nHSD: 05/03/2026\nBarcode: 5449000000996',
    },
    tokenUsage: { input: 660, output: 220, cost: 0.00176 },
    apiKeyIndex: 1,
    modelTier: 'default',
    edited: false,
    createdAt: '2025-05-06T09:15:00.000Z',
    updatedAt: '2025-05-06T09:15:00.000Z',
  },
  {
    id: 'scan-005',
    userId: 'user-003',
    userEmail: 'tran.thi.b@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan005/400/600',
    timestamp: '2025-05-05T16:45:00.000Z',
    ocrStructured: {
      title: 'Bia Tiger lon 330ml',
      fields: [
        { field: 'Tên sản phẩm', value: 'Bia Tiger lon 330ml', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '18.000', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '25/11/2025', confidence: 'high', category: 'main' },
        { field: 'Barcode', value: '8954610000122', confidence: 'high', category: 'other' },
      ],
      sizes: [],
      rawText: 'Bia Tiger lon 330ml\nGiá: 18.000đ\nHSD: 25/11/2025\nBarcode: 8954610000122',
    },
    tokenUsage: { input: 700, output: 200, cost: 0.0018 },
    apiKeyIndex: 0,
    modelTier: 'default',
    edited: false,
    createdAt: '2025-05-05T16:45:00.000Z',
    updatedAt: '2025-05-05T16:45:00.000Z',
  },
  {
    id: 'scan-006',
    userId: 'user-005',
    userEmail: 'pham.thi.d@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan006/400/600',
    timestamp: '2025-05-05T11:00:00.000Z',
    ocrStructured: {
      title: 'Trứng gà ta (vỉ 10 quả)',
      fields: [
        { field: 'Tên sản phẩm', value: 'Trứng gà ta (vỉ 10 quả)', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '38.000', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '20/05/2025', confidence: 'high', category: 'main' },
      ],
      sizes: [{ size: 'Vỉ 10 quả', quantity: 1 }],
      rawText: 'Trứng gà ta vỉ 10 quả\nGiá: 38.000đ\nHSD: 20/05/2025',
    },
    tokenUsage: { input: 550, output: 200, cost: 0.0015 },
    apiKeyIndex: 2,
    modelTier: 'default',
    edited: false,
    createdAt: '2025-05-05T11:00:00.000Z',
    updatedAt: '2025-05-05T11:00:00.000Z',
  },
  {
    id: 'scan-007',
    userId: 'user-004',
    userEmail: 'le.van.c@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan007/400/600',
    timestamp: '2025-05-04T13:30:00.000Z',
    ocrStructured: {
      title: 'Cà phê G7 3in1',
      fields: [
        { field: 'Tên sản phẩm', value: 'Cà phê G7 3in1', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '35.000', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '18/10/2025', confidence: 'high', category: 'main' },
        { field: 'Barcode', value: '8936039070125', confidence: 'high', category: 'other' },
      ],
      sizes: [],
      rawText: 'Cà phê G7 3in1\nGiá: 35.000đ\nHSD: 18/10/2025\nBarcode: 8936039070125',
    },
    tokenUsage: { input: 640, output: 220, cost: 0.00172 },
    apiKeyIndex: 1,
    modelTier: 'default',
    edited: false,
    createdAt: '2025-05-04T13:30:00.000Z',
    updatedAt: '2025-05-04T13:30:00.000Z',
  },
  {
    id: 'scan-008',
    userId: 'user-002',
    userEmail: 'nguyen.van.a@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan008/400/600',
    timestamp: '2025-05-04T08:45:00.000Z',
    ocrStructured: {
      title: 'Xúc xích Vissan 200g',
      fields: [
        { field: 'Tên sản phẩm', value: 'Xúc xích Vissan 200g', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '42.000', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '12/06/2025', confidence: 'high', category: 'main' },
        { field: 'Barcode', value: '8934567890567', confidence: 'high', category: 'other' },
      ],
      sizes: [],
      rawText: 'Xúc xích Vissan 200g\nGiá: 42.000đ\nHSD: 12/06/2025\nBarcode: 8934567890567',
    },
    tokenUsage: { input: 670, output: 220, cost: 0.00178 },
    apiKeyIndex: 0,
    modelTier: 'default',
    edited: false,
    createdAt: '2025-05-04T08:45:00.000Z',
    updatedAt: '2025-05-04T08:45:00.000Z',
  },
  {
    id: 'scan-009',
    userId: 'user-005',
    userEmail: 'pham.thi.d@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan009/400/600',
    timestamp: '2025-05-03T15:00:00.000Z',
    ocrStructured: {
      title: 'Gạo ST25 5kg',
      fields: [
        { field: 'Tên sản phẩm', value: 'Gạo ST25 5kg', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '165.000', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '12/01/2026', confidence: 'high', category: 'main' },
        { field: 'Barcode', value: '8934567000038', confidence: 'high', category: 'other' },
      ],
      sizes: [{ size: '5kg', quantity: 1 }],
      rawText: 'Gạo ST25 5kg\nGiá: 165.000đ\nHSD: 12/01/2026\nBarcode: 8934567000038',
    },
    tokenUsage: { input: 720, output: 220, cost: 0.00188 },
    apiKeyIndex: 2,
    modelTier: 'high',
    edited: false,
    createdAt: '2025-05-03T15:00:00.000Z',
    updatedAt: '2025-05-03T15:00:00.000Z',
  },
  {
    id: 'scan-010',
    userId: 'user-003',
    userEmail: 'tran.thi.b@hlvn.vn',
    imageUrl: 'https://picsum.photos/seed/scan010/400/600',
    timestamp: '2025-05-03T09:30:00.000Z',
    ocrStructured: {
      title: 'Dầu ăn Meizan 1L',
      fields: [
        { field: 'Tên sản phẩm', value: 'Dầu ăn Meizan 1L', confidence: 'high', category: 'main' },
        { field: 'Giá', value: '45.000', confidence: 'high', category: 'main' },
        { field: 'Hạn sử dụng', value: '30/09/2025', confidence: 'high', category: 'main' },
        { field: 'Barcode', value: '8934567890789', confidence: 'high', category: 'other' },
      ],
      sizes: [{ size: '1L', quantity: 1 }],
      rawText: 'Dầu ăn Meizan 1L\nGiá: 45.000đ\nHSD: 30/09/2025\nBarcode: 8934567890789',
    },
    tokenUsage: { input: 650, output: 220, cost: 0.00174 },
    apiKeyIndex: 1,
    modelTier: 'default',
    edited: false,
    createdAt: '2025-05-03T09:30:00.000Z',
    updatedAt: '2025-05-03T09:30:00.000Z',
  },
];

// ---------------------------------------------------------------------------
// Analytics (pre-aggregated — NOT calculated from raw scans)
// ---------------------------------------------------------------------------

export const mockAnalyticsSummary = {
  totalScans: 1847,
  activeUsers: 312,
  totalTokenUsage: 1825000,
  successRate: 98.4,
  averageTokensPerScan: 988,
  scansThisWeek: 423,
  scansThisMonth: 1582,
  newUsersThisMonth: 48,
};

export const mockAnalyticsTrends7d = {
  labels: ['30/04', '01/05', '02/05', '03/05', '04/05', '05/05', '06/05'],
  scans: [156, 202, 178, 245, 289, 312, 423],
  tokens: [145000, 198000, 172000, 240000, 285000, 308000, 415000],
  users: [89, 102, 95, 112, 128, 145, 162],
};

export const mockAnalyticsTrends30d = {
  labels: Array.from({ length: 30 }, (_, i) => {
    const d = new Date('2025-05-07');
    d.setDate(d.getDate() - (29 - i));
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
  }),
  scans: [120, 98, 145, 167, 189, 156, 178, 201, 223, 245, 212, 189, 234, 256, 278, 289, 312, 298, 276, 298, 323, 345, 356, 334, 367, 389, 401, 423, 445, 456],
  tokens: [118000, 96000, 142000, 164000, 186000, 153000, 175000, 198000, 220000, 241000, 208000, 186000, 230000, 251000, 273000, 284000, 307000, 293000, 271000, 293000, 317000, 339000, 350000, 328000, 361000, 382000, 394000, 415000, 437000, 448000],
  users: [78, 62, 89, 95, 102, 88, 96, 105, 112, 118, 105, 98, 112, 120, 128, 134, 142, 138, 128, 138, 145, 152, 158, 148, 162, 168, 172, 178, 182, 188],
};

export const mockTopProducts = [
  { productName: 'Sữa tươi Vinamilk 180ml', scanCount: 312, percentage: 16.9 },
  { productName: 'Mì Hảo Hảo tôm chua cay 75g', scanCount: 278, percentage: 15.0 },
  { productName: 'Bánh Oreo 133g', scanCount: 245, percentage: 13.3 },
  { productName: 'Nước ngọt Coca Cola 330ml', scanCount: 198, percentage: 10.7 },
  { productName: 'Cà phê G7 3in1', scanCount: 187, percentage: 10.1 },
  { productName: 'Bia Tiger lon 330ml', scanCount: 156, percentage: 8.5 },
  { productName: 'Xúc xích Vissan 200g', scanCount: 134, percentage: 7.3 },
  { productName: 'Dầu ăn Meizan 1L', scanCount: 112, percentage: 6.1 },
  { productName: 'Gạo ST25 5kg', scanCount: 98, percentage: 5.3 },
  { productName: 'Trứng gà ta (vỉ 10 quả)', scanCount: 127, percentage: 6.8 },
];

export const mockTopUsers = [
  { userId: 'user-002', email: 'nguyen.van.a@hlvn.vn', scanCount: 456, percentage: 24.7 },
  { userId: 'user-003', email: 'tran.thi.b@hlvn.vn', scanCount: 398, percentage: 21.5 },
  { userId: 'user-005', email: 'pham.thi.d@hlvn.vn', scanCount: 312, percentage: 16.9 },
  { userId: 'user-004', email: 'le.van.c@hlvn.vn', scanCount: 287, percentage: 15.5 },
  { userId: 'user-001', email: 'admin@hlvn.vn', scanCount: 198, percentage: 10.7 },
  { userId: 'user-006', email: 'hoang.van.e@hlvn.vn', scanCount: 156, percentage: 8.4 },
  { userId: 'user-007', email: 'vu.thi.f@hlvn.vn', scanCount: 40, percentage: 2.3 },
];

export const mockApiUsage = {
  totalTokens: 1825000,
  totalCost: 3.65,
  byApiKey: [
    { apiKeyIndex: 0, tokens: 725000, cost: 1.45, scanCount: 734 },
    { apiKeyIndex: 1, tokens: 612000, cost: 1.22, scanCount: 620 },
    { apiKeyIndex: 2, tokens: 488000, cost: 0.98, scanCount: 493 },
  ],
};

// ---------------------------------------------------------------------------
// Mock handlers (return ApiResponse-shaped data)
// ---------------------------------------------------------------------------

function success<T>(data: T, meta?: { hasMore?: boolean; total?: number; page?: number; limit?: number }): ApiResponse<T> {
  return { success: true, data, meta };
}

function errorResp(message: string, code: ApiErrorCode, _status?: number): ApiResponse<never> {
  return { success: false, error: message, code };
}

export const mockHandlers = {
  auth: {
    login: (email: string, _password: string): ApiResponse<AuthSession> => {
      if (email === 'admin@hlvn.vn') {
        return success(mockAdminSession);
      }
      if (mockUsers.some(u => u.email === email)) {
        const user = mockUsers.find(u => u.email === email)!;
        return { success: false, error: 'Tài khoản không có quyền truy cập dashboard.', code: 'FORBIDDEN' };
      }
      return errorResp('Thông tin đăng nhập không hợp lệ.', 'AUTH_FAILED', 401);
    },
    me: (_token?: string): ApiResponse<UserProfile> => {
      return success(mockAdminUser);
    },
    logout: (): ApiResponse<{ message: string }> => {
      return success({ message: 'Đăng xuất thành công' });
    },
  },

  users: {
    list: (params?: { page?: number; limit?: number }): ApiResponse<UserProfile[]> => {
      const page = params?.page ?? 1;
      const limit = params?.limit ?? 10;
      return success(mockUsers, { page, limit, total: mockUsers.length, hasMore: false });
    },
    create: (data: { email: string; role: UserRole }): ApiResponse<UserProfile> => {
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        email: data.email,
        role: data.role,
        createdAt: new Date().toISOString(),
        lastLogin: null,
      };
      return success(newUser);
    },
    updateRole: (id: string, role: UserRole): ApiResponse<UserProfile> => {
      const user = mockUsers.find(u => u.id === id);
      if (!user) return errorResp('Không tìm thấy người dùng.', 'NOT_FOUND', 404);
      return success({ ...user, role, updatedAt: new Date().toISOString() });
    },
    delete: (id: string): ApiResponse<{ message: string }> => {
      if (!mockUsers.find(u => u.id === id)) return errorResp('Không tìm thấy người dùng.', 'NOT_FOUND', 404);
      return success({ message: 'Xóa người dùng thành công' });
    },
  },

  scans: {
    list: (params?: { page?: number; limit?: number; userId?: string }): ApiResponse<typeof mockScans> => {
      const page = params?.page ?? 1;
      const limit = params?.limit ?? 10;
      let filtered = mockScans;
      if (params?.userId) {
        filtered = mockScans.filter(s => s.userId === params.userId);
      }
      return success(filtered, { page, limit, total: filtered.length, hasMore: false });
    },
    detail: (id: string): ApiResponse<typeof mockScans[number]> => {
      const scan = mockScans.find(s => s.id === id);
      if (!scan) return errorResp('Không tìm thấy scan.', 'NOT_FOUND', 404);
      return success(scan);
    },
    delete: (id: string): ApiResponse<{ message: string }> => {
      if (!mockScans.find(s => s.id === id)) return errorResp('Không tìm thấy scan.', 'NOT_FOUND', 404);
      return success({ message: 'Xóa scan thành công' });
    },
  },

  analytics: {
    summary: (_from?: string, _to?: string): ApiResponse<typeof mockAnalyticsSummary> => {
      return success(mockAnalyticsSummary);
    },
    trends: (range: '7d' | '30d', _from?: string, _to?: string): ApiResponse<typeof mockAnalyticsTrends7d | typeof mockAnalyticsTrends30d> => {
      return success(range === '7d' ? mockAnalyticsTrends7d : mockAnalyticsTrends30d);
    },
    topProducts: (_from?: string, _to?: string, limit = 10): ApiResponse<typeof mockTopProducts> => {
      return success(mockTopProducts.slice(0, limit), { hasMore: limit < mockTopProducts.length });
    },
    topUsers: (_from?: string, _to?: string, limit = 10): ApiResponse<typeof mockTopUsers> => {
      return success(mockTopUsers.slice(0, limit), { hasMore: limit < mockTopUsers.length });
    },
    apiUsage: (_from?: string, _to?: string): ApiResponse<typeof mockApiUsage> => {
      return success(mockApiUsage);
    },
  },

  export: {
    excel: (_params?: { from?: string; to?: string; userId?: string }): ApiResponse<{ downloadUrl: string; expiresAt: string }> => {
      return success({
        downloadUrl: `https://mock-hlvn.fake/download/export-${Date.now()}.xlsx`,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      });
    },
  },
};