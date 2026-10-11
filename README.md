# Shoe Store

A full-stack MERN web application for buying shoes, with an admin area to manage the inventory. It was built as a technical test in three days.

![Demo](GIF.gif)

**Live demo:** https://shoes-store-gamma.vercel.app/

## Features

- Account registration and sign-in with JSON Web Tokens.
- Role-based access with two roles, `user` and `admin`.
- Product catalogue, with create, update and delete operations for administrators.
- A React client with protected routes.

## Tech stack

- **Client (`store-web`):** React, React Router, Axios, Bootstrap
- **API (`store-api`):** Node.js, Express, Mongoose, JSON Web Tokens, bcryptjs, Babel
- **Database:** MongoDB

## API

All routes are prefixed with `/api`.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/signUp` | Create an account |
| `POST` | `/auth/signIn` | Sign in and receive a token |
| `GET` | `/products` | List products |
| `GET` | `/products/:productId` | Get one product |
| `POST` `PUT` `DELETE` | `/products` and `/products/:productId` | Create, update and delete products (admin) |
| `GET` `POST` `PUT` `DELETE` | `/users` and `/users/:userId` | Manage users (admin) |

## Getting started

You need Node.js and a MongoDB database, either local or on MongoDB Atlas.

### 1. Run the API

```bash
cd store-api
cp .env.example .env     # then fill in the values below
npm install
npm run dev
```

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | A long random string used to sign tokens |

The API listens on port 3200.

### 2. Run the client

```bash
cd store-web
npm install
npm start
```

The client reads the API address from `REACT_APP_API_HOST` in `store-web/.env` (`http://localhost:3200/api` by default).

## Documentation

The `UML` folder contains the use case, sequence, activity and component diagrams: [`UML/DiagramasUML.pdf`](UML/DiagramasUML.pdf). The documentation is in Spanish.
