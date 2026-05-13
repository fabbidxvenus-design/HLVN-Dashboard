import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Avatar, AvatarFallback } from '../ui/avatar'
import type { TopUser } from '../../types'

interface TopUsersTableProps {
  data?: TopUser[]
  loading?: boolean
}

function isUnknownValue(value: string | null | undefined): boolean {
  const normalized = value?.trim().toLowerCase()
  return !normalized || normalized === 'unknown' || normalized === '—'
}

function getDisplayName(user: TopUser, rank: number): string {
  if (!isUnknownValue(user.display_name)) return user.display_name!.trim()
  if (!isUnknownValue(user.email)) return user.email
  return `Người dùng #${rank}`
}

function getInitials(user: TopUser, rank: number): string {
  return getDisplayName(user, rank).slice(0, 2).toUpperCase()
}

function getEmailLine(user: TopUser): string | null {
  return isUnknownValue(user.email) ? null : user.email
}

function getProfileLine(user: TopUser, rank: number): string {
  return [user.company, user.department].filter((value) => !isUnknownValue(value)).join(' • ') || `#${rank}`
}

export function TopUsersTable({ data, loading }: TopUsersTableProps) {
  return (
    <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5">
      <h3 className="mb-4 font-headline text-lg font-semibold text-[var(--color-on-surface)]">
        Người dùng tích cực
      </h3>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[var(--color-outline-variant)]">
            <TableHead className="text-[var(--color-on-surface-variant)]">Người dùng</TableHead>
            <TableHead className="text-right text-[var(--color-on-surface-variant)]">Số lượt</TableHead>
            <TableHead className="text-right text-[var(--color-on-surface-variant)]">Tỷ lệ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className="border-b-0">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--color-surface-container)]" />
                      <div className="h-4 w-32 animate-pulse rounded bg-[var(--color-surface-container)]" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="ml-auto h-4 w-12 animate-pulse rounded bg-[var(--color-surface-container)]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="ml-auto h-4 w-16 animate-pulse rounded bg-[var(--color-surface-container)]" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-[var(--color-on-surface-variant)]">
                Chưa có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            data?.map((item, index) => {
              const rank = index + 1
              const displayName = getDisplayName(item, rank)
              const email = getEmailLine(item)

              return (
                <TableRow
                  key={`${email ?? displayName}:${rank}`}
                  className="border-b-0 transition-colors hover:bg-[var(--color-surface-container)]"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8" src={item.avatar_url ?? undefined} alt={displayName}>
                        <AvatarFallback className="bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] text-xs">
                          {getInitials(item, rank)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-[var(--color-on-surface)]">
                          {displayName}
                        </span>
                        {email && (
                          <span className="truncate text-xs text-[var(--color-on-surface-variant)]">
                            {email}
                          </span>
                        )}
                        <span className="truncate text-xs text-[var(--color-on-surface-variant)]">
                          {getProfileLine(item, rank)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-[var(--color-on-surface)]">
                    {item.count.toLocaleString('vi-VN')}
                  </TableCell>
                  <TableCell className="text-right text-[var(--color-on-surface-variant)]">
                    {item.percentage.toFixed(1)}%
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}