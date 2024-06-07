const { Pergunta: PerguntaModel } = require('../models/Pergunta');

const perguntaController = {
    create: async(req, res) => {
        try {
            const pergunta = {
               cod: req.body.cod,
               alternativa_a: req.body.alternativa_a,
               alternativa_b: req.body.alternativa_b,
               alternativa_c: req.body.alternativa_c,
               alternativa_d: req.body.alternativa_d,
               questao: req.body.questao,
               imagem: req.body.imagem
            };

            const response = await PerguntaModel.create(pergunta);

            res.status(201).json({ response, msg: "Pergunta criada com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const pergunta = await PerguntaModel.find();
            res.json(pergunta);
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const cod = req.params.cod;
            const pergunta = await PerguntaModel.find({cod: cod});

            if (!pergunta) {
                res.status(404).json({msg: "Pergunta não encontrada"});
                return;
            }
            res.json(pergunta);
        }
        catch (error){
            console.log(error);
        }
    },
    delete: async(req, res) => {
        try {
            const cod = req.params.cod;
            const pergunta = await PerguntaModel.find({cod: cod});

            if (!pergunta) {
                res.status(404).json({msg: "Pergunta não encontrada"});
                return;
            }
            
            const perguntaDeletada = await PerguntaModel.deleteOne({cod: cod});

            res.status(200).json({perguntaDeletada, msg: "Pergunta deletada com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        const cod = req.params.cod;
        
        const pergunta = {
            cod: req.body.cod,
            alternativa_a: req.body.alternativa_a,
            alternativa_b: req.body.alternativa_b,
            alternativa_c: req.body.alternativa_c,
            alternativa_d: req.body.alternativa_d,
            questao: req.body.questao,
            imagem: req.body.imagem
        };

        const perguntaAtualizada = await PerguntaModel.findOneAndUpdate({cod: cod}, pergunta);

        if (!perguntaAtualizada) {
            res.status(404).json({msg: "Pergunta não encontrada"});
            return;
        }

        res.status(200).json({pergunta, msg: "Pergunta atualizada com sucesso! "});
    }
};

module.exports = perguntaController;