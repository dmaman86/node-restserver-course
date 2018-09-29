const mongoose = require('mongoose');
const uniqueValidated = require('mongoose-unique-validator');

let rolesValid = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} role not valid'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValid
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin( uniqueValidated, { message: '{PATH} must be unique' } );

module.exports = mongoose.model( 'User', usuarioSchema );