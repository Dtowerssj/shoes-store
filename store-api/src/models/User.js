import {model, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchcema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

// Cifrar los datos
userSchcema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Comparar contrasenas
userSchcema.statics.comparePasswords = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export default model('User', userSchcema);