// Servicio para consumir FakeStore API
// Documentación: https://fakestoreapi.com/

const FAKE_STORE_API_BASE = 'https://fakestoreapi.com';

/**
 * Obtener todos los productos de FakeStore
 * @returns {Promise<Array>} Array de productos
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${FAKE_STORE_API_BASE}/products`, {
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit'
    });

    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status}`);
    }

    const data = await response.json();

    // Transformar datos de FakeStore a nuestro formato
    return data.map((item, index) => {
      // Variar descuentos: algunos productos sin descuento, otros con descuentos variados
      const discountChance = Math.random();
      let discountPercent = 0;
      let hasDiscount = false;
      
      if (discountChance > 0.4) { // 60% de productos con descuento
        discountPercent = [5, 10, 15, 20, 25, 30, 35, 40][Math.floor(Math.random() * 8)];
        hasDiscount = true;
      }
      
      const priceInCOP = item.price * 4000;
      const originalPrice = hasDiscount ? priceInCOP / (1 - discountPercent / 100) : priceInCOP;

      return {
        id: `fake-${item.id}`,
        name: item.title,
        price: priceInCOP,
        originalPrice: originalPrice,
        discountPercent: discountPercent,
        hasDiscount: hasDiscount,
        category: item.category,
        image: item.image,
        pictures: [{ url: item.image }],
        description: item.description,
        rating: item.rating?.rate || 4.5,
        reviewsCount: item.rating?.count || 0,
        freeShipping: Math.random() > 0.5, // Aleatorio para variar
        source: 'fakestore',
      };
    });
  } catch (error) {
    console.error('Error en FakeStore API:', error);
    return [];
  }
};

/**
 * Buscar productos por término
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} Array de productos filtrados
 */
export const searchProducts = async (query) => {
  try {
    const allProducts = await getAllProducts();
    
    if (!query) return allProducts;
    
    const queryLower = query.toLowerCase();
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(queryLower) ||
      product.category.toLowerCase().includes(queryLower) ||
      product.description.toLowerCase().includes(queryLower)
    );
  } catch (error) {
    console.error('Error en búsqueda FakeStore:', error);
    return [];
  }
};

/**
 * Obtener detalles de un producto por ID
 * @param {string} productId - ID del producto (con prefijo 'fake-')
 * @returns {Promise<Object>} Detalles del producto
 */
export const getProductDetails = async (productId) => {
  try {
    // Extraer ID real si tiene prefijo
    const realId = productId.startsWith('fake-') ? productId.substring(5) : productId;
    
    const response = await fetch(`${FAKE_STORE_API_BASE}/products/${realId}`, {
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit'
    });

    if (!response.ok) {
      throw new Error(`Error al obtener detalles: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: `fake-${data.id}`,
      name: data.title,
      price: data.price * 4000,
      originalPrice: (data.price * 4000) * 1.2,
      image: data.image,
      pictures: [{ url: data.image }],
      description: data.description,
      category: data.category,
      rating: data.rating?.rate || 4.5,
      reviewsCount: data.rating?.count || 0,
      freeShipping: Math.random() > 0.5,
      source: 'fakestore',
      available: Math.floor(Math.random() * 50) + 5,
      soldQuantity: Math.floor(Math.random() * 200) + 10,
      condition: 'new',
    };
  } catch (error) {
    console.error('Error obteniendo detalles del producto:', error);
    return null;
  }
};

/**
 * Obtener productos por categoría
 * @param {string} category - Categoría
 * @returns {Promise<Array>} Array de productos de esa categoría
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${FAKE_STORE_API_BASE}/products/category/${category}`, {
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit'
    });

    if (!response.ok) {
      throw new Error(`Error al obtener categoría: ${response.status}`);
    }

    const data = await response.json();

    return data.map((item) => ({
      id: `fake-${item.id}`,
      name: item.title,
      price: item.price * 4000,
      originalPrice: (item.price * 4000) * 1.2,
      category: item.category,
      image: item.image,
      pictures: [{ url: item.image }],
      description: item.description,
      rating: item.rating?.rate || 4.5,
      reviewsCount: item.rating?.count || 0,
      freeShipping: Math.random() > 0.5,
      source: 'fakestore',
    }));
  } catch (error) {
    console.error('Error obteniendo categoría:', error);
    return [];
  }
};

/**
 * Obtener todas las categorías disponibles
 * @returns {Promise<Array>} Array de categorías
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${FAKE_STORE_API_BASE}/products/categories`, {
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit'
    });

    if (!response.ok) {
      throw new Error(`Error al obtener categorías: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    return [];
  }
};
