// Servicio para consumir la API de Mercado Libre sin autenticación
// Documentación: https://developers.mercadolibre.com/es_co/api-docs-es.html

import { productsData } from '../data/products.js'

const ML_API_BASE = 'https://api.mercadolibre.com/sites/MCO';

/**
 * Buscar productos en Mercado Libre o usar fallback local
 * @param {string} query - Término de búsqueda (ej: "laptop", "iphone", "zapatillas")
 * @param {number} limit - Cantidad de resultados (default: 20, máximo: 50)
 * @returns {Promise<Array>} Array de productos
 */
export const searchProducts = async (query, limit = 20) => {
  try {
    const response = await fetch(
      `${ML_API_BASE}/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit'
      }
    );

    if (!response.ok) {
      console.warn(`API error ${response.status}. Usando datos locales...`);
      throw new Error(`Error en búsqueda: ${response.status}`);
    }

    const data = await response.json();

    // Transformar datos de ML a nuestro formato
    return data.results.map((item) => ({
      id: `ml-${item.id}`, // Prefijo 'ml-' para diferenciar de IDs locales
      name: item.title,
      price: item.price,
      originalPrice: item.original_price || item.price,
      category: 'ml-api',
      image: item.thumbnail,
      pictures: item.pictures || [{ url: item.thumbnail }],
      description: item.title,
      rating: item.reviews_rating_average || 4.5,
      reviewsCount: item.reviews_count || 0,
      freeShipping: item.shipping?.free_shipping || false,
      mlLink: item.permalink,
      condition: item.condition,
      soldQuantity: item.sold_quantity || 0,
      available: item.available_quantity || 0,
    }));
  } catch (error) {
    console.warn('API Mercado Libre no disponible. Usando productos locales.');
    
    // FALLBACK: Usar productos locales filtrados por búsqueda
    if (!query) return productsData;
    
    const queryLower = query.toLowerCase();
    const filtered = productsData.filter(product => 
      product.name.toLowerCase().includes(queryLower) ||
      product.category.toLowerCase().includes(queryLower) ||
      product.description.toLowerCase().includes(queryLower)
    );
    
    return filtered.length > 0 ? filtered.slice(0, limit) : productsData.slice(0, limit);
  }
};

/**
 * Obtener detalles completos de un producto por ID
 * @param {string} itemId - ID del producto en ML
 * @returns {Promise<Object>} Detalles del producto
 */
export const getProductDetails = async (itemId) => {
  try {
    // Buscar primero en productos locales
    const localProduct = productsData.find(p => p.id === itemId);
    if (localProduct) {
      return {
        ...localProduct,
        pictures: [{ url: localProduct.image }], // Convertir a array si no lo es
        attributes: [
          { id: 'brand', name: 'Marca', value_name: 'Premium' },
          { id: 'condition', name: 'Condición', value_name: 'Nuevo' },
          { id: 'warranty', name: 'Garantía', value_name: '12 meses' }
        ],
        shipping: { free_shipping: localProduct.freeShipping },
      };
    }

    // Intentar obtener de API (extraer ID real si tiene prefijo)
    const apiId = itemId.startsWith('ml-') ? itemId.substring(3) : itemId;
    
    const response = await fetch(`${ML_API_BASE}/items/${apiId}`, {
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
      credentials: 'omit'
    });

    if (!response.ok) {
      throw new Error(`Error al obtener detalles: ${response.status}`);
    }

    const data = await response.json();

    // Obtener descripción completa
    let fullDescription = data.title;
    try {
      const descResponse = await fetch(`${ML_API_BASE}/items/${apiId}/description`, {
        mode: 'cors',
        credentials: 'omit'
      });
      if (descResponse.ok) {
        const descData = await descResponse.json();
        fullDescription = descData.plain_text || data.title;
      }
    } catch (e) {
      console.warn('No se pudo obtener descripción completa');
    }

    return {
      id: `ml-${data.id}`, // Mantener el prefijo en el ID retornado
      name: data.title,
      price: data.price,
      originalPrice: data.original_price || data.price,
      image: data.thumbnail,
      pictures: data.pictures || [],
      description: fullDescription,
      condition: data.condition,
      soldQuantity: data.sold_quantity,
      available: data.available_quantity,
      mlLink: data.permalink,
      rating: data.reviews_rating_average || 4.5,
      reviewsCount: data.reviews_count || 0,
      attributes: data.attributes || [],
      shipping: data.shipping || {},
    };
  } catch (error) {
    console.warn('No se pudieron obtener detalles de API. Buscando en locales...');
    
    // FALLBACK: Buscar en productos locales
    const localProduct = productsData.find(p => p.id === itemId);
    if (localProduct) {
      return {
        ...localProduct,
        pictures: [{ url: localProduct.image }],
        attributes: [
          { id: 'brand', name: 'Marca', value_name: 'Premium' },
          { id: 'condition', name: 'Condición', value_name: 'Nuevo' },
          { id: 'warranty', name: 'Garantía', value_name: '12 meses' }
        ],
        shipping: { free_shipping: localProduct.freeShipping },
      };
    }
    
    return null;
  }
};

/**
 * Buscar productos por categoría
 * @param {string} category - Categoría (ej: "Electrónica", "Ropa", "Hogar")
 * @param {number} limit - Cantidad de resultados
 * @returns {Promise<Array>} Array de productos
 */
export const searchByCategory = async (category, limit = 20) => {
  return searchProducts(category, limit);
};

/**
 * Obtener sugerencias de búsqueda (autocomplete)
 * @param {string} query - Término parcial
 * @returns {Promise<Array>} Array de sugerencias
 */
export const getSearchSuggestions = async (query) => {
  try {
    const response = await fetch(
      `${ML_API_BASE}/search/tags?q=${encodeURIComponent(query)}`,
      {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        credentials: 'omit'
      }
    );

    if (!response.ok) {
      // FALLBACK: Sugerencias locales
      const queryLower = query.toLowerCase();
      const suggestions = [
        ...new Set(
          productsData
            .filter(p => p.name.toLowerCase().includes(queryLower))
            .map(p => p.category)
        )
      ].slice(0, 5);
      return suggestions.length > 0 ? suggestions : ['Electrónica', 'Moda', 'Hogar'];
    }

    const data = await response.json();
    return data.map((item) => item.name);
  } catch (error) {
    console.warn('Sugerencias de API no disponibles. Usando sugerencias locales.');
    // FALLBACK: Sugerencias básicas
    return ['Electrónica', 'Computadora', 'Celular', 'Moda', 'Hogar'];
  }
};
