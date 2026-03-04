# 🛒 Mercado Libre Clone - Proyecto Académico

Un clon funcional de Mercado Libre desarrollado en **React** con **Tailwind CSS**, creado como proyecto final para una clase de desarrollo web.

## 🎯 Características Implementadas

### ✅ Navegación y Búsqueda
- **Navbar con dos filas**: Logo, buscador, ubicación, suscripción MELI+
- **Barra de búsqueda funcional**: Filtra productos en tiempo real
- **Menú de categorías**: Todos, Electrónica, Moda, Accesorios, Ofertas

### ✅ Gestión de Productos
- **Grid responsive** de productos (1-4 columnas según pantalla)
- **Tarjetas de producto** con:
  - Imagen del producto
  - Nombre y descripción
  - Precio actual y original
  - Descuento en porcentaje
  - Rating de estrellas (1-5)
  - Badge de "Envío Gratis" cuando aplica
  - Botón "Agregar al carrito"

### ✅ Carrito de Compras
- **Vista completa del carrito** con:
  - Imagen, nombre, descripción de cada producto
  - Cantidad de productos
  - Precio individual y total
  - Botón para eliminar productos
  - Resumen de compra (subtotal, envío gratis, total)
  - Contador de productos en el navbar

### ✅ Autenticación Básica
- **Modal de Login simple**
- Inicia/cierra sesión
- Muestra estado en el navbar

### ✅ Diseño Visual
- **Identidad visual de Mercado Libre**:
  - Color amarillo principal (#FADA55)
  - Color azul oscuro (#001F5C)
  - Tipografía limpia y moderna
- **Responsive design**: Funciona en móvil, tablet y desktop
- **Footer completo** con enlaces y información

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Función |
|-----------|---------|---------|
| **React** | 18.2.0 | Framework de UI |
| **Vite** | 5.0.8 | Bundler y dev server |
| **Tailwind CSS** | 3.3.6 | Framework de estilos |
| **JavaScript** | ES6+ | Lenguaje de programación |

---

## 📁 Estructura del Proyecto

```
mercado-libre/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Barra de navegación (2 filas)
│   │   ├── Menu.jsx             # Menú de categorías
│   │   ├── ProductCard.jsx       # Tarjeta individual de producto
│   │   ├── ProductList.jsx       # Grid de productos
│   │   ├── Cart.jsx              # Vista del carrito
│   │   ├── LoginModal.jsx        # Modal de login
│   │   └── Footer.jsx            # Pie de página
│   ├── data/
│   │   └── products.js           # Datos de 16 productos simulados
│   ├── App.jsx                   # Componente principal (lógica central)
│   ├── main.jsx                  # Punto de entrada de React
│   └── index.css                 # Estilos globales
├── package.json                  # Dependencias
├── vite.config.js                # Configuración de Vite
├── tailwind.config.js            # Configuración de Tailwind
├── postcss.config.js             # Configuración PostCSS
└── index.html                    # HTML principal
```

---

## 🚀 Cómo Ejecutar el Proyecto

### 1. Instalación de dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm run dev
```

Luego abre tu navegador en: **http://localhost:5175**

### 3. Compilar para producción
```bash
npm run build
```

---

## 💻 Explicación del Código Principal

### **App.jsx** - Cerebro de la aplicación

```javascript
// Estado global de la app
const [products] = useState(productsData)      // Lista de productos
const [cart, setCart] = useState([])           // Carrito de compras
const [filteredProducts, setFilteredProducts]  // Productos filtrados
const [selectedCategory, setSelectedCategory]  // Categoría activa
const [isLoggedIn, setIsLoggedIn]              // Estado de login
```

**Funciones principales:**
- `handleSearch()` - Filtra productos por búsqueda
- `handleCategoryFilter()` - Filtra por categoría u ofertas
- `handleAddToCart()` - Agrega productos al carrito
- `handleRemoveFromCart()` - Elimina productos del carrito
- `handleLogin()` / `handleLogout()` - Gestiona autenticación

---

## 📦 Datos de Productos

El archivo `src/data/products.js` contiene **16 productos** con la siguiente estructura:

```javascript
{
  id: 1,
  name: 'iPhone 15 Pro',
  price: 999.99,
  originalPrice: 1199.99,
  category: 'electronica',
  image: 'https://...',
  description: 'Último modelo de Apple...',
  rating: 4.8,
  freeShipping: true,
}
```

### Categorías disponibles:
- `electronica` - Teléfonos, laptops, cámaras, etc.
- `moda` - Ropa y calzado
- `accesorios` - Mochilas, fundas, cables, etc.
- `ofertas` - Productos con descuento

---

## 🎨 Personalización

### Cambiar colores de Mercado Libre

En `tailwind.config.js`:
```javascript
colors: {
  'ml-yellow': '#FADA55',  // Amarillo ML
  'ml-blue': '#001F5C',    // Azul ML
  'ml-gray': '#E8E8E8',    // Gris ML
}
```

### Agregar más productos

Abre `src/data/products.js` y agrega nuevos objetos al array `productsData`.

### Modificar categorías

En `src/components/Menu.jsx` edita el array `categories`.

---

## 🔧 Funcionalidades Posibles a Futuro

- [ ] Sistema de filtros avanzados (por precio, rating, etc.)
- [ ] Página de detalle de producto
- [ ] Métodos de pago reales (Mercado Pago)
- [ ] Historial de compras del usuario
- [ ] Wishlist/Favoritos
- [ ] Sistema de reviews y comentarios
- [ ] Chat con vendedor
- [ ] Seguimiento de envíos
- [ ] Base de datos (Firebase o PostgreSQL)

---

## 📝 Notas Importantes

- Este es un proyecto académico con **datos simulados**
- Los productos no son reales y las imágenes vienen de **Unsplash**
- El login es básico sin validación real
- No hay integración con base de datos real
- El checkout no procesa pagos reales

---

## 👨‍💻 Autor

Proyecto desarrollado como entrega final de una clase de React.

---

## 📄 Licencia

Uso libre para fines educativos.
# clon-mercado-libre
