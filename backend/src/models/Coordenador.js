const mongoose = require('mongoose');

const { Schema } = mongoose;

const coordenadorSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

const Coordenador = mongoose.model("Coordenador", coordenadorSchema);

module.exports = { Coordenador };