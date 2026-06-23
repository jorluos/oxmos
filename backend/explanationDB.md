# Base de datos Oxmos

Estado actual: la base de datos ya cuenta con las migraciones principales, modelos Eloquent, relaciones, indices y constraints necesarios para empezar a construir las consultas y endpoints que consumira el frontend.

## Tablas de negocio

- `roles`
- `users`
- `addresses`
- `categories`
- `collections`
- `collection_product`
- `products`
- `product_variants`
- `product_images`
- `carts`
- `cart_items`
- `orders`
- `order_items`
- `payments`
- `wishlists`
- `wishlist_items`
- `reviews`
- `inventory_logs`

## Tablas internas de Laravel

Estas tablas existen, pero las maneja Laravel o Sanctum directamente:

- `sessions`
- `password_reset_tokens`
- `cache`
- `cache_locks`
- `jobs`
- `job_batches`
- `failed_jobs`
- `personal_access_tokens`

No se crearon modelos manuales para esas tablas porque no forman parte directa del dominio del ecommerce.

## Modelos creados

Los modelos Eloquent de negocio estan en `backend/app/Models`:

- `Address`
- `Cart`
- `CartItem`
- `Category`
- `Collection`
- `InventoryLog`
- `Order`
- `OrderItem`
- `Payment`
- `Product`
- `ProductImage`
- `ProductVariant`
- `Review`
- `Role`
- `User`
- `Wishlist`
- `WishlistItem`

## Relaciones principales

- Un `Role` tiene muchos `User`.
- Un `User` pertenece a un `Role`.
- Un `User` tiene muchas `Address`, `Order`, `Wishlist` y `Review`.
- Una `Category` tiene muchos `Product`.
- Una `Category` puede tener categoria padre e hijas por `parent_id`.
- Un `Product` pertenece a una `Category`.
- Un `Product` tiene muchas `ProductVariant`, `ProductImage`, `OrderItem` y `Review`.
- Un `Product` pertenece a muchas `Collection` por la tabla pivote `collection_product`.
- Una `Collection` tiene muchos `Product` por `collection_product`.
- Un `Cart` pertenece a un `User` y tiene muchos `CartItem`.
- Un `CartItem` pertenece a un `Cart`, `Product` y `ProductVariant`.
- Un `Order` pertenece opcionalmente a un `User` y una `Address`.
- Un `Order` tiene muchos `OrderItem`, `Payment` y `Review`.
- Un `OrderItem` pertenece a un `Order`, `Product` y opcionalmente a un `ProductVariant`.
- Un `Payment` pertenece a un `Order`.
- Una `Wishlist` pertenece a un `User` y tiene muchos `WishlistItem`.
- Un `WishlistItem` pertenece a una `Wishlist` y a un `Product`.
- Un `Review` pertenece a un `Product`, `User` y opcionalmente a un `Order`.
- Un `ProductVariant` tiene muchos `CartItem`, `OrderItem`, `ProductImage` e `InventoryLog`.
- Un `InventoryLog` pertenece a un `ProductVariant` y opcionalmente a un `User`.

## Constraints e indices

Ya estan implementados los constraints recomendados:

- `users.email` unico.
- `users.document_number` unico.
- `categories.slug` unico.
- `collections.slug` unico.
- `products.slug` unico.
- `product_variants.sku` unico.
- `orders.order_number` unico.
- Foreign keys en columnas relacionales.
- Unico compuesto en `collection_product(collection_id, product_id)`.
- Unico compuesto en `wishlist_items(wishlist_id, product_id)`.
- Unico compuesto en `cart_items(cart_id, product_variant_id)`.

Tambien estan cubiertos indices para lecturas comunes:

- `products.category_id` por foreign key.
- `products.is_active` como indice explicito.
- `product_variants.product_id` por foreign key.
- `orders.user_id` por foreign key.
- `orders.status` como indice explicito.
- `order_items.order_id` por foreign key.
- `inventory_logs.product_variant_id` por foreign key.

## Separacion entre tablas principales y tablas de detalle

Algunas entidades se separan entre tabla general y tabla de filas para mantener una estructura limpia:

- `carts` / `cart_items`
- `orders` / `order_items`
- `wishlists` / `wishlist_items`

La tabla general guarda la informacion global. La tabla de items guarda cada producto asociado.

Ejemplo: `orders` funciona como la factura y `order_items` como los renglones de esa factura.

Si un cliente compra:

- Camiseta negra talla M, cantidad 3.
- Jean azul talla 32, cantidad 1.

Entonces `orders` guarda el encabezado:

```txt
id: 501
user_id: 10
order_number: OX-2026-000501
customer_name: Juan Perez
customer_email: juan@email.com
status: pending
subtotal: 210000
total: 210000
```

Y `order_items` guarda las lineas:

```txt
order_id: 501
product_variant_id: 33
product_name_snapshot: Camiseta negra
variant_description_snapshot: Black / M
quantity: 3
unit_price: 60000
subtotal: 180000
```

```txt
order_id: 501
product_variant_id: 41
product_name_snapshot: Jean azul
variant_description_snapshot: Blue / 32
quantity: 1
unit_price: 30000
subtotal: 30000
```

## Siguiente paso tecnico

La base ya esta lista para empezar a crear consultas y endpoints. El siguiente trabajo recomendado es construir controladores/API resources para:

- Catalogo publico: categorias, colecciones, productos, variantes e imagenes.
- Autenticacion y perfil: usuario actual, direcciones y datos de cuenta.
- Carrito: crear carrito activo, agregar item, actualizar cantidad, eliminar item.
- Wishlist: guardar y quitar productos.
- Checkout: convertir carrito en orden, congelar snapshots y registrar pago.
- Admin: CRUD de productos, variantes, imagenes, inventario, pedidos y estados.

Las rutas API actuales aun estan en fase inicial: existe `/api/user` protegido por Sanctum, pero faltan los endpoints funcionales para que el frontend consuma catalogo, carrito, wishlist, checkout y administracion.
