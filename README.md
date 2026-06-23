# Ecommerce Oxmos

## Estado actual

La base visual y funcional está pensada como prototipo de referencia. Por ahora no se modifica la experiencia existente; este documento define la ruta para convertirla en una plataforma real.

## Objetivo del proyecto

Convertir este prototipo en una plataforma ecommerce completa para ropa, con frontend, backend, base de datos, autenticación, panel de administración y flujo real de compra.

## Arquitectura objetivo

### Frontend

- React + TypeScript + Vite
- Tailwind CSS para la interfaz
- Componentes reutilizables para catálogo, detalle, carrito, checkout, cuenta y admin
- Consumo de API para productos, usuarios, pedidos y autenticación

### Backend

- API REST como primera opción
- Autenticación con sesiones o JWT
- Servicios para catálogo, usuarios, pedidos, inventario y administración
- Validación de datos en servidor

### Estructura del backend

Arquitectura de Software seleccionada: La idea es trabajar con un backend monolítico modular, organizado por capas.


### Capas por módulo

Cada módulo puede organizarse internamente así:

- `presentation/`: controladores, rutas y validaciones de entrada.
- `application/`: casos de uso y lógica de aplicación.
- `domain/`: entidades, reglas de negocio e invariantes.
- `persistence/`: repositorios, modelos ORM y acceso a base de datos.

### Base de datos

- Rol
- Usuario
- Categoria
- Producto
- Pedido
- PedidoDetalle
- Wishlist
- WishlistDetalle
- Direccion o UsuarioDireccion, si se permiten varias direcciones por usuario

### Infraestructura

- Almacenamiento de imágenes
- Variables de entorno para credenciales y servicios externos
- Registro de errores y auditoría básica
- Despliegue separado para frontend y backend

### Instalar y desplegar Laravel (guía rápida)

Se mantiene el frontend en `src/` y se crea el backend en `backend/`.

1) Se creó el proyecto Laravel (local)

```bash
cd d:\\MH-Software-House\\oxmos-Project
composer create-project laravel/laravel backend
cd backend
php artisan serve
```

2) Configuración inicial en `backend/.env`
- `APP_URL` → URL local o URL de producción (ej. `https://api.tudominio.com`).
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` → datos de la base de datos creada en el hosting.
- Ejecutar `php artisan key:generate`.

3) Habilitar CORS para que React consuma la API: editar `backend/config/cors.php` o añadir el origen del frontend en `paths` / `allowed_origins`.

4) Migraciones y seeders

```bash
php artisan migrate --seed
```

5) Build del frontend y despliegue (shared hosting)

- En el equipo de desarrollo hay que compilar el frontend:

```bash
cd d:\\MH-Software-House\\oxmos-Project
npm run build
```

- Subir el contenido de `dist/` (o `build/` según tu configuración de Vite) al `public_html` del dominio principal.

6) Despliegue de Laravel en hosting compartido

- Subir la carpeta `backend` al hosting (por ejemplo en `your_account/oxmos-backend/`).
- Apuntar el subdominio `api.tudominio.com` a la carpeta `oxmos-backend/public` como document root (Panel de control → Dominios/subdominios).
- Configurar `.env` en el hosting con las credenciales de producción.
- Ajustar permisos: `storage/` y `bootstrap/cache` deben ser escribibles.
- Ejecutar migraciones desde consola del hosting o mediante un script: `php artisan migrate`.

7) Post-despliegue

- En `backend/.env` en producción: `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL` correcto.
- Configurar backups y copias de la base de datos desde el panel del hosting (Hostinger ofrece backups diarios en tu plan).
- Forzar HTTPS y configurar el certificado (Hostinger ofrece SSL gratuito y CDN si se activa).

Notas y precauciones:
- En hosting compartido no es recomendable depender de procesos largos (workers, queues). Si se necesitan colas, considerar servicios externos (Redis/Beanstalk) o soluciones gestionadas.
- Mantener separadas las fuentes: no mezclar la app React `src/` con la app Laravel `backend/`.
- Para llamadas desde el frontend, usar la URL completa del API (ej. `https://api.tudominio.com/api/products`).


## Orden de implementación

### Fase 1: definición funcional

- Cerrar el modelo de datos
- Definir roles y permisos
- Definir flujo de compra y estados de pedido
- Definir reglas de inventario y tallas

### Fase 2: backend base

- Crear la API
- Conectar la base de datos
- Implementar autenticación y autorización
- Construir CRUD de productos, usuarios y pedidos

### Fase 3: integración del frontend

- Reemplazar datos simulados por llamadas a API
- Conectar login, registro, catálogo, carrito y checkout
- Persistir pedido real
- Conectar panel administrativo

### Fase 4: endurecimiento de producto

- Validaciones completas
- Manejo de errores
- Subida y gestión de imágenes
- Pruebas básicas
- Preparación para despliegue

### Fase 5: salida a producción

- Monitoreo
- Backups
- Seguridad básica
- Ajustes finales de experiencia de usuario

## Revisión y cambios del frontend

Este apartado servirá como bitácora del prototipo. La idea es documentar qué cambia en la interfaz antes de implementar el backend, para no perder el diseño base.

### Lo que ya existe

- Landing page con hero, destacados y secciones editoriales
- Catálogo con filtros, ordenamiento y paginación
- Detalle de producto con tallas, colores y carrito
- Carrito lateral
- Checkout en dos pasos
- Wishlist
- Panel de administrador de demo

### Cambios pendientes de frontend

- Sustituir estado local por consumo de API
- Hacer persistentes usuario, carrito y pedidos
- Conectar imágenes y stock desde backend
- Reemplazar login de demo por autenticación real
- Reemplazar el panel de administrador simulado por uno conectado a datos reales
- Agregar estados de carga, error y vacíos

### Reglas para cambiar el frontend

- No romper el diseño base mientras se migra a producción
- Mantener componentes reutilizables
- Priorizar cambios funcionales antes que cambios visuales
- Registrar en esta sección cualquier cambio relevante de UX o navegación

### Bitácora de revisiones

- Pendiente: definición de roles y permisos
- Pendiente: modelo final de pedidos y detalle de pedido
- Pendiente: estrategia de autenticación
- Pendiente: estrategia de persistencia del carrito
- Pendiente: lineamientos finales del panel admin


## Requisitos

- Node.js 18 o superior
- `npm`

## Instalar dependencias


```bash
npm install
```

Esto instala todo lo necesario para correr la app: React, React DOM, Vite, Tailwind y Lucide.

## Correr la app

```bash
npm run dev
```

## Build de produccion


```bash
npm run build
```

## Nota

No hace falta instalar dependencias manualmente una por una; todo sale de `package.json`.



## Autenticación
Para la autenticación se utiliza un paquete oficial de Laravel conocido como Laravel Sanctum, el cual sirve para manejar la autenticación de usuarios en aplicaciones modernas, especialmente cuando se tien un frontend separado como en el caso de este proyecto.

- El paquete Sanctum utiliza Tokens personales los cuales permite que cada usuario genere tokens para acceder a la API, útilies en apps móviles o clientes externos.
- Utiliza Autenticación de SPA (Single Page Applications), lo cual funciona muy bien con frontends como React, porque gestiona sesiones seguras usando cookies y CSRF protection.
- Ligero y simple: Es más fácil de configurar que Laravel Passport (que usa OAuth2)

El flujo correcto es:

```
await axios.get('/sanctum/csrf-cookie')
await axios.post('/register', data)
await axios.get('api/user')
```
Primero se pide /sanctum/csrf-cookie para que laravel entregue la cookie CSRF. Luego se hace el POST/register. Después se consulta /api/user para obtener el usuario autenticado.


## Nota
```
SESSION_DOMAIN=
```
Eso permite que Laravel use el dominio actual correctamente en local.

Los deminios permitidos por Sanctum están en esta parte
```
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:8000,127.0.0.1:5173,127.0.0.1:8000,localhost,127.0.0.1
```
Esto le dice a sanctum: "estas URLs pertenecen al frontend confiable". Sin eso, Laravel puede tratar la petición como externa y no asociarla bien con la sesión.

Cambiar los CORS al momento de subir a producción. 

### AXIOS
Ya está configurado correctamente, al momento de subir a producción se debe cambiar .baseURL

```
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
```
Esta configuración de AXIOS es clave porque permite enviar cookies y el token CSRF en las peticiones.

## Nota
El header ahora puede saber si hay sesión. 
Después del registro, el frontend consulta:
```
const { data } = await axios.get('/api/user')
```

Ese usuario se guarda en currentUser, entonces el header cambia de "ingresar" a mostrar el usuario logueado, además en el contexto se agrega una consulta inicial a /api/user para que si se refresca la página y la cookie sigue viva, el frontend vuelva a cargar el usuario automáticamente.