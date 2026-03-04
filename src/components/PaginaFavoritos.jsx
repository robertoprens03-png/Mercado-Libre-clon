import Navbar from './BarraNavegacion'
import Footer from './PieDePagina'
import Favorites from './Favoritos'

export default function FavoritesPage({
  favorites = [],
  cart = [],
  isLoggedIn = false,
  user = null,
  onSearch = () => {},
  onLoginClick = () => {},
  onLogoutClick = () => {},
  onCartClick = () => {},
  onRemoveFavorite = () => {},
  onAddToCart = () => {},
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
        <Favorites
          favorites={favorites}
          onRemoveFavorite={onRemoveFavorite}
          onAddToCart={onAddToCart}
          onViewDetails={() => {}}
        />
      </main>

      <Footer onCategorySelect={onCategorySelect} />
    </div>
  )
}
