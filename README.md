# Mercado Campesino Digital de Yopal

Prototipo Frontend-Only para la gestión de ofertas y reservas del mercado campesino de Yopal.
Desarrollado con HTML, CSS, JavaScript (Vanilla) y LocalStorage.

## Estructura
- `/src/index.html`: Menú principal para acceder a los roles.
- `/src/views/`: Pantallas de Productor, Cliente y Secretaría.
- `/src/js/`: Controladores lógicos y simulación de base de datos.
- `/src/css/`: Estilos de alto contraste y adaptabilidad móvil.

## Uso
1. Extrae este archivo ZIP.
2. Abre el archivo `src/index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).
3. Navega entre los roles para probar la publicación de ofertas, reservas de clientes y el panel de reportes.
4. Los datos persistirán localmente en tu navegador usando `localStorage`. Si deseas reiniciar los datos, borra los datos de navegación o ejecuta `localStorage.removeItem('mercado_db')` en la consola.
