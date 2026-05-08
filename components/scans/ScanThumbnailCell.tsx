'use client'

import Image from 'next/image'
import { ImageIcon } from 'lucide-react'

interface ScanThumbnailCellProps {
  imageUrl: string | null
  alt?: string
}

export function ScanThumbnailCell({ imageUrl, alt = 'Scan thumbnail' }: ScanThumbnailCellProps) {
  if (!imageUrl) {
    return (
      <div className="w-16 h-16 flex items-center justify-center bg-[var(--surface)] rounded-[var(--radius-card)] border border-[var(--border)]">
        <ImageIcon className="w-6 h-6 text-[var(--text-muted)]" />
      </div>
    )
  }

  return (
    <div className="w-16 h-16 relative rounded-[var(--radius-card)] overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
      <Image
        src={imageUrl}
        alt={alt}
        width={64}
        height={64}
        className="object-cover w-full h-full"
        unoptimized
      />
    </div>
  )
}