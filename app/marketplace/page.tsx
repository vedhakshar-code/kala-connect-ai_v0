import { MarketplaceView } from '@/components/marketplace/marketplace-view'

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ craft?: string }>
}) {
  const { craft } = await searchParams
  return <MarketplaceView initialCraft={craft} />
}
