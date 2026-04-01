// Servicio para consumir API de DummyJSON
// API pública, sin CORS, 100% compatible con Vercel
// Documentación: https://dummyjson.com

const DUMMY_API_BASE = 'https://dummyjson.com';

/**
 * Obtener todas las categorías disponibles
 * @returns {Promise<Array>} Array de categorías
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${DUMMY_API_BASE}/products/categories`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const categories = await response.json();
    return categories || [];
  } catch (error) {
    console.error('Error al cargar categorías:', error.message);
    return [];
  }
};

/**
 * Obtener todos los productos de DummyJSON
 * @returns {Promise<Array>} Array de productos transformados
 */
export const getAllProducts = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${DUMMY_API_BASE}/products?limit=100`, {
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
    
    if (!data.products || data.products.length === 0) {
      throw new Error('No products from API');
    }
    
    // Transformar datos de DummyJSON a nuestro formato
    const transformed = data.products.map((item) => {
      const discountChance = Math.random();
      let discountPercent = item.discountPercentage ? Math.round(item.discountPercentage) : 0;
      let hasDiscount = discountPercent > 0;
      
      // DummyJSON usa precios en USD, convertir a COP
      const price = item.price ? item.price * 4000 : 99999;
      const originalPrice = hasDiscount ? price / (1 - discountPercent / 100) : price;

      return {
        id: `dummy-${item.id}`,
        name: item.title,
        price: Math.round(price),
        originalPrice: Math.round(originalPrice),
        discountPercent: discountPercent,
        hasDiscount: hasDiscount,
        category: item.category || 'otros',
        categoryId: item.category || 'otros',
        image: item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/300x300?text=Sin+imagen',
        pictures: item.images ? item.images.map(img => ({ url: img })) : [{ url: item.thumbnail }],
        description: item.description || item.title,
        rating: item.rating || 4.5,
        reviewsCount: 0,
        freeShipping: Math.random() > 0.5,
        source: 'dummy',
      };
    });
    
    return transformed;
  } catch (error) {
    console.error('Error al cargar productos de DummyJSON API:', error.message);
    return [];
  }
};

/**
 * Obtener productos por categoría
 * @param {string} category - Categoría a filtrar
 * @returns {Promise<Array>} Array de productos de esa categoría
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${DUMMY_API_BASE}/products/category/${category}?limit=100`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.products) {
      return [];
    }
    
    // Transformar datos
    const transformed = data.products.map((item) => {
      const discountPercent = item.discountPercentage ? Math.round(item.discountPercentage) : 0;
      const hasDiscount = discountPercent > 0;
      
      const price = item.price ? item.price * 4000 : 99999;
      const originalPrice = hasDiscount ? price / (1 - discountPercent / 100) : price;

      return {
        id: `dummy-${item.id}`,
        name: item.title,
        price: Math.round(price),
        originalPrice: Math.round(originalPrice),
        discountPercent: discountPercent,
        hasDiscount: hasDiscount,
        category: item.category || 'otros',
        categoryId: item.category || 'otros',
        image: item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/300x300?text=Sin+imagen',
        pictures: item.images ? item.images.map(img => ({ url: img })) : [{ url: item.thumbnail }],
        description: item.description || item.title,
        rating: item.rating || 4.5,
        reviewsCount: 0,
        freeShipping: Math.random() > 0.5,
        source: 'dummy',
      };
    });
    
    return transformed;
  } catch (error) {
    console.error(`Error al cargar productos de categoría ${category}:`, error.message);
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
    if (!query) {
      return getAllProducts();
    }

    const response = await fetch(`${DUMMY_API_BASE}/products/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.products) {
      return [];
    }
    
    const transformed = data.products.map((item) => {
      const discountPercent = item.discountPercentage ? Math.round(item.discountPercentage) : 0;
      const hasDiscount = discountPercent > 0;
      
      const price = item.price ? item.price * 4000 : 99999;
      const originalPrice = hasDiscount ? price / (1 - discountPercent / 100) : price;

      return {
        id: `dummy-${item.id}`,
        name: item.title,
        price: Math.round(price),
        originalPrice: Math.round(originalPrice),
        discountPercent: discountPercent,
        hasDiscount: hasDiscount,
        category: item.category || 'otros',
        categoryId: item.category || 'otros',
        image: item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/300x300?text=Sin+imagen',
        pictures: item.images ? item.images.map(img => ({ url: img })) : [{ url: item.thumbnail }],
        description: item.description || item.title,
        rating: item.rating || 4.5,
        reviewsCount: 0,
        freeShipping: Math.random() > 0.5,
        source: 'dummy',
      };
    });
    
    return transformed;
  } catch (error) {
    console.error('Error al buscar productos:', error.message);
    return [];
  }
};

/**
 * Obtener detalles de un producto específico
 * @param {string} productId - ID del producto (sin el prefijo 'dummy-')
 * @returns {Promise<Object>} Objeto con detalles del producto
 */
export const getProductDetails = async (productId) => {
  try {
    const id = productId.replace('dummy-', '');
    const response = await fetch(`${DUMMY_API_BASE}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const item = await response.json();
    
    const discountPercent = item.discountPercentage ? Math.round(item.discountPercentage) : 0;
    const hasDiscount = discountPercent > 0;
    
    const price = item.price ? item.price * 4000 : 99999;
    const originalPrice = hasDiscount ? price / (1 - discountPercent / 100) : price;

    return {
      id: `dummy-${item.id}`,
      name: item.title,
      price: Math.round(price),
      originalPrice: Math.round(originalPrice),
      discountPercent: discountPercent,
      hasDiscount: hasDiscount,
      category: item.category || 'otros',
      categoryId: item.category || 'otros',
      image: item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/300x300?text=Sin+imagen',
      pictures: item.images ? item.images.map(img => ({ url: img })) : [{ url: item.thumbnail }],
      description: item.description || item.title,
      rating: item.rating || 4.5,
      reviewsCount: item.reviews?.length || 0,
      freeShipping: Math.random() > 0.5,
      source: 'dummy',
    };
  } catch (error) {
    console.error('Error al cargar detalles del producto:', error.message);
    return null;
  }
};
