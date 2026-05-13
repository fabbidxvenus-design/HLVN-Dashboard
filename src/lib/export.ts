import type { Scan, UserProfile } from '../types'

export function exportToCsv(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          const stringValue = value === null || value === undefined ? '' : String(value)
          return stringValue.includes(',') || stringValue.includes('"')
            ? `"${stringValue.replace(/"/g, '""')}"`
            : stringValue
        })
        .join(',')
    ),
  ].join('\n')

  const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function exportScansToCsv(scans: Scan[]) {
  const data = scans.map((scan) => ({
    timestamp: new Date(scan.created_at).toISOString(),
    user: scan.user_email,
    product: scan.product,
    status: scan.status,
    ocr_text: scan.ocr_text,
    confidence: (scan.confidence * 100).toFixed(1) + '%',
  }))
  exportToCsv(data, `scans-export-${new Date().toISOString().split('T')[0]}`)
}

export function exportUsersToCsv(users: UserProfile[]) {
  const data = users.map((user) => ({
    email: user.email,
    role: user.role,
    created_at: new Date(user.created_at).toISOString(),
    last_login: user.last_login ? new Date(user.last_login).toISOString() : '',
  }))
  exportToCsv(data, `users-export-${new Date().toISOString().split('T')[0]}`)
}