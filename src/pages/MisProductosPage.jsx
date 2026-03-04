import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/BarraNavegacion'
import Footer from '../components/PieDePagina'
import { formatPrice } from '../utils/formatPrice'

const CONDITION_LABELS = { new: 'Nuevo', used: 'Usado', refurbished: 'Reacondicionado' }

export default function MisProductosPage({
  isLoggedIn = false,
  user = null,
  onSearch = () => {},
  onLoginClick = () => {},
  onLogoutClick = () => {},
  cart = [],
  favorites = [],
  onCartClick = () => {},
  onCategorySelect = () => {}
}) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ml_listed_products')
      setProducts(saved ? JSON.parse(saved) : [])
    } catch {
      setProducts([])
    }
  }, [])

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)
    localStorage.setItem('ml_listed_products', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-ml-gray flex flex-col">
      <Navbar
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        cartCount={cart.length}
        onCartClick={onCartClick}
        favoritesCount={favorites.length}
        onCategorySelect={onCategorySelect}
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mis productos publicados</h1>
            <p className="text-sm text-gray-500 mt-1">
              {products.length} {products.length === 1 ? 'publicación' : 'publicaciones'}
            </p>
          </div>
          <Link
            to="/vender"
            className="bg-ml-blue text-white font-bold px-5 py-2.5 rounded-lg hover:bg-blue-800 transition text-sm"
          >
            Publicar nuevo
          </Link>
        </div>

        {/* Empty state */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Todavía no tenés publicaciones</h2>
            <p className="text-gray-500 text-sm mb-6">
              Publicá tu primer producto y llegá a millones de compradores.
            </p>
            <Link
              to="/vender"
              className="bg-ml-blue text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Empezar a vender
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-5 items-start"
              >
                {/* Imagen */}
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-20 h-20 object-contain rounded-lg border border-gray-100 flex-shrink-0"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product.category && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {product.category}
                          </span>
                        )}
                        {product.condition && (
                          <span className="text-xs bg-blue-50 text-ml-blue px-2 py-0.5 rounded-full">
                            {CONDITION_LABELS[product.condition] || product.condition}
                          </span>
                        )}
                        {product.stock && (
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                            Stock: {product.stock}
                          </span>
                        )}
                      </div>
                      {product.description && (
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                      )}
                    </div>

                    {/* Precio y fecha */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl font-bold text-gray-900">{formatPrice(Number(product.price))}</p>
                      {product.publishedAt && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(product.publishedAt).toLocaleDateString('es-CO', {
                            day: '2-digit', month: 'short', year: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-red-500 transition p-1"
                  title="Eliminar publicación"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer onCategorySelect={onCategorySelect} />
    </div>
  )
}
