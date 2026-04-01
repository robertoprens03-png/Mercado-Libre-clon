// Servicio para consumir Platzi Fake Store API
// API más confiable con mejor CORS support
// Documentación: https://fakeapi.platzi.com/

const PLATZI_API_BASE = 'https://api.escuelajs.co/api/v1';

/**
 * Generar productos de ejemplo como último fallback
 * @returns {Array} Array de productos demo
 */
const generateDemoProducts = () => {
  return [
    {
      id: 'demo-1',
      title: 'Laptop HP Pavilion 15',
      price: 549.99,
      category: 'Electronics',
      description: 'Portátil HP Pavilion de 15.6" con procesador Intel i5',
      images: ['https://images.unsplash.com/photo-1588405748900-9a9e2edff08b?w=300&h=300&fit=crop'],
      rating: 4.5
    },
    {
      id: 'demo-2',
      title: 'iPhone 15 Pro Max',
      price: 999.99,
      category: 'Electronics',
      description: 'Último modelo de Apple con A17 Pro Bionic',
      images: ['https://images.unsplash.com/photo-1592286927505-1fed5ae5a460?w=300&h=300&fit=crop'],
      rating: 4.8
    },
    {
      id: 'demo-3',
      title: 'Sony WH-1000XM5 Headphones',
      price: 399.99,
      category: 'Electronics',
      description: 'Audífonos con cancelación de ruido premium',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'],
      rating: 4.9
    },
    {
      id: 'demo-4',
      title: 'Samsung Galaxy S24',
      price: 899.99,
      category: 'Electronics',
      description: 'Smartphone Android premium con cámara avanzada',
      images: ['https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=300&h=300&fit=crop'],
      rating: 4.7
    },
    {
      id: 'demo-5',
      title: 'Samsung 4K Smart TV 55"',
      price: 799.99,
      category: 'Electronics',
      description: 'Televisor Samsung 55" 4K con HDR y Smart TV',
      images: ['https://images.unsplash.com/photo-1461151304267-38535e780c79?w=300&h=300&fit=crop'],
      rating: 4.6
    },
    {
      id: 'demo-6',
      title: 'Apple Watch Series 9',
      price: 399.99,
      category: 'Electronics',
      description: 'Reloj inteligente Apple con monitor de salud',
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'],
      rating: 4.7
    },
    {
      id: 'demo-7',
      title: 'iPad Pro 12.9"',
      price: 1099.99,
      category: 'Electronics',
      description: 'Tablet iPad Pro 12.9" con chip M2',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop'],
      rating: 4.8
    },
    {
      id: 'demo-8',
      title: 'Canon EOS R6 Camera',
      price: 2499.99,
      category: 'Electronics',
      description: 'Cámara profesional Canon con sensor de 20MP',
      images: ['https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=300&h=300&fit=crop'],
      rating: 4.9
    }
  ];
};

/**
 * Obtener todos los productos desde Platzi Fake Store API
 * Fallback a datos demo si la API falla
 * @returns {Promise<Array>} Array de productos
 */
export const getAllProducts = async () => {
  try {
    console.log('🔄 [PLATZI API] Intentando cargar productos...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    // Llamar a Platzi API
    const response = await fetch(`${PLATZI_API_BASE}/products?limit=20`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      mode: 'cors'
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ [PLATZI API] Cargados ${data?.length || 0} productos`);
    
    // Transformar datos de Platzi a nuestro formato
    return transformPlatziProducts(data);
    
  } catch (error) {
    console.warn(`⚠️ [PLATZI API] Error: ${error.message}`);
    console.log('� Usando productos de demostración');
    return generateDemoProducts();
  }
};

/**
 * Transformar productos de Platzi API a formato estándar
 * @param {Array} data - Datos de Platzi API
 * @returns {Array} Productos transformados
 */
function transformPlatziProducts(data) {
  return data.map((item, index) => {
    // Aplicar descuentos aleatorios
    const discountChance = Math.random();
    let discountPercent = 0;
    let hasDiscount = false;
    
    if (discountChance > 0.4) {
      discountPercent = [5, 10, 15, 20, 25, 30][Math.floor(Math.random() * 6)];
      hasDiscount = true;
    }
    
    // Convertir a COP (1 USD = 4000 COP aproximadamente)
    const priceUSD = item.price || 100;
    const priceInCOP = priceUSD * 4000;
    const originalPrice = hasDiscount ? priceInCOP / (1 - discountPercent / 100) : priceInCOP;
    
    // Obtener imagen (Platzi API devuelve array de imágenes)
    const image = item.images?.[0] || item.image || 'https://via.placeholder.com/300x300?text=Producto';

    return {
      id: `platzi-${item.id}`,
      name: item.title || item.name || 'Producto sin nombre',
      price: priceInCOP,
      originalPrice: originalPrice,
      discountPercent: discountPercent,
      hasDiscount: hasDiscount,
      category: item.category?.name || item.category || 'Otros',
      image: image,
      pictures: [{ url: image }],
      description: item.description || item.title || 'Sin descripción',
      rating: item.rating || 4.5,
      reviewsCount: Math.floor(Math.random() * 300) + 10,
      freeShipping: Math.random() > 0.5,
      source: 'platzi',
      condition: 'new'
    };
  });
}

/**
 * Buscar productos por término
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} Array de productos filtrados
 */
export const searchProducts = async (query) => {
  try {
    if (!query) return await getAllProducts();
    
    console.log(`🔍 Buscando: "${query}"`);
    
    const allProducts = await getAllProducts();
    const queryLower = query.toLowerCase();
    
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(queryLower) ||
      product.category.toLowerCase().includes(queryLower) ||
      product.description.toLowerCase().includes(queryLower)
    );
  } catch (error) {
    console.error('❌ Error en búsqueda:', error);
    return [];
  }
};

/**
 * Obtener detalles de un producto por ID
 * @param {string} productId - ID del producto
 * @returns {Promise<Object|null>} Detalles del producto
 */
export const getProductDetails = async (productId) => {
  try {
    // Extraer ID real si tiene prefijo
    const realId = productId.startsWith('platzi-') 
      ? productId.substring(7) 
      : productId;
    
    console.log(`📋 Obteniendo detalles del producto ${realId}...`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${PLATZI_API_BASE}/products/${realId}`, {
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
      mode: 'cors'
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Detalles del producto cargados`);
    
    const image = data.images?.[0] || data.image || 'https://via.placeholder.com/300x300?text=Producto';

    return {
      id: `platzi-${data.id}`,
      name: data.title || data.name,
      price: (data.price || 100) * 4000,
      originalPrice: (data.price || 100) * 4000 * 1.2,
      image: image,
      pictures: data.images || [{ url: image }],
      description: data.description || data.title,
      category: data.category?.name || data.category,
      rating: data.rating || 4.5,
      reviewsCount: Math.floor(Math.random() * 300) + 10,
      freeShipping: true,
      source: 'platzi',
      available: Math.floor(Math.random() * 50) + 5,
      condition: 'new',
    };
  } catch (error) {
    console.error('❌ Error obteniendo detalles:', error);
    return null;
  }
};

/**
 * Obtener productos por categoría
 * @param {string} category - Categoría
 * @returns {Promise<Array>} Array de productos
 */
export const getProductsByCategory = async (category) => {
  try {
    console.log(`📂 Cargando categoría: ${category}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${PLATZI_API_BASE}/categories/${category}/products`, {
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
      mode: 'cors'
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ ${data?.length || 0} productos en categoría`);
    
    return transformPlatziProducts(data);
  } catch (error) {
    console.error('❌ Error en categoría:', error);
    return [];
  }
};

/**
 * Obtener todas las categorías disponibles
 * @returns {Promise<Array>} Array de categorías
 */
export const getCategories = async () => {
  try {
    console.log('📂 Obteniendo categorías...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${PLATZI_API_BASE}/categories`, {
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
      mode: 'cors'
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ ${data?.length || 0} categorías obtenidas`);
    
    return data;
  } catch (error) {
    console.error('❌ Error obteniendo categorías:', error);
    return [];
  }
};
