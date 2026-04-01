import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/BarraNavegacion'
import Banner from './components/Banner'
import Menu from './components/Menu'
import ProductList from './components/ListaProductos'
import FavoritesPage from './components/PaginaFavoritos'
import LoginModal from './components/ModalLogin'
import ProductDetail from './components/DetalleProducto'
import ProductDetailPageWithLayout from './components/PaginaDetalleLayout'
import HomePage from './pages/PaginaInicio'
import VenderPage from './pages/VenderPage'
import MyPurchasesPage from './pages/MisComprasPage'
import AyudaPage from './pages/AyudaPage'
import CarritoPage from './pages/CarritoPage'
import MisProductosPage from './pages/MisProductosPage'
import Footer from './components/PieDePagina'
import { productsData } from './data/products'
import { getAllProducts } from './services/fakeStoreApi'
import { supabase } from './services/supabaseClient'


const convertListedToProduct = (p) => ({
  id: `listed-${p.id}`,
  name: p.title || 'Sin título',
  price: Number(p.price) || 0,
  originalPrice: Number(p.price) || 0,
  category: p.category || 'Otros',
  image: p.imageUrl || '',
  description: p.description || '',
  rating: 5.0,
  reviewsCount: 0,
  freeShipping: false,
  condition: p.condition || 'new',
  source: 'local',
  seller: p.seller || '',
  publishedAt: p.publishedAt,
})

// Mapeo de categorías de Platzi API (IDs numéricos) a nombres en inglés
const PLATZI_CATEGORIES = {
  '1': 'Clothes',
  '2': 'Electronics',
  '3': 'Furniture',
  '4': 'Shoes',
  '5': 'Miscellaneous',
}


function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('ml_favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem('ml_purchases')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        setIsLoggedIn(true)
        setShowLogin(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        setIsLoggedIn(true)
        setShowLogin(false)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])


  useEffect(() => {
    localStorage.setItem('ml_favorites', JSON.stringify(favorites))
  }, [favorites])

  // Cargar productos locales al iniciar y mezclar con publicados en localStorage
  useEffect(() => {
    const loadInitialProducts = async () => {
      setIsLoading(true)
      try {
        console.log('🚀 Iniciando carga de productos...')
        
        // Intentar FakeStore (pero probablemente fallará por CORS en producción)
        const fakeStoreProducts = await getAllProducts()
        console.log('📦 Productos de FakeStore:', fakeStoreProducts?.length || 0)
        
        // Obtener productos publicados localmente
        const listedRaw = JSON.parse(localStorage.getItem('ml_listed_products') || '[]')
        const listedConverted = listedRaw.map(convertListedToProduct)
        console.log('📝 Productos publicados localmente:', listedConverted.length)
        
        // Usar FakeStore si hay productos, si no usar datos locales
        const base = (fakeStoreProducts && fakeStoreProducts.length > 0) ? fakeStoreProducts : productsData
        console.log(`📚 Usando ${base === fakeStoreProducts ? 'FakeStore' : 'datos locales'}:`, base.length, 'productos')
        
        const all = [...listedConverted, ...base]
        console.log('✅ Total de productos a mostrar:', all.length)
        
        setProducts(all)
        setFilteredProducts(all)
      } catch (error) {
        console.error('❌ Error cargando productos:', error)
        const listedRaw = JSON.parse(localStorage.getItem('ml_listed_products') || '[]')
        const listedConverted = listedRaw.map(convertListedToProduct)
        const all = [...listedConverted, ...productsData]
        console.log('⚠️ Usando fallback. Total productos:', all.length)
        setProducts(all)
        setFilteredProducts(all)
      } finally {
        setIsLoading(false)
      }
    }
    loadInitialProducts()
  }, [])

  // Actualiza la lista de productos cuando se publica uno nuevo desde VenderPage
  const handleProductPublished = () => {
    const listedRaw = JSON.parse(localStorage.getItem('ml_listed_products') || '[]')
    const listedConverted = listedRaw.map(convertListedToProduct)
    setProducts(prev => {
      const nonListed = prev.filter(p => !String(p.id).startsWith('listed-'))
      return [...listedConverted, ...nonListed]
    })
    setFilteredProducts(prev => {
      const nonListed = prev.filter(p => !String(p.id).startsWith('listed-'))
      return [...listedConverted, ...nonListed]
    })
  }

  const scrollToProducts = () => {
    setTimeout(() => {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products)
      return
    }
    const term = searchTerm.toLowerCase()
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      (product.description && product.description.toLowerCase().includes(term))
    )
    setFilteredProducts(filtered)
    if (location.pathname !== '/') {
      navigate('/')
    }
    scrollToProducts()
  }

  const handleCategoryFilter = (category) => {
    let filtered
    if (category === 'todos' || !category) {
      filtered = products
    } else if (category === 'ofertas') {
      filtered = products.filter(product => product.originalPrice && product.originalPrice > product.price)
    } else {
      // Filtrar por categoryId que viene del menú (valores '1', '2', '3', '4', '5')
      filtered = products.filter(product => {
        // Comparar por ID de categoría (más confiable que por nombre)
        return String(product.categoryId) === String(category)
      })
    }
    setSelectedCategory(category)
    setFilteredProducts(filtered)
    if (location.pathname !== '/') {
      navigate('/')
    }
    scrollToProducts()
  }

  const handleAddToCart = (product) => {
    const qty = product.quantity || 1
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: qty }])
    }
  }

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const handleAddToFavorites = (product) => {
    const exists = favorites.find(fav => fav.id === product.id)
    if (exists) {
      setFavorites(favorites.filter(fav => fav.id !== product.id))
    } else {
      setFavorites([...favorites, product])
    }
  }

  const handleRemoveFromFavorites = (productId) => {
    setFavorites(favorites.filter(fav => fav.id !== productId))
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handlePurchase = () => {
    if (cart.length === 0) return
    const newPurchases = cart.map((item) => ({
      id: Date.now() + Math.random(),
      orderId: `ML-${Math.floor(Date.now() / 1000)}`,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
      status: 'pendiente',
      date: new Date().toISOString(),
    }))
    const updatedPurchases = [...purchases, ...newPurchases]
    setPurchases(updatedPurchases)
    localStorage.setItem('ml_purchases', JSON.stringify(updatedPurchases))
    setCart([])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsLoggedIn(false)
  }

  const handleCartClick = () => navigate('/carrito')

  // Props comunes para Navbar
  const navbarProps = {
    onSearch: handleSearch,
    isLoggedIn,
    user,
    onLoginClick: () => setShowLogin(true),
    onLogoutClick: handleLogout,
    cartCount: cart.length,
    onCartClick: handleCartClick,
    favoritesCount: favorites.length,
    onCategorySelect: handleCategoryFilter,
  }

  return (
    <>
      <Routes>
        <Route path="/producto/:productId" element={
          <ProductDetailPageWithLayout
            onSearch={handleSearch}
            isLoggedIn={isLoggedIn}
            user={user}
            onLoginClick={() => setShowLogin(true)}
            onLogoutClick={handleLogout}
            cart={cart}
            favorites={favorites}
            onCartClick={handleCartClick}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}
            onCategorySelect={handleCategoryFilter}
          />
        } />

        <Route path="/preview" element={
          <HomePage
            products={filteredProducts}
            favorites={favorites}
            cart={cart}
            isLoggedIn={isLoggedIn}
            user={user}
            onSearch={handleSearch}
            onLoginClick={() => setShowLogin(true)}
            onLogoutClick={handleLogout}
            onCartClick={handleCartClick}
            onAddToCart={handleAddToCart}
            onViewDetails={setSelectedProductId}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromCart={handleRemoveFromCart}
            onRemoveFromFavorites={handleRemoveFromFavorites}
            onCategorySelect={handleCategoryFilter}
          />
        } />

        <Route path="/favoritos" element={
          <FavoritesPage
            favorites={favorites}
            cart={cart}
            isLoggedIn={isLoggedIn}
            user={user}
            onSearch={handleSearch}
            onLoginClick={() => setShowLogin(true)}
            onLogoutClick={handleLogout}
            onCartClick={handleCartClick}
            onRemoveFavorite={handleRemoveFromFavorites}
            onAddToCart={handleAddToCart}
            onCategorySelect={handleCategoryFilter}
          />
        } />

        <Route path="/ayuda" element={
          <AyudaPage
            isLoggedIn={isLoggedIn}
            user={user}
            onSearch={handleSearch}
            onLoginClick={() => setShowLogin(true)}
            onLogoutClick={handleLogout}
            cart={cart}
            favorites={favorites}
            onCartClick={handleCartClick}
            onCategorySelect={handleCategoryFilter}
          />
        } />

        <Route path="/mis-compras" element={
          <MyPurchasesPage
            purchases={purchases}
            isLoggedIn={isLoggedIn}
            user={user}
            cart={cart}
            favorites={favorites}
            onSearch={handleSearch}
            onLoginClick={() => setShowLogin(true)}
            onLogoutClick={handleLogout}
            onCartClick={handleCartClick}
            onCategorySelect={handleCategoryFilter}
          />
        } />

        <Route path="/vender" element={
          <VenderPage
            isLoggedIn={isLoggedIn}
            user={user}
            onSearch={handleSearch}
            onLoginClick={() => setShowLogin(true)}
            onLogoutClick={handleLogout}
            cart={cart}
            favorites={favorites}
            onCartClick={handleCartClick}
            onCategorySelect={handleCategoryFilter}
            onProductPublished={handleProductPublished}
          />
        } />

        <Route path="/mis-productos" element={
          <MisProductosPage
            isLoggedIn={isLoggedIn}
            user={user}
            cart={cart}
            favorites={favorites}
            onSearch={handleSearch}
            onLoginClick={() => setShowLogin(true)}
            onLogoutClick={handleLogout}
            onCartClick={handleCartClick}
            onCategorySelect={handleCategoryFilter}
          />
        } />

        <Route path="/carrito" element={
          <CarritoPage
            cart={cart}
            isLoggedIn={isLoggedIn}
            user={user}
            favorites={favorites}
            onSearch={handleSearch}
            onLoginClick={() => setShowLogin(true)}
            onLogoutClick={handleLogout}
            onCartClick={handleCartClick}
            onRemoveFromCart={handleRemoveFromCart}
            onPurchase={handlePurchase}
            onCategorySelect={handleCategoryFilter}
          />
        } />

        <Route path="/" element={
          <div className="min-h-screen bg-ml-gray flex flex-col">
            <Navbar {...navbarProps} />
            <Banner />
            <Menu onCategorySelect={handleCategoryFilter} selectedCategory={selectedCategory} />
            <main id="products-section" className="flex-1">
              <ProductList
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                isLoading={isLoading}
                onViewDetails={setSelectedProductId}
                onAddToFavorites={handleAddToFavorites}
                favorites={favorites}
              />
            </main>
            <Footer onCategorySelect={handleCategoryFilter} />
          </div>
        } />
      </Routes>

      {showLogin && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      {selectedProductId && (
        <ProductDetail
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App