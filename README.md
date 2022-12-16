# Prueba técnica realizada con MERN stack, tiempo de realización: 3 días.

Se recomienda revisar la documentación, en la carpeta UML.

![](https://github.com/Dtowerssj/shoes-store/blob/master/GIF.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Paso #1: Clonar el repositorio

# Paso #2 Ejecutar el servidor:

## Para ejecutar el servidor, dirigirse a ./store-api

cd store-api

### Instalar dependencias, ejecutando el comando:

npm install

### Luego ejecutar el comando:

npm run dev

# Paso #3 Ejecutar el cliente:

## Para ejecutar el cliente, dirigirse a ./store-web

cd store-web

### Instalar dependencias, ejecutando el comando:

npm install

### Crear el archivo .env y copiar lo siguiente:

REACT_APP_API_HOST=http://localhost:3200/api

### Luego ejecutar el comando:

npm start

# IMPORTANTE

## Rutas:

## USAR SIEMPRE LA CABECERA: "x-access-token" con el token que devuelve el servidor

## - Autenticación:

http://localhost:3200/api/auth/signIn
http://localhost:3200/api/auth/signUp

## - Productos:

http://localhost:3200/api/products
