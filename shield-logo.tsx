import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ShieldLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary glow-primary',
        className,
      )}
      aria-hidden="true"
    >
      <ShieldCheck className="size-5" strokeWidth={2.2} />
    </span>
  )
}
