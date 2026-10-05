# 🚀 Desplegar en Railway

## Paso 1: Crear un proyecto en Railway

1. Ir a **[railway.app](https://railway.app)** e iniciar sesión (o crear cuenta)
2. Haz clic en **"New Project"** → **"Deploy from GitHub"**
3. Selecciona el repositorio: **`Posta_st`**
4. Railway detectará automáticamente `Procfile` y el `package.json`

---

## Paso 2: Configurar variables de entorno

Railway detectará automáticamente que el puerto viene de `process.env.PORT`. No necesitas configurar nada adicional.

Si en el futuro necesitas agregar variables (como credenciales de Supabase, Mercado Pago, etc.), irás a:
- **Variables** en el panel de Railway
- Agregar `KEY=value`

---

## Paso 3: Desplegar

1. Después de conectar el repositorio, haz clic en **"Deploy"**
2. Railway ejecutará:
   - `npm install` (si hubiera dependencias)
   - El comando en `Procfile`: `node server.js`
3. Tu app estará disponible en una URL como: `https://posta-st-production.up.railway.app`

---

## Paso 4: Usar tu app en producción

- **Home:** `https://tu-proyecto-railway.app/`
- **Checkout:** `https://tu-proyecto-railway.app/checkout.html`
- **Admin:** `https://tu-proyecto-railway.app/admin.html`

Los pedidos se guardarán en `data/orders.json` en el servidor de Railway.

---

## ⚠️ Limitaciones actuales

1. **Datos temporales:** Los pedidos se guardan en archivo JSON. Si Railway reinicia, los datos se pierden.
   - **Solución futura:** Migrar a **Supabase** o **PostgreSQL**.

2. **Mercado Pago:** El link de pago es manual.
   - **Solución futura:** Integrar API real de Mercado Pago.

3. **Admin sin autenticación:** Cualquiera puede ver los pedidos.
   - **Solución futura:** Agregar autenticación con contraseña o Google Login.

---

## 🔗 Variables de entorno futura (Supabase)

Cuando estés listo, agregar en Railway:
```
SUPABASE_URL=https://...
SUPABASE_KEY=eyJ...
SUPABASE_SECRET=...
```

---

## 📱 Prueba local antes de desplegar

```bash
npm start
# Visita http://localhost:3000
```

---

## 🛠️ Troubleshooting

**Si la app no carga:**
- Verifica que `server.js` no tiene errores de sintaxis
- Revisa los **Logs** de Railway en el panel

**Si los pedidos no se guardan:**
- Railway podría no tener permisos de escritura en `data/`
- Solución: usar Supabase o una BD real

**Si cambias el código:**
- Hacer commit y push a GitHub
- Railway se redeploya automáticamente (si tienes **"Auto Deploy"** habilitado)

---

## ✅ Checklist final

- [x] `package.json` con `"start": "node server.js"`
- [x] `Procfile` con `web: node server.js`
- [x] `server.js` con endpoints `/api/orders`
- [x] `public/app.js` detecta producción automáticamente
- [x] `.gitignore` configurado
- [x] Repositorio en GitHub sincronizado
- [x] Ready to deploy! 🎉
