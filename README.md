# Tienda Online

Proyecto de comercio electrónico desarrollado con Laravel para la Api y React para el frontend. Permite la gestión de listado de productos y cuenta con funcionalidades de carrito de compras e historial de pedidos.

---

## 🔹 Tecnologías

* **Frontend:** React, Tailwind CSS
* **Backend:** Laravel, Node.js
* **Base de datos:** MySQL
* **Autenticación:** JWT
* **Documentación API:** Postman

---

## Instalar dependencias

1. Clonar el repositorio:

```bash
git clone https://github.com/arodcho/Tienda-Online.git
```

2. Instalar dependencias en el backend:

```bash
cd Backend-Laravel
npm install
```

3. Instalar dependencias en el frontend:

```bash
cd Frontend-React
npm install
```

---

##  Configurar `.env`

Configurar las variables de entorno en el backend:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tienda_db
DB_USERNAME=root
DB_PASSWORD=

GOOGLE_CLIENT_ID=<tu_id_google>
GOOGLE_CLIENT_SECRET=<tu_secret_google>
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback

JWT_SECRET=<tu_clave_secreta>
```

---

## Ejecutar migraciones y seeders

Desde la carpeta del backend:

```bash
php artisan migrate
php artisan db:seed
```

---

## Ejecutar la aplicación

### Backend (Laravel + PHP)

```bash
cd Backend-Laravel
php artisan serve
```

Se ejecutará por defecto en `http://127.0.0.1:8000`.

### Frontend (React + Tailwind)

```bash
cd Frontend-React
npm start
```

Se ejecutará en `http://localhost:3000`.

---

## Documentación API

* Todos los endpoints protegidos requieren:

```
Authorization: Bearer <TOKEN>
```

### Endpoints principales

| Método | Endpoint       | Descripción                   |
| ------ | -------------- | ----------------------------- |
| GET    | `/products`      | Listar productos              |
| GET    | `/products/id`   | Obtener producto por id       |
| GET    | `/cart`          | Obtener carrito               |
| GET    | `/cartadd/id`    | Añadir producto al carrito    |
| GET    | `/cartdelet/id`  | Eliminar producto del carrito |
| GET    | `/checkout`      | Confirmar compra              |
| GET    | `/orders`        | Historial de pedidos          |

### Vista previa de la aplicación

#### 🔹 Login
<img width="1949" height="948" alt="image" src="https://github.com/user-attachments/assets/57818024-2008-4f03-8ae2-ff492096c254" />

#### 🔹 Home
<img width="1904" height="792" alt="image" src="https://github.com/user-attachments/assets/36528b39-2505-4ca1-a5ce-25771e36c242" />

#### 🔹 Productos
<img width="1901" height="946" alt="image" src="https://github.com/user-attachments/assets/ebda253c-533d-42bb-9181-0898202bd24c" />

#### 🔹 Carrito
<img width="1919" height="683" alt="image" src="https://github.com/user-attachments/assets/43dde505-db15-4fc6-95a0-6ac286d75d9c" />

#### 🔹 Pedidos
<img width="1903" height="947" alt="image" src="https://github.com/user-attachments/assets/6b2e7c8a-9558-4877-a6e8-3418529d7c0b" />

#### 🔹 Laravel API
<img width="1917" height="947" alt="image" src="https://github.com/user-attachments/assets/4742bea6-7986-4615-ad10-16135c41796c" />


