# Desafío Soft Jobs

Desafío correspondiente al módulo de **Autenticación y Autorización de usuarios con JWT**.

La aplicación permite registrar usuarios, iniciar sesión y acceder a la información del perfil mediante autenticación con JSON Web Token.

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- PostgreSQL
- JSON Web Token
- bcryptjs
- dotenv
- CORS

### Frontend

- React
- Vite

## Funcionalidades

- Registro de usuarios.
- Almacenamiento de usuarios en PostgreSQL.
- Encriptación de contraseñas mediante bcryptjs.
- Inicio de sesión mediante correo electrónico y contraseña.
- Generación de JSON Web Token.
- Verificación y decodificación del token.
- Obtención de los datos del usuario autenticado.
- Middleware para validar credenciales.
- Middleware para verificar el JWT.
- Middleware para registrar las consultas recibidas por el servidor.
- Manejo de errores.
- Perfil protegido para usuarios autenticados.

## Endpoints principales

### Registrar usuario

```http
POST /usuarios
```

Permite registrar un nuevo usuario en la base de datos.

### Iniciar sesión

```http
POST /login
```

Valida las credenciales del usuario y retorna un token JWT cuando son correctas.

### Obtener usuario

```http
GET /usuarios
```

Esta ruta se encuentra protegida y requiere enviar el JWT mediante el encabezado:

```text
Authorization: Bearer TOKEN
```

El servidor verifica y decodifica el token para identificar al usuario y retornar sus datos.

## Base de datos

Los archivos SQL necesarios para crear y poblar la base de datos se encuentran en:

```text
frontend/database/
```

Archivos disponibles:

```text
DDL.sql
DML.sql
```

La aplicación utiliza PostgreSQL como sistema de gestión de base de datos.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/JavierVsc/Desafio_Soft_Jobs.git
```

Ingresar al proyecto:

```bash
cd Desafio_Soft_Jobs
```

## Backend

Ingresar a la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` utilizando `.env.example` como referencia y configurar las credenciales correspondientes a PostgreSQL y JWT.

Ejecutar el servidor:

```bash
node index.js
```

El backend se ejecutará en:

```text
http://localhost:3000
```

## Frontend

Desde otra terminal, ingresar a la carpeta del frontend:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

## Seguridad

Las contraseñas de los usuarios no se almacenan directamente en la base de datos. Antes de ser guardadas son encriptadas utilizando `bcryptjs`.

La autenticación de usuarios se realiza mediante JSON Web Token.

Las rutas protegidas verifican el token enviado mediante el encabezado `Authorization`.

El archivo `.env` se encuentra excluido del repositorio mediante `.gitignore` para evitar publicar credenciales o información sensible.

## Estructura principal del proyecto

```text
Desafio_Soft_Jobs/
├── backend/
│   ├── .env.example
│   ├── .gitignore
│   ├── consultas.js
│   ├── index.js
│   ├── middlewares.js
│   ├── package-lock.json
│   └── package.json
│
├── frontend/
│   ├── database/
│   │   ├── DDL.sql
│   │   └── DML.sql
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
