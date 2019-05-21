const mongoose = require('mongoose');

const JogoSchema = new mongoose.Schema({
    name: String,
    email: String,
    pontuacao: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Jogo', JogoSchema);