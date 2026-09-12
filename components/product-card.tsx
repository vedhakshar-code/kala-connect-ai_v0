'use client'

import Link from 'next/link'
import { Heart, Star, Plus, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatINR, getArtisan, type Product } from '@/lib/data'
import { useStore } from '@/lib/store'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWished } = useStore()
  const artisan = getArtisan(product.artisanId)
  const wished = isWished(product.id)

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          crossOrigin="anonymous"
        />
        {product.handmade && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-foreground shadow">
            <BadgeCheck className="h-3.5 w-3.5" /> Handmade
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 backdrop-blur transition-colors hover:bg-card"
        >
          <Heart
            className={cn(
              'h-5 w-5 transition-colors',
              wished ? 'fill-secondary text-secondary' : 'text-foreground',
            )}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            {product.craft}
          </span>
          <span className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {product.rating}
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </span>
        </div>

        <h3 className="mt-2 text-pretty font-serif text-lg font-semibold leading-snug">
          {product.name}
        </h3>
        {artisan && (
          <Link
            href={`/stories/${artisan.id}`}
            className="mt-1 text-sm text-muted-foreground hover:text-primary"
          >
            by {artisan.name} · {product.state}
          </Link>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="font-serif text-xl font-bold text-secondary">
            {formatINR(product.price)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </div>
  )
}
