const mongoose = require('mongoose');

const { Schema } = mongoose;

const { perguntaSchema } = require('./Pergunta');

const temaSchema = new Schema({
    cod: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    imagem: String, 
    perguntas: {
        type: [perguntaSchema]
    }
});

const Tema = mongoose.model("Tema", temaSchema);

module.exports = { Tema, temaSchema };