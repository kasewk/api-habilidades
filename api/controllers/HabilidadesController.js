const database = require('../../database/models');
const Helpers = require('../helpers/Helpers');

class HabilidadeController {

    async getHabilidades(req, res){
        await database.habilidades.findAll()
            .then(habilidades => res.status(200).json(habilidades))
            .catch(err => res.status(500).json(err.message))
    }

    async criarHabilidade(req, res){
        const novaHabilidade = {...req.body}

        try {
            Helpers.verificaHabilidadeCorreta(novaHabilidade)
            await database.habilidades.create(novaHabilidade)
                .then(habilidade => res.status(200).json(habilidade))
                .catch(err => res.status(500).json(err.message))
            
        } catch (err) {
            res.status(400).json(err.message)
        }
    }

}


module.exports = new HabilidadeController();