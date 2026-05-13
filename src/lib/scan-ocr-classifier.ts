import type { Scan } from '../types'

export interface OcrFieldView {
  label: string
  value: string
  confidence?: number | string
}

export interface ClassifiedOcrFields {
  primary: OcrFieldView[]
  secondary: OcrFieldView[]
}

const PRIMARY_LABELS = new Set([
  '商品名',
  '契約no',
  'contractno',
  'ctno',
  'madeinvietnam',
  'origin',
  'xuấtxứ',
])

const STRUCTURED_KEYS = [
  'ocr_structured',
  'structured',
  'metadata',
  'fields',
] as const

const SIZE_KEYS = ['sizes', 'sizeTable', 'size_table', 'quantities'] as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function toText(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed || null
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return null
}

function getFirstText(record: Record<string, unknown>, keys: readonly string[]): string | null {
  for (const key of keys) {
    const value = toText(record[key])
    if (value) return value
  }

  return null
}

function getConfidence(record: Record<string, unknown>): string | number | undefined {
  const confidence = record.confidence ?? record.score ?? record.probability
  return typeof confidence === 'number' || typeof confidence === 'string' ? confidence : undefined
}

function normalizeLabel(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[\s._:\-\/]+/g, '')
}

function isPrimaryLabel(label: string): boolean {
  return PRIMARY_LABELS.has(normalizeLabel(label))
}

function appendField(fields: OcrFieldView[], field: OcrFieldView): OcrFieldView[] {
  const dedupeKey = `${normalizeLabel(field.label)}:${field.value.trim().toLowerCase()}`
  const exists = fields.some((item) => `${normalizeLabel(item.label)}:${item.value.trim().toLowerCase()}` === dedupeKey)
  return exists ? fields : [...fields, field]
}

function extractFieldFromRecord(record: Record<string, unknown>): OcrFieldView | null {
  const label = getFirstText(record, ['label', 'key', 'name', 'field', 'title'])
  const value = getFirstText(record, ['value', 'text', 'content', 'rawValue', 'raw_value'])

  if (!label || !value) return null

  const confidence = getConfidence(record)
  return confidence === undefined ? { label, value } : { label, value, confidence }
}

function extractMapFields(record: Record<string, unknown>): OcrFieldView[] {
  return Object.entries(record).reduce<OcrFieldView[]>((fields, [label, value]) => {
    if (STRUCTURED_KEYS.includes(label as (typeof STRUCTURED_KEYS)[number])) return fields
    if (SIZE_KEYS.includes(label as (typeof SIZE_KEYS)[number])) return fields

    const textValue = toText(value)
    if (textValue) return appendField(fields, { label, value: textValue })

    if (isRecord(value)) {
      const nestedValue = getFirstText(value, ['value', 'text', 'content'])
      if (!nestedValue) return fields

      const confidence = getConfidence(value)
      const field = confidence === undefined
        ? { label, value: nestedValue }
        : { label, value: nestedValue, confidence }
      return appendField(fields, field)
    }

    return fields
  }, [])
}

function extractFields(value: unknown): OcrFieldView[] {
  if (Array.isArray(value)) {
    return value.reduce<OcrFieldView[]>((fields, item) => {
      if (!isRecord(item)) return fields

      const field = extractFieldFromRecord(item)
      return field ? appendField(fields, field) : fields
    }, [])
  }

  if (!isRecord(value)) return []

  const directField = extractFieldFromRecord(value)
  const nestedFields = STRUCTURED_KEYS.flatMap((key) => extractFields(value[key]))
  const mapFields = extractMapFields(value)

  return [...(directField ? [directField] : []), ...nestedFields, ...mapFields].reduce<OcrFieldView[]>(
    (fields, field) => appendField(fields, field),
    [],
  )
}

function formatSizeRow(row: unknown): string | null {
  if (!isRecord(row)) return null

  const size = getFirstText(row, ['size', 'label', 'name', 'key'])
  const quantity = getFirstText(row, ['quantity', 'qty', 'count', 'value', 'text'])

  if (!size || !quantity) return null

  return `${size}: ${quantity}`
}

function formatSizeMap(record: Record<string, unknown>): string[] {
  return Object.entries(record).flatMap(([size, quantity]) => {
    const quantityText = toText(quantity)
    return quantityText ? [`${size}: ${quantityText}`] : []
  })
}

function extractSizeValues(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap((row) => formatSizeRow(row) ?? [])
  if (isRecord(value)) return formatSizeMap(value)
  return []
}

function extractSizeField(value: unknown): OcrFieldView | null {
  if (!isRecord(value)) return null

  const values = SIZE_KEYS.flatMap((key) => extractSizeValues(value[key]))
  const nestedValues = STRUCTURED_KEYS.flatMap((key) => extractSizeField(value[key])?.value.split(', ') ?? [])
  const mergedValues = [...values, ...nestedValues].filter(Boolean)

  if (mergedValues.length === 0) return null

  return { label: 'Size / Số lượng', value: Array.from(new Set(mergedValues)).join(', ') }
}

function getStructuredPayloads(scan: Scan): unknown[] {
  return STRUCTURED_KEYS.flatMap((key) => {
    const value = scan[key]
    return value === undefined ? [] : [value]
  })
}

export function classifyOcrFields(scan: Scan): ClassifiedOcrFields {
  const payloads = getStructuredPayloads(scan)
  const sizeField = payloads.reduce<OcrFieldView | null>((field, payload) => field ?? extractSizeField(payload), null)
  const allFields = payloads
    .flatMap(extractFields)
    .reduce<OcrFieldView[]>((fields, field) => appendField(fields, field), [])

  const primary = allFields
    .filter((field) => isPrimaryLabel(field.label))
    .reduce<OcrFieldView[]>((fields, field) => appendField(fields, field), sizeField ? [sizeField] : [])

  const secondary = allFields
    .filter((field) => !isPrimaryLabel(field.label))
    .reduce<OcrFieldView[]>((fields, field) => appendField(fields, field), [])

  return { primary, secondary }
}
