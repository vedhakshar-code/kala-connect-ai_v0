'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useStore } from '@/lib/store'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

export default function WishlistPage() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-3">
        <Heart className="h-8 w-8 fill-secondary text-secondary" />
        <h1 className="font-serif text-4xl font-bold text-secondary">
          Your Wishlist
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 grid place-items-center rounded-3xl border border-dashed border-border py-20 text-center">
          <Heart className="h-12 w-12 text-muted-foreground" />
          <p className="mt-3 font-serif text-xl font-semibold">
            No saved crafts yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap the heart on any piece to save it for later.
          </p>
          <Link
            href="/marketplace"
            className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Find something you love
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
