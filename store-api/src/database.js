import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://dtorres:ieWLUH6fPWdbzNg4@cluster0.m7nq5.mongodb.net/store-db')
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error))