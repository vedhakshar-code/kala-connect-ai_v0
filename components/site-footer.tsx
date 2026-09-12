import Link from 'next/link'
import { Mail, Send, Share2, Globe } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground font-serif text-xl font-bold">
              K
            </span>
            <span className="font-serif text-xl font-bold">KalaConnect AI</span>
          </div>
          <p className="mt-4 max-w-sm text-pretty text-sm text-secondary-foreground/80 leading-relaxed">
            An AI-powered marketplace empowering traditional Indian artisans —
            connecting handmade heritage with a global audience.
          </p>
          <p className="mt-4 font-serif text-lg text-accent">
            From the Hands of India to the Heart of the World
          </p>
          <div className="mt-5 flex gap-3">
            {[Share2, Send, Globe, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold">Discover</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-secondary-foreground/80">
            <li><Link href="/marketplace" className="hover:text-accent">Marketplace</Link></li>
            <li><Link href="/explore" className="hover:text-accent">Explore India</Link></li>
            <li><Link href="/stories" className="hover:text-accent">Artisan Stories</Link></li>
            <li><Link href="/market-linkage" className="hover:text-accent">Market Linkage</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold">For Artisans</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-secondary-foreground/80">
            <li><Link href="/ai-catalog" className="hover:text-accent">AI Smart Catalog</Link></li>
            <li><Link href="/market-linkage" className="hover:text-accent">Find Buyers</Link></li>
            <li><Link href="/stories" className="hover:text-accent">Share Your Story</Link></li>
            <li><Link href="/admin" className="hover:text-accent">Get Verified</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-secondary-foreground/70 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} KalaConnect AI. Crafted with care in India.</p>
          <p>Supporting 12,000+ artisans across 24 states.</p>
        </div>
      </div>
    </footer>
  )
}
