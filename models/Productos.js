const mongooose = require('mongoose');
const Schema = mongooose.Schema;

const productosSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
    }, 
    imagen: {
        type: String
    }
});

module.exports = mongooose.model('Productos', productosSchema);