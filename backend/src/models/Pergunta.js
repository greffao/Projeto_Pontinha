const mongoose = require('mongoose');

const { Schema } = mongoose;

const perguntaSchema = new Schema({
    cod: {
        type: Number,
        required: true
    },
    alternativa_a: {
        type: String,
        required: true
    },
    alternativa_b: {
        type: String,
        required: true
    },
    alternativa_c: {
        type: String,
        required: true
    },
    alternativa_d: {
        type: String,
        required: true
    },
    questao: {
        type: String,
        required: true
    },
    imagem: String
});

const Pergunta = mongoose.model("Pergunta", perguntaSchema);

module.exports = { Pergunta, perguntaSchema };