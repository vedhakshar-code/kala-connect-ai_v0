import Link from 'next/link'
import { MapPin, Star, BadgeCheck, ArrowRight } from 'lucide-react'
import { artisans } from '@/lib/data'

export default function StoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
          Artisan Stories
        </span>
        <h1 className="mt-2 text-balance font-serif text-4xl font-bold text-secondary sm:text-5xl">
          Behind every craft, a life&apos;s work
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Meet the hands and hearts keeping India&apos;s traditions alive. These
          are their stories, in their own words.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {artisans.map((a, i) => (
          <Link
            key={a.id}
            href={`/stories/${a.id}`}
            className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl md:grid-cols-2"
          >
            <div
              className={`relative aspect-[16/10] overflow-hidden md:aspect-auto ${
                i % 2 === 1 ? 'md:order-2' : ''
              }`}
            >
              <img
                src={a.cover || '/placeholder.svg'}
                alt={`${a.craft} by ${a.name}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {a.craft}
                </span>
                {a.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-peacock/10 px-2.5 py-1 text-xs font-semibold text-peacock">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-serif text-3xl font-bold text-secondary">
                {a.name}
              </h2>
              <p className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {a.village}, {a.state}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {a.rating}
                </span>
                <span>{a.experience} yrs experience</span>
              </p>
              <p className="mt-4 line-clamp-3 text-pretty leading-relaxed text-foreground/80">
                {a.story}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary group-hover:gap-2.5 transition-all">
                Read {a.name.split(' ')[0]}&apos;s story{' '}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
