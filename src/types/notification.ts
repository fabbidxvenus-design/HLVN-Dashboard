import { z } from 'zod'

export const NOTIFICATION_TYPES = [
  'scan_created',
  'scan_deleted',
  'user_created',
  'role_updated',
  'system_error',
] as const

export type NotificationType = (typeof NOTIFICATION_TYPES)[number]

export const NOTIFICATION_SEVERITIES = ['info', 'success', 'warning', 'error'] as const

export type NotificationSeverity = (typeof NOTIFICATION_SEVERITIES)[number]

export interface NotificationItem {
  id: string
  type: NotificationType
  title: string
  description: string
  createdAt: string
  read: boolean
  href?: string
  severity: NotificationSeverity
}

const notificationItemSchema = z.object({
  id: z.string().min(1),
  type: z.enum(NOTIFICATION_TYPES),
  title: z.string().min(1),
  description: z.string().min(1),
  createdAt: z.string().min(1),
  read: z.boolean(),
  href: z
    .string()
    .refine((val) => val.startsWith('/') && !val.startsWith('//'), {
      message: 'href must be an internal path starting with /',
    })
    .optional(),
  severity: z.enum(NOTIFICATION_SEVERITIES),
})

export function validateNotification(data: unknown): NotificationItem | null {
  const result = notificationItemSchema.safeParse(data)
  if (!result.success) return null
  return result.data
}

export function isSafeHref(href: string | undefined): href is string {
  if (!href) return false
  return href.startsWith('/') && !href.startsWith('//')
}
