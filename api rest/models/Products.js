const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productShema = new Schema ({
    sku:{
        type: String,
        trim: true,
        unique: true,
        uppercase: true 
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
    }
});

module.exports = mongoose.model('Products', productShema);