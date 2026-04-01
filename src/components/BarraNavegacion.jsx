import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logoML from '../img/logos/logo-mercadolibre.webp'

export default function Navbar({ onSearch, isLoggedIn, user = null, onLoginClick, onLogoutClick, cartCount, onCartClick, favoritesCount, onCategorySelect = () => {} }) {
  const [searchInput, setSearchInput] = useState('')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  // Cerrar menu al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getUserName = () => {
    if (!user) return ''
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario'
  }

  const getUserInitials = () => {
    const name = getUserName()
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name.slice(0, 2).toUpperCase()
  }
  const navigate = useNavigate()
  const location = useLocation()

  // Categorias de DummyJSON API
  const categories = [
    { id: 'todos', name: 'Todos', apiId: null },
    { id: 'laptops', name: 'Laptops', apiId: 'laptops' },
    { id: 'fragrances', name: 'Fragancias', apiId: 'fragrances' },
    { id: 'furniture', name: 'Muebles', apiId: 'furniture' },
    { id: 'groceries', name: 'Despensa', apiId: 'groceries' },
    { id: 'home-decoration', name: 'Decoración', apiId: 'home-decoration' },
    { id: 'mens-shoes', name: 'Zapatos Hombre', apiId: 'mens-shoes' },
  ]

  const handleCategorySelect = (categoryId) => {
    onCategorySelect(categoryId || 'todos')
    setShowCategoryDropdown(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onSearch(searchInput)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchInput(value)
    // Busqueda en tiempo real cuando estamos en home
    if (location.pathname === '/') {
      onSearch(value)
    } else if (value.trim() === '') {
      onSearch('')
    }
  }

  // Manejar click del logo - volver a home con todos los productos
  const handleLogoClick = () => {
    setSearchInput('')
    onSearch('')
    onCategorySelect('todos')
    navigate('/')
  }

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Fila 1: Logo, Busqueda, Ubicacion, Cuotas */}
      <div className="bg-ml-yellow border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-3">
          <div className="flex items-center gap-2 md:gap-6">
            {/* Hamburger button - mobile only */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex-shrink-0 p-1 text-gray-700 hover:text-ml-blue transition"
              aria-label="Menú"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>

            {/* Logo ML - Boton para ir a home */}
            <button
              onClick={handleLogoClick}
              className="flex items-center flex-shrink-0 hover:opacity-80 transition focus:outline-none cursor-pointer"
              title="Ir a home"
            >
              <img className="h-8 md:h-10" src={logoML} alt="Mercado Libre" />
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 min-w-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-white text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-ml-blue border border-gray-300 text-sm md:text-base"
                />
                <button type="submit" className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-ml-blue">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Cart icon - mobile only (quick access) */}
            <button
              onClick={onCartClick}
              className="relative md:hidden flex-shrink-0 p-1 text-gray-700 hover:text-ml-blue transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Ubicacion - hidden on mobile */}
            <button className="hidden lg:flex items-center gap-1 text-gray-700 hover:text-ml-blue transition flex-shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Ubicacion</span>
            </button>

            {/* Cuotas - hidden on mobile/tablet */}
            <span className="hidden lg:block text-gray-700 font-bold text-xs flex-shrink-0 select-none">
              +3 CUOTAS<br />SIN INTERES
            </span>
          </div>
        </div>
      </div>

      {/* Fila 2: Menu de navegacion - DESKTOP */}
      <div className="hidden md:block border-b border-gray-300 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Links izquierda */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Categorias Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="text-sm text-gray-700 hover:text-ml-blue font-medium transition relative flex items-center gap-1"
                >
                  Categorias
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showCategoryDropdown && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          handleCategorySelect(category.id)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-ml-yellow hover:text-ml-blue font-medium transition first:rounded-t-lg last:rounded-b-lg"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => onCategorySelect('ofertas')} className="text-sm text-gray-700 hover:text-ml-blue font-medium transition">
                Ofertas
              </button>
              <button onClick={() => onCategorySelect('todos')} className="text-sm text-gray-700 hover:text-ml-blue font-medium transition hidden lg:block">
                Cupones
              </button>
              <Link to="/vender" className="text-sm text-gray-700 hover:text-ml-blue font-medium transition">
                Vender
              </Link>
              <Link to="/ayuda" className="text-sm text-gray-700 hover:text-ml-blue font-medium transition">
                Ayuda
              </Link>
            </div>

            {/* Links derecha */}
            <div className="flex items-center gap-4 lg:gap-6">
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:opacity-80 transition"
                  >
                    {/* Avatar con iniciales */}
                    <div className="w-8 h-8 rounded-full bg-ml-blue text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {getUserInitials()}
                    </div>
                    <span className="text-sm font-medium text-gray-800 max-w-[100px] truncate hidden lg:inline">
                      {getUserName()}
                    </span>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Sesion iniciada como</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{getUserName()}</p>
                      </div>
                      <Link to="/mis-compras" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Mis compras</Link>
                      <Link to="/favoritos" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Favoritos</Link>
                      <Link to="/vender" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Vender</Link>
                      <Link to="/mis-productos" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Mis productos</Link>
                      <div className="border-t border-gray-100 mt-1">
                        <button onClick={() => { setShowUserMenu(false); onLogoutClick() }} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">Cerrar sesion</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="text-sm text-ml-blue hover:underline font-bold transition"
                >
                  Inicia sesion
                </button>
              )}

              <Link to="/mis-compras" className="text-sm text-gray-700 hover:text-ml-blue font-medium transition hidden lg:block">
                Mis compras
              </Link>

              <Link
                to="/favoritos"
                className="relative flex items-center gap-1 text-gray-700 hover:text-ml-blue font-medium transition"
              >
                <span className="text-sm">Favoritos</span>
                {favoritesCount > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Carrito */}
              <button
                onClick={onCartClick}
                className="relative flex items-center gap-1 text-gray-700 hover:text-ml-blue transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[52px] bg-black bg-opacity-40 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden fixed top-[52px] left-0 w-72 h-[calc(100vh-52px)] bg-white z-50 shadow-xl transform transition-transform duration-300 overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* User section */}
        <div className="p-4 bg-ml-yellow border-b border-gray-200">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ml-blue text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {getUserInitials()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">{getUserName()}</p>
                <p className="text-xs text-gray-600">Mi cuenta</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setMobileMenuOpen(false); onLoginClick() }}
              className="w-full bg-ml-blue text-white font-bold py-2.5 rounded-lg text-sm hover:bg-blue-800 transition"
            >
              Inicia sesion
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-2">Categorias</p>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => { handleCategorySelect(category.id); setMobileMenuOpen(false) }}
              className="block w-full text-left py-2 text-sm text-gray-700 hover:text-ml-blue font-medium transition"
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Nav links */}
        <div className="p-4 border-b border-gray-100 space-y-1">
          <button onClick={() => { onCategorySelect('ofertas'); setMobileMenuOpen(false) }} className="block w-full text-left py-2 text-sm text-gray-700 hover:text-ml-blue font-medium transition">Ofertas</button>
          <Link to="/vender" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-ml-blue font-medium transition">Vender</Link>
          <Link to="/ayuda" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-ml-blue font-medium transition">Ayuda</Link>
        </div>

        {/* User links */}
        <div className="p-4 space-y-1">
          <Link to="/mis-compras" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-ml-blue font-medium transition">Mis compras</Link>
          <Link to="/favoritos" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-700 hover:text-ml-blue font-medium transition">
            Favoritos
            {favoritesCount > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{favoritesCount}</span>}
          </Link>
          <button onClick={() => { onCartClick(); setMobileMenuOpen(false) }} className="flex items-center gap-2 w-full text-left py-2 text-sm text-gray-700 hover:text-ml-blue font-medium transition">
            Carrito
            {cartCount > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{cartCount}</span>}
          </button>
          {isLoggedIn && (
            <>
              <Link to="/mis-productos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-ml-blue font-medium transition">Mis productos</Link>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button onClick={() => { setMobileMenuOpen(false); onLogoutClick() }} className="block w-full text-left py-2 text-sm text-red-600 hover:text-red-700 font-medium transition">Cerrar sesion</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}