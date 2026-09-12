'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useStore } from '@/lib/store'

export function Hero() {
  const { t } = useStore()

  return (
    <section className="relative isolate overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1605196560547-b2f7281b7355?q=80&w=2000&auto=format&fit=crop"
        alt="Indian artisan hand-painting traditional folk art"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        crossOrigin="anonymous"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary/95 via-secondary/80 to-terracotta/50" />

      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-white/10 px-4 py-1.5 text-sm font-medium text-cream backdrop-blur">
          <Sparkles className="h-4 w-4 text-accent" />
          AI-powered marketplace for Indian artisans
        </span>

        <h1 className="mt-6 max-w-3xl text-balance font-serif text-5xl font-bold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
          {t('heroTitle')}
          <span className="mt-2 block text-accent">Woven by Real Hands.</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-cream/85">
          Discover Madhubani, Blue Pottery, Kalamkari, Mysore Silk and Warli —
          crafted in India&apos;s villages, matched to buyers worldwide by AI.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
          >
            {t('shopNow')}
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-cream backdrop-blur transition-colors hover:bg-white/20"
          >
            {t('meetArtisans')}
          </Link>
        </div>

        <p className="mt-10 font-serif text-lg italic text-accent">
          “{t('tagline')}”
        </p>
      </div>
    </section>
  )
}
