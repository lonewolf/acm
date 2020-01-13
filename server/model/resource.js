const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    context: {
        type: String,
        required: true,
    },
    ipRange: {
        type: Array,
        default : []
    },
    location: String
});

const resource = new mongoose.model('Resource', schema);

module.exports = resource;
