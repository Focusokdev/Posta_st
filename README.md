# Posta — sitio del menú con checkout y admin

Esta carpeta contiene la página del menú con carrito, checkout y panel administrativo para ver pedidos.

## 🚀 Desplegar en Railway

1. Crea una cuenta en [railway.app](https://railway.app).
2. Conecta tu repositorio Git (GitHub).
3. Railway detectará automáticamente `Procfile` y ejecutará `node server.js`.
4. Tu app estará disponible en `https://tu-proyecto.railway.app`.

No requiere configuración adicional. Los pedidos se guardan en `data/orders.json`.

---

## 📱 Usar localmente

1. **Instala Node.js** (versión 18+).
2. **Abre una terminal** dentro de este directorio.
3. **Ejecuta:**
   ```bash
   npm start
   ```
4. **Visita:** `http://localhost:3000`

---

## ✏️ Editar la página

| Archivo | Para cambiar |
|---------|--------------|
| `public/menu-data.js` | Carta, nombres y precios |
| `public/styles.css` | Colores, diseño (variables `--red` y `--cream`) |
| `public/index.html` | Estructura, logo, secciones |
| `public/assets/` | Fotos e ilustraciones |
| `public/app.js` | Lógica del carrito, checkout, admin |
| `server.js` | Backend, endpoints API |

---

## 📋 Funcionalidades

✅ **Menú con carrito:** Agregar productos, ver total.  
✅ **Checkout:** Formulario para nombre, teléfono, dirección, notas.  
✅ **Métodos de pago:** Mercado Pago o Efectivo.  
✅ **Panel administrativo:** Ver todos los pedidos en tiempo real.  
✅ **Persistencia:** Los pedidos se guardan en `data/orders.json`.  

---

## 🔄 Rutas disponibles

| Ruta | Descripción |
|------|-------------|
| `GET /` | Home con menú y carrito |
| `GET /checkout.html` | Página de checkout |
| `GET /admin.html` | Panel de administración |
| `GET /api/orders` | Obtener lista de pedidos |
| `POST /api/orders` | Guardar un nuevo pedido |

---

## 📝 Estructura de un pedido

```json
{
  "id": "POSTA-1791151373907",
  "name": "Juan",
  "phone": "123456789",
  "orderType": "delivery",
  "address": "Calle 1, Barrio",
  "notes": "Sin cebolla",
  "paymentMethod": "efectivo",
  "paymentLink": "",
  "items": [
    {
      "id": "cafe-1",
      "name": "Café",
      "quantity": 2,
      "price": 100,
      "subtotal": 200
    }
  ],
  "total": 200,
  "status": "pendiente",
  "createdAt": "2026-10-05T12:34:56.789Z"
}
```

---

## 🛠️ Próximos pasos

- Conectar a Supabase o una base de datos real.
- Integrar Mercado Pago API.
- Agregar autenticación para el admin.
- Mejorar filtros y búsqueda de pedidos.
