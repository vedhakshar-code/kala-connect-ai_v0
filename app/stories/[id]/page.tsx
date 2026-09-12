import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Star, BadgeCheck, Quote, ArrowLeft } from 'lucide-react'
import { artisans, getArtisan, getArtisanProducts } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

export function generateStaticParams() {
  return artisans.map((a) => ({ id: a.id }))
}

export default async function ArtisanPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const artisan = getArtisan(id)
  if (!artisan) notFound()

  const catalog = getArtisanProducts(artisan.id)

  return (
    <div>
      {/* Cover */}
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <img
          src={artisan.cover || '/placeholder.svg'}
          alt={`${artisan.craft} craft`}
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
            <Link
              href="/stories"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cream/90 hover:text-cream"
            >
              <ArrowLeft className="h-4 w-4" /> All stories
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Profile header */}
        <div className="-mt-16 flex flex-col items-start gap-5 sm:flex-row sm:items-end">
          <img
            src={artisan.avatar || '/placeholder.svg'}
            alt={artisan.name}
            className="h-32 w-32 rounded-3xl border-4 border-card object-cover shadow-lg"
            crossOrigin="anonymous"
          />
          <div className="pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-serif text-4xl font-bold text-secondary">
                {artisan.name}
              </h1>
              {artisan.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-peacock/10 px-3 py-1 text-sm font-semibold text-peacock">
                  <BadgeCheck className="h-4 w-4" /> Verified Artisan
                </span>
              )}
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {artisan.village}, {artisan.state}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {artisan.rating} rating
              </span>
              <span>{artisan.experience} years of craft</span>
            </p>
          </div>
        </div>

        {/* Craft badge */}
        <span className="mt-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 font-semibold text-primary">
          {artisan.craft}
        </span>

        {/* Quote */}
        <blockquote className="relative mt-6 rounded-3xl bg-secondary p-8 text-secondary-foreground sm:p-10">
          <Quote className="absolute right-6 top-6 h-10 w-10 text-accent/40" />
          <p className="font-serif text-2xl font-medium italic leading-relaxed text-cream sm:text-3xl">
            “{artisan.quote}”
          </p>
        </blockquote>

        {/* Story */}
        <div className="mt-10 max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-secondary">
            The story
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/85">
            {artisan.story}
          </p>
        </div>

        {/* Catalog */}
        {catalog.length > 0 && (
          <div className="mt-14 pb-16">
            <h2 className="font-serif text-2xl font-bold text-secondary">
              From {artisan.name.split(' ')[0]}&apos;s workshop
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {catalog.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
