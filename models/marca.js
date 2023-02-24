const { Schema, model } = require('mongoose');

const MarcaSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre de la marca es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


module.exports = model('Marca', MarcaSchema);