import { useParams } from 'react-router-dom'
import Navbar from './BarraNavegacion'
import Footer from './PieDePagina'
import ProductDetailPage from './PaginaDetalleProducto'

export default function ProductDetailPageWithLayout({
  onSearch = () => {},
  isLoggedIn = false,
  user = null,
  onLoginClick = () => {},
  onLogoutClick = () => {},
  cart = [],
  favorites = [],
  onCartClick = () => {},
  onAddToCart = () => {},
  onAddToFavorites = () => {},
  onCategorySelect = () => {}
}) {
  const { productId } = useParams()

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

      <main className="flex-1">
        <ProductDetailPage
          productId={productId}
          onAddToCart={onAddToCart}
          onAddToFavorites={onAddToFavorites}
          isFavorite={favorites.some(fav => fav.id === productId)}
        />
      </main>

      <Footer onCategorySelect={onCategorySelect} />
    </div>
  )
}
