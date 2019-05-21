const Jogo = require('../models/Jogo');

module.exports = {

    async index(req, res){
        const lista = await Jogo.find({}).sort();
        return res.json(lista);
    },

    async indexId(req, res){
        const lista = await Jogo.findById(req.params.id);
        return res.json(lista);
    },

    async pontos(req, res){
        const lista = await Jogo.findById(req.params.id);
        lista.set({ pontuacao: "" });
        lista.set({ pontuacao: req.params.pts });
        await lista.save();
        return res.json(lista);
    },

    async store(req, res){
        const lista = await Jogo.create(req.body);

        req.io.emit('jogadores', lista);

        return res.json(lista);
    }



};