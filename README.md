# Ecommerce de ropa prototipo

Este prototipo corre con Vite + React + TypeScript + Tailwind.

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


