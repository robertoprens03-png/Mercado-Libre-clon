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
                <button onClick={() => handleCategory('2')} className="hover:text-ml-yellow transition">Electrónica ✓</button>
              </li>
              <li>
                <button onClick={() => handleCategory('1')} className="hover:text-ml-yellow transition">Ropa ✓</button>
              </li>
              <li>
                <button onClick={() => handleCategory('3')} className="hover:text-ml-yellow transition">Muebles ✓</button>
              </li>
              <li>
                <button onClick={() => handleCategory('4')} className="hover:text-ml-yellow transition">Zapatos ✓</button>
              </li>
              <li>
                <button onClick={() => handleCategory('5')} className="hover:text-ml-yellow transition">Otros ✓</button>
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
            <h5 className="font-bold text-white mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-ml-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              Envio gratis
            </h5>
            <p className="text-xs">Compra en millones de productos con envio gratis</p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-ml-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Compra protegida
            </h5>
            <p className="text-xs">Dinero de vuelta si no lo recibes o no es lo que esperabas</p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-ml-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              Pago seguro
            </h5>
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