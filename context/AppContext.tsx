'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  artisans as initialArtisans,
  products as initialProducts,
  categories as initialCategories,
  verificationQueue as initialVerificationQueue,
  type Artisan,
  type Product,
  type CraftCategory,
  type VerificationRequest,
} from '@/lib/data'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'


export type UserRole = 'customer' | 'artisan' | 'admin'
export type LangCode = 'en' | 'hi' | 'te' | 'ta' | 'kn'

export interface AppUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  location?: string
  artisanId?: string
}

export type CartItem = {
  product: Product
  qty: number
}

// Initial demo users representing Indian artisans, customers, and administrators
export const initialUsers: AppUser[] = [
  {
    id: 'u1',
    name: 'Sunita Devi',
    email: 'sunita.devi@kalaconnect.in',
    role: 'artisan',
    avatar:
      'https://images.unsplash.com/photo-1616002411355-49593fd89721?q=80&w=400&auto=format&fit=crop',
    phone: '+91 98765 43210',
    location: 'Jitwarpur, Bihar',
    artisanId: 'a1',
  },
  {
    id: 'u2',
    name: 'Ramesh Prajapati',
    email: 'ramesh.p@kalaconnect.in',
    role: 'artisan',
    avatar:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=400&auto=format&fit=crop',
    phone: '+91 98123 45678',
    location: 'Sanganer, Rajasthan',
    artisanId: 'a2',
  },
  {
    id: 'u3',
    name: 'Kariyanna Gowda',
    email: 'kariyanna.g@kalaconnect.in',
    role: 'artisan',
    avatar:
      'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=400&auto=format&fit=crop',
    phone: '+91 94455 66778',
    location: 'Ramanagara, Karnataka',
    artisanId: 'a4',
  },
  {
    id: 'u4',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    role: 'customer',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    phone: '+91 91234 56789',
    location: 'Bengaluru, Karnataka',
  },
  {
    id: 'u5',
    name: 'Rajesh Verma',
    email: 'rajesh.verma@kalaconnect.in',
    role: 'admin',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    phone: '+91 99887 76655',
    location: 'New Delhi',
  },
]

// Multilingual dictionary
const dictionary: Record<string, Record<LangCode, string>> = {
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

export function translateText(key: string, lang: LangCode) {
  return dictionary[key]?.[lang] ?? dictionary[key]?.en ?? key
}

export interface AppContextType {
  // Supabase state
  isSupabaseConfigured: boolean
  supabase: typeof supabase

  // User & Auth State
  users: AppUser[]
  currentUser: AppUser | null
  role: UserRole
  setRole: (role: UserRole) => void
  setCurrentUser: (user: AppUser | null) => void
  updateUser: (id: string, updates: Partial<AppUser>) => void
  addUser: (user: AppUser) => void
  login: (email: string) => Promise<boolean>
  logout: () => Promise<void>

  // Products State
  products: Product[]
  getProduct: (id: string) => Product | undefined
  getArtisanProducts: (artisanId: string) => Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void

  // Artisans State
  artisans: Artisan[]
  getArtisan: (id: string) => Artisan | undefined
  addArtisan: (artisan: Artisan) => void
  updateArtisan: (id: string, updates: Partial<Artisan>) => void
  deleteArtisan: (id: string) => void

  // Cart State
  cart: CartItem[]
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  updateCartQty: (productId: string, qty: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number

  // Wishlist State
  wishlist: string[]
  toggleWishlist: (productId: string) => void
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isWished: (productId: string) => boolean
  wishlistCount: number

  // Categories State
  categories: CraftCategory[]
  addCategory: (category: CraftCategory) => void
  deleteCategory: (id: string) => void

  // Verification Queue State
  verificationQueue: VerificationRequest[]
  updateVerificationStatus: (id: string, status: 'approved' | 'rejected') => void

  // Language & Localization
  lang: LangCode
  setLang: (lang: LangCode) => void
  t: (key: string) => string
}


export const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  // Users state
  const [users, setUsers] = useState<AppUser[]>(initialUsers)
  const [currentUser, setCurrentUser] = useState<AppUser | null>(initialUsers[3]) // Defaults to customer Ananya Sharma
  const [role, setRoleState] = useState<UserRole>('customer')

  // Products state
  const [products, setProducts] = useState<Product[]>(initialProducts)

  // Artisans state
  const [artisans, setArtisans] = useState<Artisan[]>(initialArtisans)

  // Cart state - initialized with Madhubani painting (p1) and Mysore Silk sari (p4)
  const [cart, setCart] = useState<CartItem[]>([
    { product: initialProducts[0], qty: 1 },
    { product: initialProducts[3], qty: 1 },
  ])

  // Wishlist state - initial demo IDs: p3 (Kalamkari) and p6 (Pattachitra)
  const [wishlist, setWishlist] = useState<string[]>(['p3', 'p6'])

  // Categories state
  const [categories, setCategories] = useState<CraftCategory[]>(initialCategories)

  const addCategory = useCallback((category: CraftCategory) => {
    setCategories((prev) => [...prev, category])
  }, [])

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }, [])

  // Verification queue state
  const [verificationQueue, setVerificationQueue] =
    useState<VerificationRequest[]>(initialVerificationQueue)

  const updateVerificationStatus = useCallback(
    (id: string, status: 'approved' | 'rejected') => {
      setVerificationQueue((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status } : v))
      )

      // When approved, mark matching artisan as verified
      if (status === 'approved') {
        const item = verificationQueue.find((v) => v.id === id)
        if (item) {
          setArtisans((prev) =>
            prev.map((a) => {
              if (
                (item.artisanId && a.id === item.artisanId) ||
                a.name.toLowerCase() === item.name.toLowerCase()
              ) {
                return { ...a, verified: true }
              }
              return a
            })
          )
        }
      }
    },
    [verificationQueue]
  )

  // Language state
  const [lang, setLang] = useState<LangCode>('en')


  // Sync role with current user if appropriate
  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole)
    setCurrentUser((prev) => {
      if (prev && prev.role === newRole) return prev
      // Match a user with the chosen role
      const matched = initialUsers.find((u) => u.role === newRole)
      return matched ?? prev
    })
  }, [])

  // User mutations
  const updateUser = useCallback((id: string, updates: Partial<AppUser>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updates } : user))
    )
    setCurrentUser((prev) =>
      prev && prev.id === id ? { ...prev, ...updates } : prev
    )
  }, [])

  const addUser = useCallback((user: AppUser) => {
    setUsers((prev) => [...prev, user])
  }, [])

  const login = useCallback(
    async (email: string): Promise<boolean> => {
      if (isSupabaseConfigured) {
        try {
          const { error } = await supabase.auth.signInWithOtp({ email })
          if (!error) return true
        } catch {
          // Fall back to local authentication
        }
      }
      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (existing) {
        setCurrentUser(existing)
        setRoleState(existing.role)
        return true
      }
      return false
    },
    [users]
  )

  const logout = useCallback(async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut()
      } catch {
        // Ignore errors on sign out
      }
    }
    setCurrentUser(null)
    setRoleState('customer')
  }, [])

  // Product mutations
  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  )

  const getArtisanProducts = useCallback(
    (artisanId: string) => products.filter((p) => p.artisanId === artisanId),
    [products]
  )

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [product, ...prev])
  }, [])

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  // Artisan mutations
  const getArtisan = useCallback(
    (id: string) => artisans.find((a) => a.id === id),
    [artisans]
  )

  const addArtisan = useCallback((artisan: Artisan) => {
    setArtisans((prev) => [artisan, ...prev])
  }, [])

  const updateArtisan = useCallback((id: string, updates: Partial<Artisan>) => {
    setArtisans((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    )
  }, [])

  const deleteArtisan = useCallback((id: string) => {
    setArtisans((prev) => prev.filter((a) => a.id !== id))
  }, [])

  // Cart operations
  const addToCart = useCallback((p: Product, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === p.id)
      if (existing) {
        return prev.map((c) =>
          c.product.id === p.id ? { ...c, qty: c.qty + qty } : c
        )
      }
      return [...prev, { product: p, qty }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.product.id !== id))
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.product.id === id ? { ...c, qty: Math.max(1, qty) } : c))
        .filter((c) => c.qty > 0)
    )
  }, [])

  const updateCartQty = setQty

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartCount = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty, 0),
    [cart]
  )

  const cartTotal = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty * c.product.price, 0),
    [cart]
  )

  // Wishlist operations
  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    )
  }, [])

  const addToWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((w) => w !== id))
  }, [])

  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist])

  const wishlistCount = wishlist.length

  // Localization
  const t = useCallback((key: string) => translateText(key, lang), [lang])

  // Optional Supabase synchronization if configured
  useEffect(() => {
    if (!isSupabaseConfigured) return

    let isMounted = true

    // Fetch products from Supabase if table exists
    const fetchRemoteData = async () => {
      try {
        const { data: remoteProducts, error: prodErr } = await supabase
          .from('products')
          .select('*')
        if (!prodErr && remoteProducts && remoteProducts.length > 0 && isMounted) {
          setProducts(remoteProducts as Product[])
        }
      } catch {
        // Keep local fallback
      }

      try {
        const { data: remoteArtisans, error: artErr } = await supabase
          .from('artisans')
          .select('*')
        if (!artErr && remoteArtisans && remoteArtisans.length > 0 && isMounted) {
          setArtisans(remoteArtisans as Artisan[])
        }
      } catch {
        // Keep local fallback
      }
    }

    fetchRemoteData()

    // Listen to Supabase auth events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return
        if (session?.user?.email) {
          const matched = users.find(
            (u) => u.email.toLowerCase() === session.user.email?.toLowerCase()
          )
          if (matched) {
            setCurrentUser(matched)
            setRoleState(matched.role)
          } else {
            const newUser: AppUser = {
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
              email: session.user.email,
              role: 'customer',
            }
            setCurrentUser(newUser)
            setRoleState('customer')
          }
        }
      }
    )

    return () => {
      isMounted = false
      authListener?.subscription.unsubscribe()
    }
  }, [users])

  const value: AppContextType = {
    isSupabaseConfigured,
    supabase,
    users,
    currentUser,
    role,
    setRole,
    setCurrentUser,
    updateUser,
    addUser,
    login,
    logout,
    products,
    getProduct,
    getArtisanProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    artisans,
    getArtisan,
    addArtisan,
    updateArtisan,
    deleteArtisan,
    cart,
    addToCart,
    removeFromCart,
    setQty,
    updateCartQty,
    clearCart,
    cartCount,
    cartTotal,
    wishlist,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    isWished,
    wishlistCount,
    categories,
    addCategory,
    deleteCategory,
    verificationQueue,
    updateVerificationStatus,
    lang,
    setLang,
    t,
  }


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export function useApp(): AppContextType {
  return useAppContext()
}
