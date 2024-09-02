# React Test | jceballos

Este proyecto es una aplicación web desarrollada con React que permite a los usuarios gestionar productos a través de una interfaz amigable. La aplicación cuenta con funcionalidades de autenticación, creación, edición y eliminación de productos. 

## Requisitos

- Node.js (>= 12.x)
- npm (>= 6.x)

## Configuración del Entorno de Desarrollo

Para levantar el entorno de desarrollo, sigue estos pasos:

1. Clona el repositorio a tu máquina local:

    ```bash
    git clone https://github.com/JuankiCR/juan-ceballos-react-test.git
    cd juan-ceballos-react-test
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Levanta el servidor de desarrollo:

    ```bash
    npm start
    ```

    Esto iniciará la aplicación en modo desarrollo y podrás acceder a ella desde `http://localhost:3000`.

## Despliegue en Producción

Para realizar un despliegue en producción, sigue estos pasos:

1. Genera el build de producción:

    ```bash
    npm run build
    ```

    Esto generará una carpeta `build` que contiene la aplicación optimizada para producción.

2. Despliega el contenido de la carpeta `build` en tu servidor de producción.

    Puedes usar servidores como [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), o incluso un servidor web tradicional como Nginx.

## Prueba la Aplicación

Puedes probar la aplicación en producción desde el siguiente enlace: [React Test](https://react-test.juankicr.dev/#/).

**Usuario de Prueba:**

- **Correo:** test@gmail.com
- **Contraseña:** Test@024

La autenticación se realiza a través de una API externa que recibe las credenciales y responde con un token. Este token se usa para mantener la sesión activa en la aplicación.

## Características Adicionales

- **Autenticación:** La aplicación incluye un sistema de autenticación que se conecta a una API para validar las credenciales del usuario y recibir un token de sesión.
- **CRUD de Productos:** Permite crear, leer, actualizar y eliminar productos.
- **Persistencia Local:** Los productos se almacenan en el `localStorage` del navegador para acceso rápido.
- **Paginación Dinámica:** Los usuarios pueden cambiar la cantidad de productos que desean ver por página.

---

# React Test | jceballos

This project is a web application developed with React that allows users to manage products through a user-friendly interface. The application includes features for authentication, product creation, editing, and deletion.

## Requirements

- Node.js (>= 12.x)
- npm (>= 6.x)

## Development Setup

To set up the development environment, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/JuankiCR/juan-ceballos-react-test.git
    cd juan-ceballos-react-test
    ```

2. Install the project dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

    This will start the application in development mode, and you can access it at `http://localhost:3000`.

## Production Deployment

To deploy the application to production, follow these steps:

1. Generate the production build:

    ```bash
    npm run build
    ```

    This will generate a `build` folder containing the optimized application for production.

2. Deploy the contents of the `build` folder to your production server.

    You can use hosting services like [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or even a traditional web server like Nginx.

## Test the Application

You can test the application in production at the following link: [React Test](https://react-test.juankicr.dev/#/).

**Test User:**

- **Email:** test@gmail.com
- **Password:** Test@024

The authentication is handled through an external API that receives the credentials and responds with a token. This token is used to maintain the session active within the application.

## Additional Features

- **Authentication:** The application includes an authentication system that connects to an API to validate user credentials and receive a session token.
- **Product CRUD:** Allows creating, reading, updating, and deleting products.
- **Local Persistence:** Products are stored in the browser's `localStorage` for quick access.
- **Dynamic Pagination:** Users can change the number of products they want to see per page.