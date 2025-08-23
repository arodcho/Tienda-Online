<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f0f2f5;
            color: #333;
        }
        header {
            background: #4285F4;
            color: white;
            padding: 20px 0;
            text-align: center;
        }
        main {
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1, h2 {
            margin-top: 0;
        }
        .card {
            background: #f9f9f9;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .card code {
            background: #e1e1e1;
            padding: 2px 6px;
            border-radius: 4px;
        }
        ul {
            list-style: none;
            padding-left: 0;
        }
        li {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <header>
        <h1>LARAVEL API - Dashboard</h1>
    </header>
    <main>
        <h2>Endpoints disponibles</h2>

        <div class="card">
            <h3>Productos</h3>
            <ul>
                <li><code>/products</code> – Listar todos los productos</li>
                <li><code>/products/{id}</code> – Ver detalles de un producto</li>
            </ul>
        </div>

        <div class="card">
            <h3>Carrito</h3>
            <ul>
                <li><code>/cart</code> – Ver carrito</li>
                <li><code>/cartadd</code> – Añadir producto al carrito</li>
                <li><code>/cartdelet/{id}</code> – Eliminar producto del carrito</li>
            </ul>
        </div>

        <div class="card">
            <h3>Pedidos</h3>
            <ul>
                <li><code>/checkout</code> – Confirmar compra</li>
                <li><code>/orders</code> – Ver historial de compras</li>
            </ul>
        </div>

        <p>Nota: Esta vista es solo informativa. Toda la funcionalidad se realiza vía API.</p>
    </main>
</body>
</html>
