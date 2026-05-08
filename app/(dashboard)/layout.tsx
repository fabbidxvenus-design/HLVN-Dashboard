'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthSession } from '@/hooks/useAuthSession';
import { DashboardShell } from '@/components/dashboard';
import { Skeleton } from '@/components/ui/skeleton';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/users': 'Người dùng',
  '/scans': 'Lịch sử scan',
  '/analytics': 'Analytics',
};

function LoadingState() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md p-6">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
        <div className="space-y-3 pt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-2/3 mx-auto" />
        </div>
      </div>
    </div>
  );
}

function AccessDeniedState({ message }: { message: string }) {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => router.push('/login'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <p className="text-lg font-medium text-destructive">{message}</p>
        <p className="text-sm text-[var(--text-secondary)]">
          Đang chuyển hướng về trang đăng nhập...
        </p>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated, error } = useAuthSession();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAuthenticated) {
    return <LoadingState />;
  }

  // Non-admin access denied
  if (error) {
    return <AccessDeniedState message={error} />;
  }

  const title = PAGE_TITLES[pathname] ?? 'Dashboard';

  return <DashboardShell title={title}>{children}</DashboardShell>;
}