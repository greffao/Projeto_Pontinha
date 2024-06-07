// Utilizando bcrypt para criação de hash de senhas, para não armazenarmos as
// senhas de usuário nos servidores, apenas o hash

const bcrypt = require('bcrypt');

const { Coordenador: CoordenadorModel }  = require('../models/Coordenador');

const coordenadorController = {
    create: async(req, res) => {
        try {

            const hashSenha = await bcrypt.hash(req.body.senha, 10);

            const coordenador = {
               login: req.body.login,
               senha: hashSenha
            };

            const response = await CoordenadorModel.create(coordenador);

            res.status(201).json({ response, msg: "Coordenador criado com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const coordenador = await CoordenadorModel.find();
            res.json(coordenador);
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const login = req.params.login;
            const coordenador = await CoordenadorModel.find({ login: login});

            if (!coordenador) {
                res.status(404).json({msg: "Coordenador não encontrado"});
                return;
            }
            res.json(coordenador);
        }
        catch (error){
            console.log(error);
        }
    },
    delete: async(req, res) => {
        try {
            const login = req.params.login;
            const coordenador = await CoordenadorModel.find({ login: login});

            if (!coordenador) {
                res.status(404).json({msg: "Coordenador não encontrado"});
                return;
            }
            
            const coordenadorDeletado = await CoordenadorModel.deleteOne({ login: login});

            res.status(200).json({coordenadorDeletado, msg: "Coordenador deletado com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        const hashSenha = await bcrypt.hash(req.body.senha, 10); 

        const coordenador = {
            login: req.body.login,
            senha: hashSenha
        };

        const login = req.params.login;
        const coordenadorAtualizado = await CoordenadorModel.findOneAndUpdate({login: login}, coordenador);

        if (!coordenadorAtualizado) {
            res.status(404).json({msg: "Coordenador não encontrado"});
            return;
        }

        res.status(200).json({coordenador, msg: "Coordenador atualizado com sucesso! "});
    }
};

module.exports = coordenadorController;