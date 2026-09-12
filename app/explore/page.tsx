import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { indianStates } from '@/lib/data'

export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          <MapPin className="h-4 w-4" /> Explore India
        </span>
        <h1 className="mt-3 text-balance font-serif text-4xl font-bold text-secondary sm:text-5xl">
          A craft map of the subcontinent
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Every state of India holds its own living traditions. Travel through
          them, one region at a time, and discover the crafts born there.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {indianStates.map((state) => (
          <article
            key={state.id}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
          >
            <div className="aspect-[16/11] overflow-hidden">
              <img
                src={state.image || '/placeholder.svg'}
                alt={`Crafts of ${state.name}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <h2 className="absolute bottom-4 left-5 font-serif text-2xl font-bold text-cream">
                {state.name}
              </h2>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Signature crafts
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {state.crafts.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <Link
                href={`/marketplace?craft=${encodeURIComponent(state.crafts[0])}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:gap-2.5 transition-all"
              >
                Shop {state.name} crafts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
