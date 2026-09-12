'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { products as allProducts, type Product } from '@/lib/data'
import { AppContext } from '@/context/AppContext'


export type Role = 'customer' | 'artisan' | 'admin'
export type LangCode = 'en' | 'hi' | 'te' | 'ta' | 'kn'

export const languages: { code: LangCode; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
]

type Dict = Record<string, Record<LangCode, string>>

const dictionary: Dict = {
  home: { en: 'Home', hi: 'होम', te: 'హోమ్', ta: 'முகப்பு', kn: 'ಮುಖಪುಟ' },
  marketplace: {
    en: 'Marketplace',
    hi: 'बाज़ार',
    te: 'మార్కెట్',
    ta: 'சந்தை',
    kn: 'ಮಾರುಕಟ್ಟೆ',
  },
  catalog: {
    en: 'AI Catalog',
    hi: 'एआई कैटलॉग',
    te: 'AI కేటలాగ్',
    ta: 'AI அட்டவணை',
    kn: 'AI ಕ್ಯಾಟಲಾಗ್',
  },
  linkage: {
    en: 'Market Linkage',
    hi: 'बाज़ार जुड़ाव',
    te: 'మార్కెట్ లింకేజ్',
    ta: 'சந்தை இணைப்பு',
    kn: 'ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ',
  },
  explore: {
    en: 'Explore India',
    hi: 'भारत खोजें',
    te: 'భారత్‌ను చూడండి',
    ta: 'இந்தியாவை காண்',
    kn: 'ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ',
  },
  stories: {
    en: 'Artisan Stories',
    hi: 'कारीगर कहानियाँ',
    te: 'కళాకారుల కథలు',
    ta: 'கைவினைஞர் கதைகள்',
    kn: 'ಕುಶಲಕರ್ಮಿ ಕಥೆಗಳು',
  },
  heroTitle: {
    en: 'Every Craft Has a Story',
    hi: 'हर शिल्प की एक कहानी है',
    te: 'ప్రతి కళకూ ఒక కథ ఉంది',
    ta: 'ஒவ்வொரு கைவினைக்கும் ஒரு கதை உண்டு',
    kn: 'ಪ್ರತಿ ಕಲೆಗೂ ಒಂದು ಕಥೆ ಇದೆ',
  },
  tagline: {
    en: 'From the Hands of India to the Heart of the World',
    hi: 'भारत के हाथों से दुनिया के दिल तक',
    te: 'భారత హస్తాల నుండి ప్రపంచ హృదయానికి',
    ta: 'இந்தியாவின் கைகளிலிருந்து உலகின் இதயத்திற்கு',
    kn: 'ಭಾರತದ ಕೈಗಳಿಂದ ಜಗತ್ತಿನ ಹೃದಯಕ್ಕೆ',
  },
  shopNow: {
    en: 'Explore the Bazaar',
    hi: 'बाज़ार देखें',
    te: 'బజార్ చూడండి',
    ta: 'சந்தையை காண்',
    kn: 'ಬಜಾರ್ ನೋಡಿ',
  },
  meetArtisans: {
    en: 'Meet the Artisans',
    hi: 'कारीगरों से मिलें',
    te: 'కళాకారులను కలవండి',
    ta: 'கைவினைஞர்களை சந்திக்கவும்',
    kn: 'ಕುಶಲಕರ್ಮಿಗಳನ್ನು ಭೇಟಿಯಾಗಿ',
  },
}

export function translate(key: string, lang: LangCode) {
  return dictionary[key]?.[lang] ?? dictionary[key]?.en ?? key
}

export type CartItem = { product: Product; qty: number }

export type CatalogResult = {
  name: string
  description: string
  tags: string[]
  priceLow: number
  priceHigh: number
}

type StoreValue = {
  role: Role
  setRole: (r: Role) => void
  lang: LangCode
  setLang: (l: LangCode) => void
  t: (key: string) => string
  cart: CartItem[]
  addToCart: (p: Product) => void
  removeFromCart: (id: string) => void
  setQty: (id: string, qty: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
  wishlist: string[]
  toggleWishlist: (id: string) => void
  isWished: (id: string) => boolean
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const app = useContext(AppContext)

  // Local state fallback if StoreProvider is used outside AppProvider
  const [role, setRole] = useState<Role>('customer')
  const [lang, setLang] = useState<LangCode>('en')
  const [cart, setCart] = useState<CartItem[]>([
    { product: allProducts[0], qty: 1 },
    { product: allProducts[3], qty: 1 },
  ])
  const [wishlist, setWishlist] = useState<string[]>(['p3', 'p6'])

  const fallbackT = useCallback((key: string) => translate(key, lang), [lang])

  const fallbackAddToCart = useCallback((p: Product) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === p.id)
      if (existing) {
        return prev.map((c) =>
          c.product.id === p.id ? { ...c, qty: c.qty + 1 } : c,
        )
      }
      return [...prev, { product: p, qty: 1 }]
    })
  }, [])

  const fallbackRemoveFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.product.id !== id))
  }, [])

  const fallbackSetQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.product.id === id ? { ...c, qty: Math.max(1, qty) } : c))
        .filter((c) => c.qty > 0),
    )
  }, [])

  const fallbackClearCart = useCallback(() => setCart([]), [])

  const fallbackToggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    )
  }, [])

  const fallbackIsWished = useCallback((id: string) => wishlist.includes(id), [wishlist])

  const fallbackCartCount = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty, 0),
    [cart],
  )
  const fallbackCartTotal = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty * c.product.price, 0),
    [cart],
  )

  const value: StoreValue = useMemo(() => {
    if (app) {
      return {
        role: app.role,
        setRole: app.setRole,
        lang: app.lang,
        setLang: app.setLang,
        t: app.t,
        cart: app.cart,
        addToCart: app.addToCart,
        removeFromCart: app.removeFromCart,
        setQty: app.setQty,
        clearCart: app.clearCart,
        cartCount: app.cartCount,
        cartTotal: app.cartTotal,
        wishlist: app.wishlist,
        toggleWishlist: app.toggleWishlist,
        isWished: app.isWished,
      }
    }
    return {
      role,
      setRole,
      lang,
      setLang,
      t: fallbackT,
      cart,
      addToCart: fallbackAddToCart,
      removeFromCart: fallbackRemoveFromCart,
      setQty: fallbackSetQty,
      clearCart: fallbackClearCart,
      cartCount: fallbackCartCount,
      cartTotal: fallbackCartTotal,
      wishlist,
      toggleWishlist: fallbackToggleWishlist,
      isWished: fallbackIsWished,
    }
  }, [
    app,
    role,
    lang,
    fallbackT,
    cart,
    fallbackAddToCart,
    fallbackRemoveFromCart,
    fallbackSetQty,
    fallbackClearCart,
    fallbackCartCount,
    fallbackCartTotal,
    wishlist,
    fallbackToggleWishlist,
    fallbackIsWished,
  ])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider or AppProvider')
  return ctx
}


