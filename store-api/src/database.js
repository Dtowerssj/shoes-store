import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://dtowers:17camarones@cluster0.m7nq5.mongodb.net/store-db')
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error))