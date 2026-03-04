import Navbar from '../components/BarraNavegacion'
import Footer from '../components/PieDePagina'
import CheckoutPage from '../components/PaginaCheckout'

export default function CarritoPage({
  cart = [],
  isLoggedIn = false,
  user = null,
  favorites = [],
  onSearch = () => {},
  onLoginClick = () => {},
  onLogoutClick = () => {},
  onCartClick = () => {},
  onRemoveFromCart = () => {},
  onPurchase = () => {},
  onCategorySelect = () => {}
}) {
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
        <CheckoutPage
          cart={cart}
          onRemoveFromCart={onRemoveFromCart}
          onPurchase={onPurchase}
        />
      </main>

      <Footer onCategorySelect={onCategorySelect} />
    </div>
  )
}
