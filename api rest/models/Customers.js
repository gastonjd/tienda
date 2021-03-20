const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customersSchema = new Schema({
    name:{
    type: String,
    trim: true
    },
    lastName:{
        type: String,
        trim: true
    },
    email:{
        type:String,
        trim: true,
        unique: true,
        lowerCase: true
    },
    phone:{
        type:String,
        trim: true
    },
});

module.exports = mongoose.model('Customers', customersSchema);