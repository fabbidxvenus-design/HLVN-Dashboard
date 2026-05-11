'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, ShieldCheck, Activity } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth-store';
import { auth } from '@/lib/api/endpoints';
import { ApiError } from '@/types/api';

const loginSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    clearSession();

    try {
      const response = await auth.login(data.email, data.password);

      if (!response.success) {
        if (response.code === 'FORBIDDEN') {
          setError('root', { message: 'Tài khoản không có quyền truy cập dashboard.' });
          toast.error('Tài khoản không có quyền truy cập dashboard.');
          return;
        }
        setError('root', { message: response.error });
        toast.error(response.error);
        return;
      }

      if (response.data.user.role !== 'admin') {
        setError('root', { message: 'Tài khoản không có quyền truy cập dashboard.' });
        toast.error('Tài khoản không có quyền truy cập dashboard.');
        return;
      }

      setSession(response.data);
      toast.success(`Chào mừng, ${response.data.user.email}!`);
      router.push('/');
    } catch (err) {
      if (err instanceof ApiError) {
        setError('root', { message: err.message });
        toast.error(err.message);
      } else {
        setError('root', { message: 'Đã xảy ra lỗi. Vui lòng thử lại.' });
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — Brand block */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--background-app)] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[var(--primary)]/3 blur-2xl" />
        </div>

        {/* Logo + Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--primary)] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-[var(--text-heading)] tracking-tight">
              HLVN
            </span>
          </div>
          <p className="text-sm text-[var(--text-caption)] mt-1">
            Handwriting Recognition System
          </p>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-[var(--text-heading)] leading-tight mb-4">
            Hệ thống Quản trị<br />vận hành
          </h1>
          <p className="text-base text-[var(--text-body)] max-w-sm mb-8">
            Nền tảng quản lý hoạt động nhận dạng chữ viết tay — theo dõi, phân tích và tối ưu quy trình xử lý.
          </p>

          {/* Feature list */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-[var(--text-body)]">
              <Activity className="w-4 h-4 text-[var(--primary)] shrink-0" />
              <span>Theo dõi real-time scan status</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-body)]">
              <Activity className="w-4 h-4 text-[var(--primary)] shrink-0" />
              <span>Dashboard phân tích người dùng</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-body)]">
              <Activity className="w-4 h-4 text-[var(--primary)] shrink-0" />
              <span>Quản lý API usage & quota</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs text-[var(--text-caption)]">
            Chỉ dành cho quản trị viên được ủy quyền
          </p>
        </div>
      </div>

      {/* Right panel — Login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[var(--surface-elevated)]">
        <div className="w-full max-w-sm">
          {/* Mobile brand header */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-[var(--text-heading)]">HLVN</span>
          </div>

          {/* Form header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--text-heading)] mb-1">
              Đăng nhập
            </h2>
            <p className="text-sm text-[var(--text-caption)]">
              Truy cập trang quản trị HLVN
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Root error */}
            {errors.root && (
              <div className="p-3.5 rounded-[var(--radius-card)] bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                {errors.root.message}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[var(--text-body)]"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@hlvn.vn"
                autoComplete="email"
                aria-label="Email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[var(--text-body)]"
              >
                Mật khẩu
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
                aria-label="Mật khẩu"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </form>

          {/* Mobile footer */}
          <p className="mt-8 text-xs text-center text-[var(--text-caption)] lg:hidden">
            Chỉ dành cho quản trị viên được ủy quyền
          </p>
        </div>
      </div>
    </div>
  );
}