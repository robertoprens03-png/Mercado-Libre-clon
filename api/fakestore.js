// api/fakestore.js - Proxy para Platzi API en Vercel
// Este archivo debe estar en la carpeta /api en la raíz del proyecto

export default async function handler(req, res) {
  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Proxy: Llamando a Platzi API...');
    
    const response = await fetch('https://api.escuelajs.co/api/v1/products', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('❌ FakeStore error:', response.status);
      return res.status(response.status).json({ error: 'FakeStore API error' });
    }

    const data = await response.json();
    console.log('✅ Proxy recibió:', data.length, 'productos');
    
    // Cache por 1 hora (3600 segundos)
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('❌ Error en proxy:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
