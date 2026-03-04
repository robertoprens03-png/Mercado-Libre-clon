import { useState } from 'react'
import Navbar from '../components/BarraNavegacion'
import Footer from '../components/PieDePagina'

export default function MyPurchasesPage({
  purchases = [],
  isLoggedIn = false,
  user = null,
  cart = [],
  favorites = [],
  onSearch = () => {},
  onLoginClick = () => {},
  onLogoutClick = () => {},
  onCartClick = () => {},
  onCategorySelect = () => {}
}) {
  const [selectedTab, setSelectedTab] = useState('all')

  const filterPurchases = () => {
    if (selectedTab === 'all') return purchases
    if (selectedTab === 'pending') return purchases.filter(p => p.status === 'pendiente')
    if (selectedTab === 'completed') return purchases.filter(p => p.status === 'entregado')
    if (selectedTab === 'cancelled') return purchases.filter(p => p.status === 'cancelado')
    return purchases
  }

  const filteredPurchases = filterPurchases()

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

      <main className="flex-1 max-w-7xl mx-auto w-full py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis compras</h1>
          <p className="text-gray-600">Historial y estado de todas tus compras</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-200 bg-white rounded-t-lg overflow-hidden mb-0">
          <button
            onClick={() => setSelectedTab('all')}
            className={`flex-1 py-4 px-6 text-sm font-medium transition border-b-2 ${
              selectedTab === 'all'
                ? 'text-ml-blue border-ml-blue'
                : 'text-gray-600 hover:text-gray-900 border-transparent'
            }`}
          >
            Todas las compras
            <span className="ml-2 text-gray-500">({purchases.length})</span>
          </button>
          <button
            onClick={() => setSelectedTab('pending')}
            className={`flex-1 py-4 px-6 text-sm font-medium transition border-b-2 ${
              selectedTab === 'pending'
                ? 'text-ml-blue border-ml-blue'
                : 'text-gray-600 hover:text-gray-900 border-transparent'
            }`}
          >
            En proceso
            <span className="ml-2 text-gray-500">
              ({purchases.filter(p => p.status === 'pendiente').length})
            </span>
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`flex-1 py-4 px-6 text-sm font-medium transition border-b-2 ${
              selectedTab === 'completed'
                ? 'text-ml-blue border-ml-blue'
                : 'text-gray-600 hover:text-gray-900 border-transparent'
            }`}
          >
            Entregadas
            <span className="ml-2 text-gray-500">
              ({purchases.filter(p => p.status === 'entregado').length})
            </span>
          </button>
          <button
            onClick={() => setSelectedTab('cancelled')}
            className={`flex-1 py-4 px-6 text-sm font-medium transition border-b-2 ${
              selectedTab === 'cancelled'
                ? 'text-ml-blue border-ml-blue'
                : 'text-gray-600 hover:text-gray-900 border-transparent'
            }`}
          >
            Canceladas
            <span className="ml-2 text-gray-500">
              ({purchases.filter(p => p.status === 'cancelado').length})
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-lg shadow-sm p-6">
          {filteredPurchases.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-20 h-20 mx-auto text-gray-300 mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z" />
              </svg>
              <p className="text-gray-500 text-xl font-medium">
                {selectedTab === 'all' && 'No tienes compras aún'}
                {selectedTab === 'pending' && 'No hay compras en proceso'}
                {selectedTab === 'completed' && 'No hay compras entregadas'}
                {selectedTab === 'cancelled' && 'No hay compras canceladas'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Cuando compres algo, aparecerá aquí
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPurchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition flex gap-4"
                >
                  <img
                    src={purchase.image}
                    alt={purchase.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{purchase.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      ID de compra: <span className="font-mono">{purchase.orderId}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(purchase.date).toLocaleDateString('es-CO')}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      {purchase.status === 'pendiente' && (
                        <>
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                            ⏳ En proceso de envío
                          </span>
                          <span className="text-xs text-gray-500">Entrega estimada: 5-7 días</span>
                        </>
                      )}
                      {purchase.status === 'entregado' && (
                        <>
                          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                            ✓ Entregado
                          </span>
                          <span className="text-xs text-gray-500">Entregado el {new Date(purchase.date).toLocaleDateString('es-CO')}</span>
                        </>
                      )}
                      {purchase.status === 'cancelado' && (
                        <>
                          <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                            ✕ Cancelado
                          </span>
                          <span className="text-xs text-gray-500">Reembolso procesado</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ${purchase.total.toLocaleString('es-CO')}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">x{purchase.quantity}</p>
                    <div className="mt-4 flex flex-col gap-2">
                      <button className="text-sm text-ml-blue hover:underline font-medium">
                        Ver detalles
                      </button>
                      {purchase.status === 'entregado' && (
                        <button className="text-sm text-ml-blue hover:underline font-medium">
                          Dejar reseña
                        </button>
                      )}
                      {purchase.status === 'entregado' && (
                        <button className="text-sm text-ml-blue hover:underline font-medium">
                          Volver a comprar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer onCategorySelect={onCategorySelect} />
    </div>
  )
}
