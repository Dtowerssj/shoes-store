import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/store-db')
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error))