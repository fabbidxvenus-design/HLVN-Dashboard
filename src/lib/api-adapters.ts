import { normalizeRole, type ChartDataPoint, type KpiData, type Scan, type TopProduct, type TopUser, type UserProfile } from '../types'

interface BackendScan {
  id?: string
  userId?: string
  user_id?: string
  userEmail?: string
  user_email?: string
  title?: string
  product?: string
  ocrRaw?: string
  ocr_text?: string
  ocrStructured?: unknown
  ocr_structured?: unknown
  structured?: unknown
  metadata?: unknown
  fields?: unknown
  imageUrl?: string | null
  image_url?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string
  updated_at?: string
  status?: Scan['status']
}

export interface BackendUser {
  id?: string
  email?: string
  role?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string
  updated_at?: string
  lastLogin?: string | null
  last_login?: string | null
  displayName?: string | null
  display_name?: string | null
  description?: string | null
  phone?: string | null
  jobTitle?: string | null
  job_title?: string | null
  department?: string | null
  company?: string | null
  avatarUrl?: string | null
  avatar_url?: string | null
}

interface BackendSummary {
  totalScans?: number
  totalUsers?: number
  activeUsers?: number
  activeToday?: number
  successRate?: number
  apiCost?: number
}

interface BackendTrendPoint {
  label?: string
  date?: string
  scans?: number
  users?: number
  activeUsers?: number
  cost?: number
}

interface BackendTopProduct {
  product?: string
  title?: string
  name?: string
  productName?: string
  product_name?: string
  lotName?: string
  lot_name?: string
  ocrStructured?: unknown
  ocr_structured?: unknown
  structured?: unknown
  metadata?: unknown
  fields?: unknown
  count?: number
  scans?: number
  percentage?: number
}

interface BackendTopUser {
  userId?: string
  user_id?: string
  email?: string
  userEmail?: string
  user_email?: string
  name?: string | null
  fullName?: string | null
  full_name?: string | null
  displayName?: string | null
  display_name?: string | null
  company?: string | null
  department?: string | null
  avatarUrl?: string | null
  avatar_url?: string | null
  user?: BackendUser | null
  scanCount?: number
  scan_count?: number
  count?: number
  scans?: number
  percentage?: number
}

export interface ApiUsageRow {
  key: string
  description: string
  scanCount: number
  avgLatency: number
  costEstimate: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getConfidenceValues(value: unknown): number[] {
  if (Array.isArray(value)) return value.flatMap(getConfidenceValues)
  if (!isRecord(value)) return []

  const confidence = value.confidence
  const nestedValues = Object.values(value).flatMap(getConfidenceValues)

  return typeof confidence === 'number' ? [confidence, ...nestedValues] : nestedValues
}

function getTextValue(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined

  const trimmed = value.trim()
  return trimmed || undefined
}

function normalizeOcrLabel(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[\s._:\-/]+/g, '')
}

function getFieldValue(record: Record<string, unknown>): string | undefined {
  return getTextValue(record.value)
    ?? getTextValue(record.text)
    ?? getTextValue(record.content)
    ?? getTextValue(record.rawValue)
    ?? getTextValue(record.raw_value)
}

function getStructuredTitle(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const title = getStructuredTitle(item)
      if (title) return title
    }

    return undefined
  }

  if (!isRecord(value)) return undefined

  const directTitle = getTextValue(value.title)
    ?? getTextValue(value.product)
    ?? getTextValue(value.productName)
    ?? getTextValue(value.product_name)
    ?? getTextValue(value.lotName)
    ?? getTextValue(value.lot_name)

  if (directTitle) return directTitle

  const prioritizedLabels = new Set(['tenlo', 'lotname', 'tenhang', 'productname', '商品名'])
  const label = getTextValue(value.label) ?? getTextValue(value.key) ?? getTextValue(value.name) ?? getTextValue(value.field)
  const fieldValue = getFieldValue(value)

  if (label && fieldValue && prioritizedLabels.has(normalizeOcrLabel(label))) return fieldValue

  for (const [key, nestedValue] of Object.entries(value)) {
    if (prioritizedLabels.has(normalizeOcrLabel(key))) {
      const nestedText = getTextValue(nestedValue) ?? (isRecord(nestedValue) ? getFieldValue(nestedValue) : undefined)
      if (nestedText) return nestedText
    }

    const nestedTitle = getStructuredTitle(nestedValue)
    if (nestedTitle) return nestedTitle
  }

  return undefined
}

export function mapScan(scan: BackendScan): Scan {
  const ocrText = scan.ocrRaw ?? scan.ocr_text ?? ''
  const ocrStructured = scan.ocrStructured ?? scan.ocr_structured
  const confidenceValues = getConfidenceValues(ocrStructured)
  const confidence = confidenceValues.length > 0
    ? confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length
    : 0

  return {
    id: scan.id ?? '',
    user_id: scan.userId ?? scan.user_id ?? '',
    user_email: scan.userEmail ?? scan.user_email ?? '—',
    product: scan.product ?? scan.title ?? getStructuredTitle(ocrStructured) ?? 'Không rõ sản phẩm',
    ocr_text: ocrText,
    confidence,
    ocr_structured: ocrStructured,
    structured: scan.structured,
    metadata: scan.metadata,
    fields: scan.fields,
    image_url: scan.imageUrl ?? scan.image_url ?? null,
    status: scan.status ?? (ocrText.length > 5 ? 'success' : 'failed'),
    created_at: scan.createdAt ?? scan.created_at ?? new Date().toISOString(),
    updated_at: scan.updatedAt ?? scan.updated_at ?? new Date().toISOString(),
  }
}

export function mapUser(user: BackendUser): UserProfile {
  return {
    id: user.id ?? '',
    email: user.email ?? '—',
    role: normalizeRole(user.role),
    created_at: user.createdAt ?? user.created_at ?? new Date().toISOString(),
    updated_at: user.updatedAt ?? user.updated_at ?? new Date().toISOString(),
    last_login: user.lastLogin ?? user.last_login ?? null,
    display_name: user.displayName ?? user.display_name ?? null,
    description: user.description ?? null,
    phone: user.phone ?? null,
    job_title: user.jobTitle ?? user.job_title ?? null,
    department: user.department ?? null,
    company: user.company ?? null,
    avatar_url: user.avatarUrl ?? user.avatar_url ?? null,
  }
}

export function mapKpi(summary: BackendSummary): KpiData {
  return {
    totalScans: summary.totalScans ?? 0,
    totalUsers: summary.totalUsers ?? summary.activeUsers ?? 0,
    successRate: summary.successRate ?? 0,
    activeToday: summary.activeToday ?? summary.activeUsers ?? 0,
    scansTrend: 0,
    usersTrend: 0,
    successRateTrend: 0,
    activeTodayTrend: 0,
  }
}

export function mapTrendPoint(point: BackendTrendPoint): ChartDataPoint {
  return {
    date: point.date ?? point.label ?? new Date().toISOString().split('T')[0],
    scans: point.scans ?? 0,
    users: point.users ?? point.activeUsers ?? 0,
  }
}

export function mapTopProduct(item: BackendTopProduct, total = 0): TopProduct {
  const count = item.count ?? item.scans ?? 0
  const ocrStructured = item.ocrStructured ?? item.ocr_structured
  const structured = item.structured
  const metadata = item.metadata
  const fields = item.fields

  const productName = item.product
    ?? item.title
    ?? item.name
    ?? item.productName
    ?? item.product_name
    ?? item.lotName
    ?? item.lot_name
    ?? getStructuredTitle(ocrStructured)
    ?? getStructuredTitle(structured)
    ?? getStructuredTitle(metadata)
    ?? getStructuredTitle(fields)
    ?? 'Không rõ sản phẩm'

  return {
    product: productName,
    count,
    percentage: item.percentage ?? (total > 0 ? (count / total) * 100 : 0),
  }
}

export function mapTopUser(item: BackendTopUser, total = 0): TopUser {
  const user = item.user
  const count = item.scanCount ?? item.scan_count ?? item.count ?? item.scans ?? 0
  const userId = item.userId ?? item.user_id ?? user?.id ?? ''
  const email = item.email ?? item.userEmail ?? item.user_email ?? user?.email ?? '—'
  const displayName = getTextValue(item.displayName)
    ?? getTextValue(item.display_name)
    ?? getTextValue(item.fullName)
    ?? getTextValue(item.full_name)
    ?? getTextValue(item.name)
    ?? getTextValue(user?.displayName)
    ?? getTextValue(user?.display_name)
    ?? null

  return {
    userId,
    email,
    count,
    percentage: item.percentage ?? (total > 0 ? (count / total) * 100 : 0),
    display_name: displayName,
    company: item.company ?? user?.company ?? null,
    department: item.department ?? user?.department ?? null,
    avatar_url: item.avatarUrl ?? item.avatar_url ?? user?.avatarUrl ?? user?.avatar_url ?? null,
  }
}

export function mapApiUsage(row: Record<string, unknown>): ApiUsageRow {
  const key = String(row.key ?? row.keyIndex ?? row.name ?? '—')
  const scanCount = Number(row.scanCount ?? row.count ?? row.scans ?? 0)
  const avgLatency = Number(row.avgLatency ?? row.latency ?? row.averageLatency ?? 0)
  const cost = row.costEstimate ?? row.cost ?? row.apiCost ?? 0

  return {
    key,
    description: String(row.description ?? row.name ?? key),
    scanCount,
    avgLatency,
    costEstimate: typeof cost === 'string' ? cost : `$${Number(cost).toFixed(2)}`,
  }
}
