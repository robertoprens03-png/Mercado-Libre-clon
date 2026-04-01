// api/fakestore.js - Proxy para Platzi API en Vercel
// Redirige llamadas a la API de Platzi con CORS habilitado

export default async function handler(req, res) {
  // Configurar CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Manejar preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[Vercel Proxy] 📡 Llamando a Platzi API desde backend...');
    
    // Usar timeout de 25 segundos (límite de Vercel es 30)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    
    const response = await fetch('https://api.escuelajs.co/api/v1/products?limit=20', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Proxy/1.0',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[Vercel Proxy] ❌ Platzi error: ${response.status}`);
      return res.status(response.status).json({ 
        error: 'Platzi API error',
        status: response.status 
      });
    }

    const data = await response.json();
    console.log(`[Vercel Proxy] ✅ Éxito: ${data?.length || 0} productos`);
    
    // Cache por 1 hora (3600 segundos)
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('[Vercel Proxy] ❌ Error:', error.message);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
