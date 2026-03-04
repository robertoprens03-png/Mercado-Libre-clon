import { useNavigate } from 'react-router-dom'
import logo2 from '../img/logos/logo2-mercadolibre.webp'

export default function Footer({ onCategorySelect = () => {} }) {
  const navigate = useNavigate()

  const handleCategory = (category) => {
    onCategorySelect(category)
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Links principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-white mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleCategory('electronics')} className="hover:text-ml-yellow transition">Electronica</button>
              </li>
              <li>
                <button onClick={() => handleCategory("women's clothing")} className="hover:text-ml-yellow transition">Moda</button>
              </li>
              <li>
                <button onClick={() => handleCategory('jewelery')} className="hover:text-ml-yellow transition">Accesorios</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Comprador</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('/mis-compras')} className="hover:text-ml-yellow transition">Mis compras</button></li>
              <li><button onClick={() => navigate('/favoritos')} className="hover:text-ml-yellow transition">Mis favoritos</button></li>
              <li><button onClick={() => navigate('/carrito')} className="hover:text-ml-yellow transition">Mi carrito</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Vendedor</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('/vender')} className="hover:text-ml-yellow transition">Vender en ML</button></li>
              <li><button onClick={() => navigate('/ayuda')} className="hover:text-ml-yellow transition">Ayuda</button></li>
            </ul>
          </div>
        </div>

        {/* Linea divisora */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Informacion inferior */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className="font-bold text-white mb-2">📦 Envio gratis</h5>
            <p className="text-xs">Compra en millones de productos con envio gratis</p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2">🛡️ Compra protegida</h5>
            <p className="text-xs">Dinero de vuelta si no lo recibes o no es lo que esperabas</p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2">💳 Pago seguro</h5>
            <p className="text-xs">Tus datos siempre protegidos</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img className="h-10" src={logo2} alt="Mercado Libre" />
          </div>
          <p className="text-xs text-center">
            © 1999-2026 Mercado Libre Colombia LTDA.
          </p>
          <p className="text-xs text-center text-gray-500 mt-2">
            Calle 100 #7-33, Torre I, Piso 16, Bogota D.C., Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}