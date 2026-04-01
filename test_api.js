// Script para probar la API de FakeStore
const testAPI = async () => {
  console.log('🔍 Probando FakeStore API...\n');
  
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    console.log('✅ Respuesta recibida:', response.status, response.statusText);
    
    if (!response.ok) {
      console.error('❌ Error HTTP:', response.status);
      return;
    }
    
    const data = await response.json();
    console.log('✅ JSON parseado exitosamente');
    console.log('📦 Cantidad de productos:', data.length);
    console.log('📋 Primer producto:', data[0]);
    
    if (data.length > 0) {
      console.log('\n✅ LA API FUNCIONA CORRECTAMENTE');
      console.log(`Recibidos ${data.length} productos`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testAPI();
