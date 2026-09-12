'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Globe,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Check,
  Palette,
  Store,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore, languages, type LangCode, type Role } from '@/lib/store'

const roleMeta: { value: Role; label: string; icon: typeof Store }[] = [
  { value: 'customer', label: 'Customer', icon: Store },
  { value: 'artisan', label: 'Artisan', icon: Palette },
  { value: 'admin', label: 'Admin', icon: ShieldCheck },
]

export function SiteHeader() {
  const { t, lang, setLang, role, setRole, cartCount, wishlist } = useStore()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)

  const nav = [
    { key: 'home', href: '/' },
    { key: 'marketplace', href: '/marketplace' },
    { key: 'catalog', href: '/ai-catalog' },
    { key: 'linkage', href: '/market-linkage' },
    { key: 'explore', href: '/explore' },
    { key: 'stories', href: '/stories' },
    ...(role === 'admin' ? [{ key: 'admin', href: '/admin', label: 'Admin Portal' }] : []),
  ]


  const currentLang = languages.find((l) => l.code === lang)!
  const currentRole = roleMeta.find((r) => r.value === role)!

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-serif text-xl font-bold shadow-sm">
            K
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-lg font-bold text-secondary">
              KalaConnect
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              AI Marketplace
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="mx-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:bg-muted hover:text-foreground',
                )}
              >
                {(item as { label?: string }).label ?? t(item.key)}
              </Link>

            )
          })}
        </nav>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          {/* Role switcher */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => {
                setRoleOpen((v) => !v)
                setLangOpen(false)
              }}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:border-primary/50"
              aria-haspopup="listbox"
              aria-expanded={roleOpen}
            >
              <currentRole.icon className="h-4 w-4 text-primary" />
              <span className="hidden md:inline">{currentRole.label}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
            {roleOpen && (
              <ul
                className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
                role="listbox"
              >
                {roleMeta.map((r) => (
                  <li key={r.value}>
                    <button
                      onClick={() => {
                        setRole(r.value)
                        setRoleOpen(false)
                      }}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm',
                        role === r.value
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted',
                      )}
                    >
                      <r.icon className="h-4 w-4" />
                      {r.label}
                      {role === r.value && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </button>
                  </li>
                ))}
                {role === 'admin' && (
                  <li className="mt-1 border-t border-border pt-1">
                    <Link
                      href="/admin"
                      onClick={() => setRoleOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-primary hover:bg-muted"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" /> Admin Dashboard
                    </Link>
                  </li>
                )}
                {role === 'artisan' && (
                  <li className="mt-1 border-t border-border pt-1">
                    <Link
                      href="/catalog"
                      onClick={() => setRoleOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-primary hover:bg-muted"
                    >
                      <Palette className="h-3.5 w-3.5" /> AI Smart Catalog
                    </Link>
                  </li>
                )}
              </ul>

            )}
          </div>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setLangOpen((v) => !v)
                setRoleOpen(false)
              }}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium hover:border-primary/50"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Select language"
            >
              <Globe className="h-4 w-4 text-primary" />
              <span className="hidden md:inline">{currentLang.native}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
            {langOpen && (
              <ul
                className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
                role="listbox"
              >
                {languages.map((l) => (
                  <li key={l.code}>
                    <button
                      onClick={() => {
                        setLang(l.code as LangCode)
                        setLangOpen(false)
                      }}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm',
                        lang === l.code
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted',
                      )}
                    >
                      <span>{l.native}</span>
                      <span className="text-xs text-muted-foreground">
                        {l.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            href="/wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-cream lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
            {nav.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-lg px-4 py-3 text-base font-medium',
                    active ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
                  )}
                >
                  {(item as { label?: string }).label ?? t(item.key)}
                </Link>

              )
            })}
            <div className="mt-2 flex gap-2 border-t border-border pt-3">
              {roleMeta.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-sm font-medium',
                    role === r.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border',
                  )}
                >
                  <r.icon className="h-4 w-4" />
                  {r.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
