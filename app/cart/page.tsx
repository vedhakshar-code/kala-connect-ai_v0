'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatINR, getArtisan } from '@/lib/data'

export default function CartPage() {
  const { cart, setQty, removeFromCart, cartTotal, clearCart } = useStore()
  const [placed, setPlaced] = useState(false)

  const shipping = cartTotal > 5000 || cartTotal === 0 ? 0 : 150
  const total = cartTotal + shipping

  if (placed) {
    return (
      <div className="mx-auto grid max-w-lg place-items-center px-4 py-24 text-center">
        <CheckCircle2 className="h-16 w-16 text-primary" />
        <h1 className="mt-4 font-serif text-3xl font-bold text-secondary">
          Order placed!
        </h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          This is a demo checkout. Your support directly reaches the artisans
          who made these pieces. Thank you for keeping the craft alive.
        </p>
        <Link
          href="/marketplace"
          className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Continue exploring
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-bold text-secondary">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="mt-8 grid place-items-center rounded-3xl border border-dashed border-border py-20 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          <p className="mt-3 font-serif text-xl font-semibold">
            Your cart is empty
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover handmade treasures from India&apos;s artisans.
          </p>
          <Link
            href="/marketplace"
            className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Browse the Bazaar
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-4">
            {cart.map(({ product, qty }) => {
              const artisan = getArtisan(product.artisanId)
              return (
                <li
                  key={product.id}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
                    crossOrigin="anonymous"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-lg font-semibold leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.craft}
                          {artisan ? ` · by ${artisan.name}` : ''}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-destructive"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-serif text-lg font-bold text-secondary">
                        {formatINR(product.price * qty)}
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
            <button
              onClick={clearCart}
              className="text-sm font-medium text-muted-foreground hover:text-destructive"
            >
              Clear cart
            </button>
          </ul>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl font-semibold">Order Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatINR(cartTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-medium">
                  {shipping === 0 ? 'Free' : formatINR(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-serif text-xl font-bold text-secondary">
                  {formatINR(total)}
                </dd>
              </div>
            </dl>
            <button
              onClick={() => {
                setPlaced(true)
                clearCart()
              }}
              className="mt-6 w-full rounded-full bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-terracotta"
            >
              Demo Checkout
            </button>
            <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Verified
                artisan sellers
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" /> Free shipping over
                ₹5,000
              </li>
            </ul>
          </aside>
        </div>
      )}
    </div>
  )
}
