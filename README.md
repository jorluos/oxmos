# Ecommerce Oxmos

## Estado actual

El proyecto cuenta con un backend Laravel completo (migraciones, modelos, controladores, servicios, requests) y un frontend React + TypeScript + Vite con Tailwind CSS. Ya se realizó la integración entre frontend y backend para el módulo de productos, incluyendo endpoint público para catálogo y endpoints protegidos para administración.

---

## Tabla de Contenidos

1. [Objetivo del proyecto](#objetivo-del-proyecto)
2. [Arquitectura](#arquitectura)
3. [Base de datos](#base-de-datos)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [Autenticación](#autenticación)
7. [Guía de instalación y despliegue](#guía-de-instalación-y-despliegue)
8. [Bitácora de cambios](#bitácora-de-cambios)

---

## Objetivo del proyecto

Convertir este prototipo en una plataforma ecommerce completa para ropa, con frontend, backend, base de datos, autenticación, panel de administración y flujo real de compra.

---

## Arquitectura

### Frontend
- React + TypeScript + Vite
- Tailwind CSS para la interfaz
- Lucide React para iconos
- Consumo de API REST mediante Axios con Sanctum (SPA)

### Backend
- Laravel 11 (API REST monolítica modular)
- Autenticación con Laravel Sanctum (SPA + tokens)
- Eloquent ORM con migraciones y modelos
- Validación de datos con Form Requests
- Servicios (ProductService) para lógica de negocio

### Estructura del proyecto
```
oxmos-Project/
├── backend/                  # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/  # Controladores
│   │   │   └── Requests/     # Form Requests (validación)
│   │   ├── Models/           # Modelos Eloquent
│   │   └── Services/         # Lógica de negocio
│   ├── database/
│   │   └── migrations/       # Migraciones de BD
│   └── routes/
│       └── api.php           # Rutas de la API
├── src/                      # Frontend React
│   └── app/
│       ├── components/       # Componentes UI
│       │   └── admin/        # Componentes del panel admin
│       ├── context/          # AppContext (estado global)
│       ├── data/             # Helpers y constantes
│       └── types/            # Tipos TypeScript
└── package.json
```

---

## Base de datos

### Tablas de negocio

| Tabla | Descripción |
|---|---|
| `roles` | Roles de usuario (admin, customer) |
| `users` | Usuarios del sistema |
| `addresses` | Direcciones de envío/facturación |
| `categories` | Categorías de productos (con jerarquía parent_id) |
| `collections` | Colecciones comerciales (Nuevo, Tendencia, Oferta) |
| `collection_product` | Pivote many-to-many productos ↔ colecciones |
| `products` | Productos del catálogo |
| `product_variants` | Variantes (talla + color + stock + precio) |
| `product_images` | Imágenes de productos y variantes |
| `carts` | Carritos de compra activos |
| `cart_items` | Items dentro del carrito |
| `orders` | Pedidos realizados |
| `order_items` | Detalle de cada pedido |
| `payments` | Pagos asociados a pedidos |
| `wishlists` | Listas de deseos |
| `wishlist_items` | Items en lista de deseos |
| `reviews` | Reseñas de productos |
| `inventory_logs` | Historial de movimientos de inventario |

### Tablas internas de Laravel/Sanctum
`personal_access_tokens`, `sessions`, `password_reset_tokens`, `cache`, `cache_locks`, `jobs`, `job_batches`, `failed_jobs`

### Modelos Eloquent creados
Todos en `backend/app/Models/`: `Product`, `ProductVariant`, `ProductImage`, `Category`, `Collection`, `Cart`, `CartItem`, `Order`, `OrderItem`, `Payment`, `Wishlist`, `WishlistItem`, `Review`, `Address`, `Role`, `User`, `InventoryLog`

### Relaciones principales
- `Product` → `Category` (belongsTo), `ProductVariant` (hasMany), `ProductImage` (hasMany), `Collection` (belongsToMany), `Review` (hasMany), `OrderItem` (hasMany)
- `ProductVariant` → `Product` (belongsTo), `ProductImage` (hasMany), `CartItem` (hasMany), `OrderItem` (hasMany), `InventoryLog` (hasMany)
- `ProductImage` → `Product` (belongsTo), `ProductVariant` (belongsTo, nullable)
- `Order` → `OrderItem` (hasMany), `Payment` (hasMany), `User` (belongsTo), `Address` (belongsTo)
- `Cart` → `CartItem` (hasMany), `User` (belongsTo)

### Constraints e índices
- Unique en: `users.email`, `users.document_number`, `categories.slug`, `collections.slug`, `products.slug`, `product_variants.sku`, `orders.order_number`
- Unique compuesto en: `collection_product(collection_id, product_id)`, `wishlist_items(wishlist_id, product_id)`, `cart_items(cart_id, product_variant_id)`
- Índices explícitos en: `products.category_id`, `products.is_active`, `orders.user_id`, `orders.status`, `inventory_logs.product_variant_id`

---

## Backend

### Endpoints API

#### Públicos (sin autenticación)
| Método | Ruta | Controlador | Descripción |
|---|---|---|---|
| GET | `/api/products` | `ProductController@listForCatalog` | Lista productos activos para catálogo/landing |

#### Protegidos (auth:sanctum)
| Método | Ruta | Controlador | Descripción |
|---|---|---|---|
| GET | `/api/user` | Closure | Obtener usuario autenticado |
| GET | `/api/cart` | `CartController@index` | Obtener carrito actual |
| POST | `/api/cart/items` | `CartController@addItem` | Agregar item al carrito |
| DELETE | `/api/cart/items/{item}` | `CartController@removeItem` | Eliminar item del carrito |
| PUT | `/api/cart/items/{item}` | `CartController@updateQuantity` | Actualizar cantidad |
| DELETE | `/api/cart` | `CartController@clear` | Vaciar carrito |
| GET | `/api/wishlist` | `WishlistController@index` | Obtener lista de deseos |
| POST | `/api/wishlist` | `WishlistController@store` | Agregar a wishlist |
| DELETE | `/api/wishlist/{product}` | `WishlistController@destroy` | Quitar de wishlist |
| POST | `/api/orders` | `OrderController@store` | Crear pedido |
| **GET** | **`/api/admin/products`** | **`ProductController@index`** | **Listar todos los productos (admin)** |
| **GET** | **`/api/admin/products/{product}`** | **`ProductController@show`** | **Detalle de producto (admin)** |
| **POST** | **`/api/admin/products`** | **`ProductController@store`** | **Crear producto** |
| **PUT** | **`/api/admin/products/{product}`** | **`ProductController@update`** | **Actualizar producto** |
| **DELETE** | **`/api/admin/products/{product}`** | **`ProductController@destroy`** | **Eliminar producto** |
| PUT | `/api/admin/orders/{order}/status` | `OrderController@updateStatus` | Actualizar estado de pedido |
| DELETE | `/api/admin/orders/{order}` | `OrderController@destroy` | Eliminar pedido |

### Controlador de Productos (`ProductController`)
- **`index()`** — Lista paginada (20) con relaciones: category, collections, variants, images. Protegido con `auth:sanctum`.
- **`listForCatalog()`** — Lista paginada (50) solo productos activos y publicados. **Público** (sin autenticación). Filtra por `is_active = true` y `published_at <= now()`.
- **`show()`** — Detalle completo con variants, images, category, collections, reviews. Protegido.
- **`store()`** — Crea producto con variantes e imágenes en transacción. Asigna categoría por defecto si no se especifica. Genera slug único automáticamente.
- **`update()`** — Actualiza producto y sincroniza variantes/imágenes. Regenera slug si cambia el nombre.
- **`destroy()`** — Elimina producto, sus variantes e imágenes (cascade).

### Servicio de Productos (`ProductService`)
Ubicado en `backend/app/Services/ProductService.php`. Encapsula la lógica de:
- `createProduct()` — Crea producto y opcionalmente variantes e imágenes
- `updateProduct()` — Actualiza producto y sincroniza relaciones
- `deleteProduct()` — Elimina producto con sus relaciones
- `createVariants()` / `syncVariants()` — Gestión de variantes
- `createImages()` / `syncImages()` — Gestión de imágenes
- `generateSku()` — Genera SKU único automáticamente

### Requests de validación
- `ProductStoreRequest` — Validación completa para crear: nombre requerido, precio base requerido, género requerido (Mujer/Hombre/Unisex), variantes con size, color_name, color_hex requeridos, imágenes como URLs.
- `ProductUpdateRequest` — Mismos campos pero opcionales (`sometimes`). Incluye validación de `variants.*.sku`.

---

## Frontend

### Estado global (`AppContext`)
Maneja el estado con `useReducer` pattern via `useState` + `useCallback`. Los productos se cargan desde el endpoint público `/api/products` al iniciar la aplicación, sin requerir autenticación. El carrito, wishlist y datos de usuario solo se cargan si hay sesión activa.

### Helpers de productos (`productHelpers.ts`)
Funciones auxiliares compartidas que traducen la estructura del backend a lo que necesita la UI:
- `getProductPrimaryImage()` — Obtiene imagen principal
- `getProductImages()` — Lista todas las URLs ordenadas por posición
- `getProductColors()` — Colores únicos desde variantes
- `getProductSizes()` — Tallas únicas desde variantes
- `getProductStockBySize()` — Stock agregado por talla
- `getProductDiscount()` — Porcentaje de descuento
- `getProductCategoryLabel()` — Etiqueta de colección (Nuevo/Tendencia/Oferta)
- `getMinVariantPrice()` — Precio mínimo entre variantes

### Componentes principales

| Componente | Descripción |
|---|---|
| `LandingPage` | Hero slider, productos destacados (`is_featured`), colecciones, nuevos ingresos |
| `Catalog` | Catálogo con filtros (género, tipo, color, talla, colección), ordenamiento y carga progresiva |
| `ProductCard` | Tarjeta de producto con imagen, badges, colores, precio y quick add |
| `ProductDetail` | Detalle con galería de imágenes, selector de talla/color, cantidad, add to cart |
| `Cart` | Drawer lateral con items del carrito |
| `AdminPanel` | Panel de administración con dashboard, gestión de productos y pedidos |
| `AdminProducts` | Tabla de productos con búsqueda y modal de creación/edición |
| `AdminDashboard` | Tarjetas de estadísticas, pedidos recientes y top productos |

### Tipos TypeScript (`types/index.ts`)
Alineados con el backend. Los principales son:
- `Product` — `id`, `category_id`, `name`, `slug`, `gender`, `base_price`, `original_price`, `is_featured`, `is_active`, `images[]`, `variants[]`, `collections[]`, `category`, `raiting_average`, `reviews_count`
- `ProductVariant` — `sku`, `size`, `color_name`, `color_hex`, `price`, `stock`, `is_active`
- `ProductImage` — `image_url`, `alt_text`, `position`, `is_primary`, `product_variant_id?`
- `CartItem`, `Order`, `OrderItem`, `Review`, `Address`, etc.

---

## Autenticación

Se utiliza Laravel Sanctum para autenticación SPA.

### Flujo
1. El frontend solicita cookie CSRF: `GET /sanctum/csrf-cookie`
2. Envía credenciales: `POST /api/login` o `/api/register`
3. Obtiene usuario autenticado: `GET /api/user`
4. Sanctum maneja sesiones via cookies (con `withCredentials: true` en Axios)

### Configuración clave
```env
SESSION_DOMAIN=
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:8000,...
```

### Axios (`src/axios.ts`)
```ts
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
```

---

## Guía de instalación y despliegue

### Requisitos
- Node.js 18+
- PHP 8.2+
- Composer
- MySQL/MariaDB

### Instalación local

```bash
# Clonar repositorio
git clone <repo-url>
cd oxmos-Project

# Instalar dependencias del frontend
npm install

# Instalar dependencias del backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

# Iniciar servidores
php artisan serve  # Backend en localhost:8000
npm run dev        # Frontend en localhost:5173
```

### Build de producción

```bash
npm run build
```

### Despliegue
- Frontend: compilar con `npm run build` y subir `dist/` al hosting
- Backend: subir `backend/` al hosting, configurar `.env`, ajustar permisos en `storage/` y `bootstrap/cache`
- Configurar CORS para el dominio de producción
- Configurar Sanctum para el dominio del frontend

---

## Bitácora de cambios

### Integración Backend-Frontend de Productos

#### Backend
- ✅ Creadas migraciones de productos, variantes, imágenes, categorías y colecciones
- ✅ Creados modelos Eloquent con relaciones y casts
- ✅ Creado `ProductController` con CRUD completo
- ✅ Creado `ProductService` con lógica de creación/actualización/eliminación
- ✅ Creados `ProductStoreRequest` y `ProductUpdateRequest` con validaciones
- ✅ Agregada ruta `GET /admin/products/{product}` para `show()` (faltaba)
- ✅ `product_variant_id` en `product_images` cambiado a nullable
- ✅ Agregado `collections` al eager loading de `index()`
- ✅ Creado endpoint público `GET /api/products` (`listForCatalog()`) para catálogo sin autenticación
- ✅ `auth:sanctum` excluido del endpoint público con `->except(['listForCatalog'])`
- ✅ Endpoint público filtra solo productos activos y publicados

#### Frontend
- ✅ Agregado `productHelpers.ts` con funciones para traducir estructura backend → UI
- ✅ `AppContext` corregido para parsear respuestas del backend (`data.data`)
- ✅ `AppContext.fetchProducts()` ahora usa endpoint público y se ejecuta siempre (sin auth)
- ✅ `ProductCard.tsx` adaptado a `Product` real (images[], variants[], base_price, etc.)
- ✅ `ProductDetail.tsx` adaptado a `Product` real con galería de imágenes, tallas desde variantes
- ✅ `Catalog.tsx` adaptado: filtros dinámicos por colecciones, tipos reales
- ✅ `LandingPage.tsx` adaptado: featured usa `is_featured`, precios desde helpers
- ✅ `AdminPanel.tsx` corregido: envía JSON en vez de FormData con JSON.stringify
- ✅ `AppContext` corregido: `fetchProducts()` siempre se ejecuta al cargar la app
- ⏳ Pendiente: `Cart.tsx` y `Checkout.tsx` aún usan formato mock (requieren reescritura completa del flujo carrito/checkout)

#### Problemas detectados y solucionados
| Problema | Solución |
|---|---|
| Productos no se cargaban para visitantes | Endpoint público separado + fetchProducts() fuera del bloque auth |
| ProductService en ubicación incorrecta | Movido a `app/Services/ProductService.php` |
| Faltaba ruta show() | Agregada en routes/api.php |
| product_variant_id NOT NULL sin asignarse | Cambiado a nullable en migración |
| Archivo ProductUpdateRequest en minúscula | Renombrado a PascalCase |
| Faltaba variants.*.sku en UpdateRequest | Agregado |
| Frontend esperaba data.product en vez de data.data | Corregido en AppContext |
| AdminPanel enviaba JSON string en FormData | Cambiado a envío JSON directo |

---

## Notas técnicas importantes

### CORS
Al subir a producción, configurar CORS en `backend/config/cors.php` y `SANCTUM_STATEFUL_DOMAINS` en `.env`.

### SESSION_DOMAIN
```env
SESSION_DOMAIN=
```
Esto permite que Laravel use el dominio actual correctamente en local.

### AXIOS en producción
Cambiar `axios.defaults.baseURL` en `src/axios.ts` a la URL del backend en producción.

### Imágenes
Actualmente las imágenes se manejan como URLs externas. Para producción se recomienda implementar subida de archivos con Storage de Laravel.

### Paginación
El endpoint público usa `paginate(50)` y el admin `paginate(20)`. Si se necesitan más productos, implementar carga de páginas adicionales desde el frontend.