import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logoML from '../img/logos/logo-mercadolibre.webp'

export default function Navbar({ onSearch, isLoggedIn, user = null, onLoginClick, onLogoutClick, cartCount, onCartClick, favoritesCount, onCategorySelect = () => {} }) {
  const [searchInput, setSearchInput] = useState('')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
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

  // Categorias reales de FakeStore API
  const categories = [
    { id: 'todos', name: 'Todos', apiName: null },
    { id: 'electronics', name: 'Electronica', apiName: 'electronics' },
    { id: 'jewelery', name: 'Joyeria', apiName: 'jewelery' },
    { id: "men's clothing", name: "Hombre", apiName: "men's clothing" },
    { id: "women's clothing", name: "Mujer", apiName: "women's clothing" },
  ]

  const handleCategorySelect = (apiName) => {
    onCategorySelect(apiName || 'todos')
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
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Logo ML - Boton para ir a home */}
            <button
              onClick={handleLogoClick}
              className="flex items-center flex-shrink-0 hover:opacity-80 transition focus:outline-none cursor-pointer"
              title="Ir a home"
            >
              <img className="h-10" src={logoML} alt="Mercado Libre" />
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos, marcas y mas..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-ml-blue border border-gray-300"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ml-blue">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Ubicacion */}
            <button className="flex items-center gap-1 text-gray-700 hover:text-ml-blue transition flex-shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Ubicacion</span>
            </button>

            {/* Cuotas - solo texto, no clickable */}
            <span className="text-gray-700 font-bold text-xs flex-shrink-0 select-none">
              +3 CUOTAS<br />SIN INTERES
            </span>
          </div>
        </div>
      </div>

      {/* Fila 2: Menu de navegacion */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Links izquierda */}
            <div className="flex items-center gap-6">
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
                          handleCategorySelect(category.apiName || 'todos')
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
              <button onClick={() => onCategorySelect('todos')} className="text-sm text-gray-700 hover:text-ml-blue font-medium transition">
                Cupones
              </button>
              <button onClick={() => handleCategorySelect("women's clothing")} className="text-sm text-gray-700 hover:text-ml-blue font-medium transition">
                Moda
              </button>
              <Link to="/vender" className="text-sm text-gray-700 hover:text-ml-blue font-medium transition">
                Vender
              </Link>
              <Link to="/ayuda" className="text-sm text-gray-700 hover:text-ml-blue font-medium transition">
                Ayuda
              </Link>
            </div>

            {/* Links derecha */}
            <div className="flex items-center gap-6">
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
                    <span className="text-sm font-medium text-gray-800 max-w-[100px] truncate">
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
                        <p className="text-xs text-gray-500">Sesión iniciada como</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{getUserName()}</p>
                      </div>
                      <Link
                        to="/mis-compras"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Mis compras
                      </Link>
                      <Link
                        to="/favoritos"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Favoritos
                      </Link>
                      <Link
                        to="/vender"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Vender
                      </Link>
                      <Link
                        to="/mis-productos"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Mis productos
                      </Link>
                      <div className="border-t border-gray-100 mt-1">
                        <button
                          onClick={() => { setShowUserMenu(false); onLogoutClick() }}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                          Cerrar sesión
                        </button>
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

              <Link
                to="/mis-compras"
                className="text-sm text-gray-700 hover:text-ml-blue font-medium transition"
              >
                Mis compras
              </Link>

              <Link
                to="/favoritos"
                className="relative flex items-center gap-1 text-gray-700 hover:text-ml-blue font-medium transition"
              >
                Favoritos
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
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
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
    </nav>
  )
}