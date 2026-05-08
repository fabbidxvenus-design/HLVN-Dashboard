export interface OCRField {
  field: string
  value: string
  confidence?: 'high' | 'medium' | 'low'
  category?: 'main' | 'other'
}

export interface OCRSize {
  size: string
  quantity: number
}

export interface OCRResponse {
  title?: string
  fields?: OCRField[]
  sizes?: OCRSize[]
  rawText?: string
  notes?: string[]
}

export interface TokenUsage {
  input: number
  output: number
  cost: number
}

export interface ScanRecord {
  id: string
  userId: string
  userEmail?: string
  timestamp: string
  imageUrl: string | null
  ocrStructured: OCRResponse
  tokenUsage: TokenUsage
  apiKeyIndex: number
  modelTier?: 'free' | 'default' | 'high' | null
  edited: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ScanDetail {
  scan: ScanRecord
  user: {
    id: string
    email: string
  }
}