# Posta — sitio del menú

Esta carpeta contiene los archivos editables de la página y sus imágenes. No requiere paquetes npm externos.

## Abrir en tu computadora

1. Instala Node.js.
2. Abre una terminal dentro de `posta-pagina/`.
3. Ejecuta `npm start` y visita `http://localhost:3000`.

Para generar el sitio estático listo para subir a un hosting, ejecuta `npm run build`. El resultado queda en `dist/`.

## Editar la página

- **Carta, nombres y precios:** `public/menu-data.js`.
- **Colores:** `public/styles.css`; las variables `--red` y `--cream` están al comienzo del archivo (`#B6231B` y `#FFF9EF`).
- **Espacio del logotipo y estructura:** `public/index.html`.
- **Fotos e ilustración de fondo:** `public/assets/`.
- **Comportamiento visual:** `public/app.js`.

El carrito, la cuenta y los pedidos son demostraciones. No hay inicio de sesión, pagos, persistencia ni conexión real a Mercado Pago/efectivo en este paquete. El precio de Oreo está indicado como «Consultar» porque no se alcanza a leer en la foto del menú.
