const readline = require('node:readline');

const mongoose = require('mongoose');

// Função que conecta à aplicação mongoose ao banco de dados do MongoDB Atlas
function main(usernameDBAdmin, passwordDBAdmin){

    try{
        mongoose.connect('mongodb+srv://dbadminpp:pp2024*)(@cluster0.xxq2zzt.mongodb.net/?retryWrites=true&w=majority');
        console.log("Conectado ao banco!");
    } catch(error){
        console.log(`Erro: ${error}`);
    }
}

module.exports = main