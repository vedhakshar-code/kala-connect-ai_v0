'use client'

import React, { useState } from 'react'
import {
  ShieldCheck,
  Check,
  X,
  Users,
  Package,
  IndianRupee,
  Store,
  Plus,
  Trash2,
  BadgeCheck,
  Clock,
  FileText,
  Eye,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  Search,
} from 'lucide-react'
import { formatINR, type CraftCategory, type VerificationRequest } from '@/lib/data'
import { useAppContext } from '@/context/AppContext'

const salesByCraft = [
  { craft: 'Mysore Silk', pct: 88, value: '₹24.1L', growth: '+22%' },
  { craft: 'Kalamkari', pct: 72, value: '₹18.6L', growth: '+15%' },
  { craft: 'Madhubani', pct: 64, value: '₹15.2L', growth: '+19%' },
  { craft: 'Pattachitra', pct: 51, value: '₹11.9L', growth: '+11%' },
  { craft: 'Blue Pottery', pct: 43, value: '₹9.4L', growth: '+14%' },
  { craft: 'Warli', pct: 34, value: '₹7.1L', growth: '+8%' },
]

export default function AdminPage() {
  const {
    products,
    artisans,
    categories,
    addCategory,
    deleteCategory,
    verificationQueue,
    updateVerificationStatus,
  } = useAppContext()

  const [queueFilter, setQueueFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [selectedProof, setSelectedProof] = useState<VerificationRequest | null>(null)

  // Category management form
  const [newCatName, setNewCatName] = useState('')
  const [newCatRegion, setNewCatRegion] = useState('')
  const [newCatBlurb, setNewCatBlurb] = useState('')

  function handleAddCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!newCatName.trim()) return

    const newCategory: CraftCategory = {
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      name: newCatName.trim(),
      region: newCatRegion.trim() || 'India',
      image:
        'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1200&auto=format&fit=crop',
      blurb:
        newCatBlurb.trim() ||
        `Authentic traditional Indian craft originating from ${newCatRegion.trim() || 'India'}.`,
    }

    addCategory(newCategory)
    setNewCatName('')
    setNewCatRegion('')
    setNewCatBlurb('')
  }

  const filteredQueue = verificationQueue.filter((q) => {
    if (queueFilter === 'all') return true
    return q.status === queueFilter
  })

  const pendingCount = verificationQueue.filter((q) => q.status === 'pending').length
  const approvedCount = verificationQueue.filter((q) => q.status === 'approved').length
  const rejectedCount = verificationQueue.filter((q) => q.status === 'rejected').length

  const verifiedArtisansCount = artisans.filter((a) => a.verified).length

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground shadow">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </span>
          <div>
            <h1 className="font-serif text-3xl font-bold text-secondary sm:text-4xl">
              Admin & Operations Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Marketplace intelligence, artisan verification, and craft taxonomies
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-peacock/10 px-3.5 py-1.5 text-xs font-bold text-peacock">
            <BadgeCheck className="h-4 w-4" /> System Healthy
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary">
            {pendingCount} Verifications Pending
          </span>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total GMV / Sales */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <IndianRupee className="h-6 w-6" />
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-peacock">
              <TrendingUp className="h-3.5 w-3.5" /> +18.4%
            </span>
          </div>
          <p className="mt-4 font-serif text-3xl font-bold text-secondary">
            {formatINR(8640000)}
          </p>
          <p className="text-sm font-medium text-muted-foreground">Total Sales GMV (This Month)</p>
        </div>

        {/* Active Artisans */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-terracotta/10 text-terracotta">
              <Users className="h-6 w-6" />
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-peacock">
              <Award className="h-3.5 w-3.5" /> {verifiedArtisansCount} Verified
            </span>
          </div>
          <p className="mt-4 font-serif text-3xl font-bold text-secondary">
            {12480 + artisans.length}
          </p>
          <p className="text-sm font-medium text-muted-foreground">Active Registered Artisans</p>
        </div>

        {/* Live Marketplace Products */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-peacock/10 text-peacock">
              <Package className="h-6 w-6" />
            </span>
            <span className="text-xs font-semibold text-muted-foreground">
              Dynamic AppContext
            </span>
          </div>
          <p className="mt-4 font-serif text-3xl font-bold text-secondary">
            {38214 + products.length}
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            Live Products ({products.length} in local state)
          </p>
        </div>

        {/* Partner Stores */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-maroon/10 text-maroon">
              <Store className="h-6 w-6" />
            </span>
            <span className="text-xs font-bold text-primary">Pan-India & Export</span>
          </div>
          <p className="mt-4 font-serif text-3xl font-bold text-secondary">326</p>
          <p className="text-sm font-medium text-muted-foreground">B2B Partner Stores & Boutiques</p>
        </div>
      </div>

      {/* Main Grid: Verification Queue on Left, Analytics & Categories on Right */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN: Artisan Verification Queue (7 cols) */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:col-span-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-secondary">
                Artisan Profile Verification Queue
              </h2>
              <p className="text-sm text-muted-foreground">
                Verify Government Pehchan ID cards, Handloom marks, and artisan certificates
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 rounded-full bg-muted/60 p-1">
              <button
                onClick={() => setQueueFilter('pending')}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  queueFilter === 'pending'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setQueueFilter('approved')}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  queueFilter === 'approved'
                    ? 'bg-peacock text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Approved ({approvedCount})
              </button>
              <button
                onClick={() => setQueueFilter('all')}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  queueFilter === 'all'
                    ? 'bg-secondary text-secondary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                All ({verificationQueue.length})
              </button>
            </div>
          </div>

          {/* Queue List */}
          <ul className="mt-6 space-y-4">
            {filteredQueue.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-border bg-background/60 p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={item.avatar || '/placeholder.svg'}
                      alt={item.name}
                      className="h-14 w-14 rounded-2xl object-cover shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-bold text-secondary">{item.name}</h3>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                          {item.craft}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.state} · Submitted {item.submitted}
                      </p>

                      {/* Government ID & Proof Info */}
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-cream px-2.5 py-1 font-semibold text-secondary border border-border/60">
                          <FileText className="h-3.5 w-3.5 text-terracotta" />
                          {item.proofType || 'Ministry of Textiles Pehchan ID'}
                        </span>
                        {item.proofId && (
                          <span className="font-mono text-xs text-muted-foreground">
                            ID: {item.proofId}
                          </span>
                        )}
                        <span className="text-muted-foreground">
                          · {item.documents} documents attached
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions or Status Badge */}
                  <div className="flex items-center gap-2 sm:self-center">
                    <button
                      onClick={() => setSelectedProof(item)}
                      className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold text-secondary hover:border-primary hover:text-primary transition"
                      title="Inspect government proof"
                    >
                      <Eye className="h-3.5 w-3.5" /> Proof
                    </button>

                    {item.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => updateVerificationStatus(item.id, 'approved')}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-peacock px-4 py-2 text-xs font-bold text-white shadow-sm hover:opacity-90 transition"
                        >
                          <Check className="h-4 w-4" /> Approve
                        </button>
                        <button
                          onClick={() => updateVerificationStatus(item.id, 'rejected')}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold text-muted-foreground hover:border-destructive hover:text-destructive transition"
                        >
                          <X className="h-4 w-4" /> Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold ${
                          item.status === 'approved'
                            ? 'bg-peacock/10 text-peacock'
                            : 'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {item.status === 'approved' ? (
                          <BadgeCheck className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        {item.status === 'approved' ? 'Verified Artisan' : 'Rejected'}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}

            {filteredQueue.length === 0 && (
              <div className="my-8 rounded-2xl border border-dashed border-border py-12 text-center">
                <Clock className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 font-serif text-lg font-bold text-secondary">
                  No verifications in this view
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  All requests have been processed or none match the selected filter.
                </p>
              </div>
            )}
          </ul>
        </section>

        {/* RIGHT COLUMN: Sales Analytics & Category Management (5 cols) */}
        <div className="space-y-8 lg:col-span-5">
          {/* Top Craft Categories Analytics */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-secondary">
                  Top Craft Categories
                </h2>
                <p className="text-xs text-muted-foreground">Performance by gross merchandise value</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                Live Data
              </span>
            </div>

            <ul className="mt-5 space-y-4">
              {salesByCraft.map((s) => (
                <li key={s.craft}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-serif font-bold text-secondary">{s.craft}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{s.value}</span>
                      <span className="text-xs font-semibold text-peacock">{s.growth}</span>
                    </div>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-terracotta transition-all duration-500"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Simple Category Management Panel */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
            <div className="border-b border-border pb-3">
              <h2 className="font-serif text-xl font-bold text-secondary">
                Category Management
              </h2>
              <p className="text-xs text-muted-foreground">
                Add and manage craft traditions displayed across the marketplace
              </p>
            </div>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="mt-4 space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Craft Name (e.g. Channapatna)"
                  className="rounded-xl border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
                <input
                  type="text"
                  value={newCatRegion}
                  onChange={(e) => setNewCatRegion(e.target.value)}
                  placeholder="Region (e.g. Karnataka)"
                  className="rounded-xl border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <input
                type="text"
                value={newCatBlurb}
                onChange={(e) => setNewCatBlurb(e.target.value)}
                placeholder="Brief craft tradition summary..."
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow transition hover:bg-terracotta active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" /> Add Craft Category
              </button>
            </form>

            {/* Existing Categories List */}
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Current Categories ({categories.length})
              </p>
              <ul className="mt-2.5 max-h-64 divide-y divide-border overflow-y-auto pr-1">
                {categories.map((c) => (
                  <li key={c.id} className="flex items-center justify-between py-2.5 text-sm">
                    <div>
                      <span className="font-serif font-bold text-secondary">{c.name}</span>
                      <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {c.region}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteCategory(c.id)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
                      aria-label={`Remove category ${c.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* Proof Inspection Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedProof(null)}
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <img
                src={selectedProof.avatar}
                alt={selectedProof.name}
                className="h-16 w-16 rounded-2xl object-cover shadow"
              />
              <div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                  {selectedProof.craft}
                </span>
                <h3 className="font-serif text-xl font-bold text-secondary mt-1">
                  {selectedProof.name}
                </h3>
                <p className="text-xs text-muted-foreground">{selectedProof.state} · Registered Maker</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-cream/70 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-secondary">Government Proof Type:</span>
                <span className="font-semibold text-terracotta">{selectedProof.proofType || 'Ministry of Textiles Pehchan Card'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-secondary">ID Number:</span>
                <span className="font-mono font-semibold text-foreground">{selectedProof.proofId || 'PEHCHAN-KA-2023-9941'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-secondary">Documents Submitted:</span>
                <span className="font-semibold text-foreground">{selectedProof.documents} files verified</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-secondary">Aadhaar e-KYC:</span>
                <span className="text-peacock font-bold">✓ Verified Authentic</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-secondary">State Weaver Council:</span>
                <span className="text-peacock font-bold">✓ Active License Valid</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {selectedProof.status === 'pending' ? (
                <>
                  <button
                    onClick={() => {
                      updateVerificationStatus(selectedProof.id, 'approved')
                      setSelectedProof(null)
                    }}
                    className="flex-1 rounded-full bg-peacock py-3 text-sm font-bold text-white shadow hover:opacity-90 transition"
                  >
                    ✓ Approve Artisan Profile
                  </button>
                  <button
                    onClick={() => {
                      updateVerificationStatus(selectedProof.id, 'rejected')
                      setSelectedProof(null)
                    }}
                    className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-destructive hover:border-destructive"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSelectedProof(null)}
                  className="w-full rounded-full bg-secondary py-3 text-sm font-bold text-secondary-foreground"
                >
                  Close Inspection
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
