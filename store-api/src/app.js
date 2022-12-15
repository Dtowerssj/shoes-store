import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import cors from 'cors';

import { createRoles } from './libs/initialSetup';

// Rutas
import productsRoutes from './routes/products.routes.js';
import usersRoutes from './routes/users.routes' ;
import authRoutes from './routes/auth.routes';

const app = express();
createRoles();

app.set('pkg', pkg);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);


export default app;