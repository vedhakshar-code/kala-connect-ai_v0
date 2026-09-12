import Link from 'next/link'
import { ArrowRight, Camera, Sparkles, Handshake, Globe2 } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { ProductCard } from '@/components/product-card'
import { categories, products, artisans } from '@/lib/data'

const featuredCrafts = categories.filter((c) =>
  ['madhubani', 'blue-pottery', 'kalamkari', 'mysore-silk', 'warli'].includes(
    c.id,
  ),
)

const steps = [
  {
    icon: Camera,
    title: 'Snap & Upload',
    body: 'Artisans photograph their craft and add a few simple details in their own language.',
  },
  {
    icon: Sparkles,
    title: 'AI Smart Catalog',
    body: 'AI writes the title, tags, description and a fair price range — ready to edit.',
  },
  {
    icon: Handshake,
    title: 'Market Linkage',
    body: 'We match makers to boutiques, exhibitions and export houses that want their work.',
  },
  {
    icon: Globe2,
    title: 'Sell Worldwide',
    body: 'Buyers across the globe discover authentic, verified handmade Indian crafts.',
  },
]

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)
  const spotlight = artisans.slice(0, 3)

  return (
    <>
      <Hero />

      {/* Featured crafts */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Heritage Crafts
          </span>
          <h2 className="mt-2 text-balance font-serif text-4xl font-bold text-secondary sm:text-5xl">
            Traditions kept alive by hand
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            Each craft carries centuries of technique, story and identity.
            Explore the living art forms of India.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCrafts.map((craft, i) => (
            <Link
              key={craft.id}
              href={`/marketplace?craft=${encodeURIComponent(craft.name)}`}
              className={`group relative overflow-hidden rounded-3xl ${
                i === 0 ? 'sm:col-span-2 lg:row-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="aspect-[4/3] w-full lg:aspect-[3/4]">
                <img
                  src={craft.image || '/placeholder.svg'}
                  alt={`${craft.name} craft from ${craft.region}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
                  {craft.region}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-cream">
                  {craft.name}
                </h3>
                <p className="mt-1 text-pretty text-sm text-cream/85">
                  {craft.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-craft-pattern border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              How KalaConnect works
            </span>
            <h2 className="mt-2 text-balance font-serif text-4xl font-bold text-secondary">
              From a village workshop to the world
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              From the Bazaar
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-secondary">
              Handpicked treasures
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View all crafts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Artisan spotlight */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              The People Behind the Craft
            </span>
            <h2 className="mt-2 text-balance font-serif text-4xl font-bold sm:text-5xl">
              Artisan spotlight
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {spotlight.map((a) => (
              <Link
                key={a.id}
                href={`/stories/${a.id}`}
                className="group overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={a.cover || '/placeholder.svg'}
                    alt={`${a.craft} by ${a.name}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="p-6">
                  <p className="font-serif text-xl font-semibold text-cream">
                    {a.name}
                  </p>
                  <p className="text-sm text-accent">
                    {a.craft} · {a.village}, {a.state}
                  </p>
                  <p className="mt-3 text-pretty text-sm italic text-cream/80">
                    “{a.quote}”
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-terracotta to-secondary p-10 text-center sm:p-16">
          <h2 className="text-balance font-serif text-3xl font-bold text-cream sm:text-4xl">
            Are you an artisan? Let AI build your catalog in minutes.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-cream/85">
            No typing skills needed. Snap a photo, speak your craft, and reach
            buyers across India and the world.
          </p>
          <Link
            href="/ai-catalog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-bold text-secondary shadow-lg transition-transform hover:scale-[1.03]"
          >
            Try the AI Smart Catalog <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
