const { Tema: TemaModel } = require('../models/Tema');

const temaController = {
    create: async(req, res) => {
        try {
            const tema = {
               cod: req.body.cod,
               nome: req.body.nome,
               imagem: req.body.imagem,
               perguntas: req.body.perguntas
            };

            const response = await TemaModel.create(tema);

            res.status(201).json({ response, msg: "Tema criado com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const tema = await TemaModel.find();
            res.json(tema);
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const cod = req.params.cod;
            const tema = await TemaModel.find({cod: cod});

            if (!tema) {
                res.status(404).json({msg: "Tema não encontrado"});
                return;
            }
            res.json(tema);
        }
        catch (error){
            console.log(error);
        }
    },
    delete: async(req, res) => {
        try {
            const cod = req.params.cod;
            const tema = await TemaModel.find({cod: cod});

            if (!tema) {
                res.status(404).json({msg: "Tema não encontrado"});
                return;
            }
            
            const temaDeletado = await TemaModel.deleteOne({cod: cod});

            res.status(200).json({temaDeletado, msg: "Tema deletado com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        const cod = req.params.cod;
        
        const tema = {
            cod: req.body.cod,
            nome: req.body.nome,
            imagem: req.body.imagem,
            perguntas: req.body.perguntas
         };

        const temaAtualizado = await TemaModel.findOneAndUpdate({cod: cod}, tema);

        if (!temaAtualizado) {
            res.status(404).json({msg: "Tema não encontrado"});
            return;
        }

        res.status(200).json({tema, msg: "Tema atualizado com sucesso! "});
    }
};

module.exports = temaController;