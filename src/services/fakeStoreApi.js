// Servicio para consumir API de Platzi
// Documentación: https://fakeapi.platzi.com/

const PLATZI_API_BASE = 'https://api.escuelajs.co/api/v1';

/**
 * Obtener todos los productos de Platzi API
 * Usa el proxy de Vercel en producción, fallback a datos locales
 * @returns {Promise<Array>} Array de productos
 */
export const getAllProducts = async () => {
  try {
    const apiUrl = `${PLATZI_API_BASE}/products`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No data from API');
    }
    
    // Transformar datos de Platzi a nuestro formato
    const transformed = data.slice(0, 50).map((item) => {
      const discountChance = Math.random();
      let discountPercent = 0;
      let hasDiscount = false;
      
      if (discountChance > 0.4) {
        discountPercent = [5, 10, 15, 20, 25, 30, 35, 40][Math.floor(Math.random() * 8)];
        hasDiscount = true;
      }
      
      // Platzi API usa precios en USD, convertir a COP
      const price = item.price ? item.price * 4000 : 99999;
      const originalPrice = hasDiscount ? price / (1 - discountPercent / 100) : price;

      return {
        id: `platzi-${item.id}`,
        name: item.title,
        price: price,
        originalPrice: originalPrice,
        discountPercent: discountPercent,
        hasDiscount: hasDiscount,
        category: item.category?.name || 'otros',
        categoryId: item.category?.id,
        image: item.images?.[0] || 'https://via.placeholder.com/300x300?text=Sin+imagen',
        pictures: item.images ? item.images.map(img => ({ url: img })) : [],
        description: item.description || item.title,
        rating: 4.5,
        reviewsCount: 0,
        freeShipping: Math.random() > 0.5,
        source: 'platzi',
      };
    });
    
    return transformed;
  } catch (error) {
    console.error('Error al cargar productos de Platzi API:', error.message)
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
    console.error('Error en búsqueda Platzi:', error);
    return [];
  }
};

/**
 * Obtener detalles de un producto por ID
 * @param {string} productId - ID del producto (con prefijo 'platzi-')
 * @returns {Promise<Object>} Detalles del producto
 */
export const getProductDetails = async (productId) => {
  try {
    // Extraer ID real si tiene prefijo
    const realId = productId.startsWith('platzi-') ? productId.substring(7) : productId;
    
    const response = await fetch(`${PLATZI_API_BASE}/products/${realId}`, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener detalles: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: `platzi-${data.id}`,
      name: data.title,
      price: data.price ? data.price * 4000 : 99999,
      originalPrice: data.price ? (data.price * 4000) * 1.2 : 119999,
      image: data.images?.[0] || 'https://via.placeholder.com/300x300',
      pictures: data.images ? data.images.map(img => ({ url: img })) : [],
      description: data.description,
      category: data.category?.name || 'otros',
      rating: 4.5,
      reviewsCount: 0,
      freeShipping: Math.random() > 0.5,
      source: 'platzi',
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
    const response = await fetch(`${PLATZI_API_BASE}/products/?categoryId=${category}`, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener categoría: ${response.status}`);
    }

    const data = await response.json();

    return data.map((item) => ({
      id: `platzi-${item.id}`,
      name: item.title,
      price: item.price ? item.price * 4000 : 99999,
      originalPrice: item.price ? (item.price * 4000) * 1.2 : 119999,
      category: item.category?.name || 'otros',
      image: item.images?.[0] || 'https://via.placeholder.com/300x300',
      pictures: item.images ? item.images.map(img => ({ url: img })) : [],
      description: item.description,
      rating: 4.5,
      reviewsCount: 0,
      freeShipping: Math.random() > 0.5,
      source: 'platzi',
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
    const response = await fetch(`${PLATZI_API_BASE}/categories`, {
      headers: {
        'Accept': 'application/json',
      }
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
