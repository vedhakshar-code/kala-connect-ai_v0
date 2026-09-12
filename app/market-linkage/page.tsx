import {
  Handshake,
  MapPin,
  TrendingUp,
  Users,
  IndianRupee,
  Package,
  ArrowUpRight,
} from 'lucide-react'
import { marketMatches } from '@/lib/data'

const analytics = [
  { icon: IndianRupee, label: 'Revenue this month', value: '₹1,84,500', delta: '+23%' },
  { icon: Package, label: 'Orders fulfilled', value: '142', delta: '+18%' },
  { icon: Users, label: 'New buyers reached', value: '2,310', delta: '+41%' },
  { icon: TrendingUp, label: 'Catalog views', value: '18.7K', delta: '+12%' },
]

const typeColor: Record<string, string> = {
  Boutique: 'bg-primary/10 text-primary',
  Exhibition: 'bg-secondary/10 text-secondary',
  'Export House': 'bg-peacock/10 text-peacock',
  'Online Store': 'bg-accent/25 text-secondary',
}

export default function MarketLinkagePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          <Handshake className="h-4 w-4" /> AI Market Linkage
        </span>
        <h1 className="mt-3 text-balance font-serif text-4xl font-bold text-secondary sm:text-5xl">
          The right buyers, matched to your craft
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Our AI analyses your craft, style and price point, then recommends
          boutiques, exhibitions and export houses most likely to stock your
          work.
        </p>
      </div>

      {/* Analytics */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analytics.map((a) => (
          <div
            key={a.label}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <a.icon className="h-5 w-5" />
              </span>
              <span className="flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                <ArrowUpRight className="h-3 w-3" /> {a.delta}
              </span>
            </div>
            <p className="mt-4 font-serif text-2xl font-bold text-secondary">
              {a.value}
            </p>
            <p className="text-sm text-muted-foreground">{a.label}</p>
          </div>
        ))}
      </div>

      {/* Matches */}
      <div className="mt-14 flex items-end justify-between">
        <h2 className="font-serif text-2xl font-bold text-secondary sm:text-3xl">
          Recommended for you
        </h2>
        <p className="text-sm text-muted-foreground">
          Ranked by AI match score
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {marketMatches.map((m) => (
          <article
            key={m.id}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="flex gap-5 p-5">
              <img
                src={m.image || '/placeholder.svg'}
                alt={m.partner}
                className="h-28 w-28 shrink-0 rounded-2xl object-cover"
                crossOrigin="anonymous"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                        typeColor[m.type]
                      }`}
                    >
                      {m.type}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-bold">
                      {m.partner}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {m.location}
                    </p>
                  </div>
                  <MatchRing value={m.match} />
                </div>
              </div>
            </div>
            <div className="border-t border-border px-5 py-4">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Craft focus</dt>
                  <dd className="font-medium">{m.craftFocus}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Reach</dt>
                  <dd className="font-medium">{m.reach}</dd>
                </div>
              </dl>
              <button className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta">
                Request introduction
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function MatchRing({ value }: { value: number }) {
  return (
    <div className="relative grid h-16 w-16 shrink-0 place-items-center">
      <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15.9155"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="3.5"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9155"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={`${value} ${100 - value}`}
        />
      </svg>
      <span className="absolute font-serif text-sm font-bold text-secondary">
        {value}%
      </span>
    </div>
  )
}
