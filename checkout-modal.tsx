'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, CreditCard, Loader2, ShieldCheck } from 'lucide-react'

type Stage = 'form' | 'processing' | 'done'

export function CheckoutModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [stage, setStage] = useState<Stage>('form')

  function handleClose(next: boolean) {
    onOpenChange(next)
    if (!next) setTimeout(() => setStage('form'), 250)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStage('processing')
    setTimeout(() => setStage('done'), 1600)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {stage === 'done' ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-risk-safe/15 text-risk-safe">
              <Check className="size-6" />
            </span>
            <DialogHeader className="items-center">
              <DialogTitle>Welcome to Pro</DialogTitle>
              <DialogDescription>
                Your subscription is active. Unlimited scans and the PDF parser are unlocked.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => handleClose(false)} className="mt-2 w-full">
              Start scanning
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" />
                Upgrade to ContractGuard Pro
              </DialogTitle>
              <DialogDescription>
                $15/month · Unlimited scans, PDF parser, custom counter-clauses, and exports.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cc-email">Email</Label>
                <Input id="cc-email" type="email" required placeholder="you@studio.com" disabled={stage === 'processing'} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cc-number">Card number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="cc-number"
                    inputMode="numeric"
                    required
                    placeholder="4242 4242 4242 4242"
                    className="pl-9"
                    disabled={stage === 'processing'}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cc-exp">Expiry</Label>
                  <Input id="cc-exp" required placeholder="MM / YY" disabled={stage === 'processing'} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cc-cvc">CVC</Label>
                  <Input id="cc-cvc" required placeholder="123" disabled={stage === 'processing'} />
                </div>
              </div>

              <DialogFooter className="mt-1">
                <Button type="submit" className="w-full gap-2 glow-primary" disabled={stage === 'processing'}>
                  {stage === 'processing' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Processing…
                    </>
                  ) : (
                    <>Subscribe · $15/mo</>
                  )}
                </Button>
              </DialogFooter>
              <p className="text-center text-xs text-muted-foreground">
                This is a demo checkout — no real payment is processed.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
