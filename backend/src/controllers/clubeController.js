const { Clube: ClubeModel } = require('../models/Clube');

const clubeController = {
    create: async(req, res) => {
        try {
            const clube = {
               cod: req.body.cod,
               nome: req.body.nome,
               imagem: req.body.imagem,
               temas: req.body.temas
            };

            const response = await ClubeModel.create(clube);

            res.status(201).json({ response, msg: "Clube criado com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const clube = await ClubeModel.find();
            res.json(clube);
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const cod = req.params.cod;
            const clube = await ClubeModel.find({cod: cod});

            if (!clube) {
                res.status(404).json({msg: "Clube não encontrado"});
                return;
            }
            res.json(club);
        }
        catch (error){
            console.log(error);
        }
    },
    delete: async(req, res) => {
        try {
            const cod = req.params.cod;
            const clube = await ClubeModel.find({cod: cod});

            if (!clube) {
                res.status(404).json({msg: "Clube não encontrado"});
                return;
            }
            
            const clubeDeletado = await ClubeModel.deleteOne({cod: cod});

            res.status(200).json({clubeDeletado, msg: "Clube deletado com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        const cod = req.params.cod;
        
        const clube = {
            cod: req.body.cod,
            nome: req.body.nome,
            imagem: req.body.imagem,
            perguntas: req.body.perguntas
         };

        const clubeAtualizado = await ClubeModel.findOneAndUpdate({cod: cod}, clube);

        if (!clubeAtualizado) {
            res.status(404).json({msg: "Clube não encontrado"});
            return;
        }

        res.status(200).json({clube, msg: "Clube atualizado com sucesso! "});
    }
};

module.exports = clubeController;