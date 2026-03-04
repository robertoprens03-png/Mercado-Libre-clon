import Navbar from '../components/BarraNavegacion'
import Footer from '../components/PieDePagina'
import ProductPreview from '../components/VistaProducto'

export default function HomePage({ 
  products = [], 
  favorites = [],
  cart = [],
  isLoggedIn = false,
  user = null,
  onSearch = () => {},
  onLoginClick = () => {},
  onLogoutClick = () => {},
  onCartClick = () => {},
  onAddToCart = () => {},
  onViewDetails = () => {},
  onAddToFavorites = () => {},
  onRemoveFromCart = () => {},
  onRemoveFromFavorites = () => {},
  onCategorySelect = () => {}
}) {
  return (
    <div className="min-h-screen bg-ml-gray flex flex-col">
      <Navbar
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        user={user}
        onCategorySelect={onCategorySelect}
      />

      <main className="flex-1">
        <ProductPreview
          products={products}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          onAddToFavorites={onAddToFavorites}
          favorites={favorites}
        />
      </main>

      <Footer onCategorySelect={onCategorySelect} />
    </div>
  )
}
