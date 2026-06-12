## Base de Datos
- roles
- users
- addresses
- categories
- collections
- collection_product
- products
- product_variants
- product_images
- carts
- cart_items
- orders
- order_items
- payments
- wishlists
- wishlist_items

Algunas tablas se separan entre tabla general y tabla de filas, esto se hace con la finalidad de tener un mejor manejo, mas control y una estructura mucho mas limpia para crecer sin desorden.

## Proceso
La tabla general guarda la informacion global, por ejemplo el carrito, pedido o wishtlist como entidad principal, mientras que la tabla de filas guarda cada producto agregado dentro de esa entidad. Eso evita duplicar datos y permite que un mismo pedido o carrito tenga muchas lineas de detalle sin romper el diseño.


### orders / order_items
orders guarda la informacion general del pedido, y order_items guarda cada producto comprado dentro de ese pedido
#### Ejemplo:
Un cliente hace una compra de:

    - Camiseta negra talla M, cantidad 3.
    - Jean azul talla 32, cantidad 1.
Entonces quedaria asi:

    orders
      * id: 501
      * user_id:
      * order_numer: 0X-2026-000501
      * customer_name: Juan Perez
      * customer_mail: juan@email.com
      * total: 210000
      * status: pending
    order_items
      * fila 1:
        * order_id: 501 
        * product_variant_id: 33
        * product_name_snapshot: Camiseta Negra
        * quantity: 3
        * unit_price: 60000
        * subtotal: 180000
      * fila 2:
        * order_id: 501 
        * product_variant_id: 33
        * product_name_snapshot: Camiseta Negra
        * quantity: 3
        * unit_price: 60000
        * subtotal: 180000 

Seria exactamente el mismo proceso para las demas tablas como 
- wishlists
- wishlist_items
- cart
- cart_items

En el caso de orders se pude ver como si orders fuera la factura y order_items los renglones de la factura.
Para las tablas cart y cart_items, cart es el carrito del supermercado y car_items son los productos dentro del carrito. wishlist se puede ver como la lista de me gusta y wishlist_items es cada producto guardado en la lista.