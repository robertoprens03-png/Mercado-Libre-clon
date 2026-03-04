/**
 * Formatea un número como moneda COP (Peso Colombiano)
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado (ej: $1.299.999)
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
