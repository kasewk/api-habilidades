const database = require('../../database/models');
const Helpers = require('../helpers/Helpers');
const LogsController = require('./LogsController');

class HabilidadeController {

    async getHabilidades(req, res){
        await database.habilidades.findAll({order: [['nome', 'ASC']]})
            .then(habilidades => res.status(200).json(habilidades))
            .catch(err => res.status(500).json(err.message))
    }

    async criarHabilidade(req, res){
        const novaHabilidade = {...req.body}

        try {
            Helpers.verificaHabilidadeCorreta(novaHabilidade)
            await database.habilidades.create(novaHabilidade)
                .then(habilidade => {
                    res.status(200).json(habilidade)
                    LogsController.novaHabilidade(req.user, habilidade)
                })
                .catch(err => res.status(500).json(err.message))
            
        } catch (err) {
            res.status(400).json(err.message)
        }
    }

    async editarHabilidade(req, res){
        const habilidadeId = req.params.id;
        const habilidade = {...req.body};

        await database.habilidades.update(habilidade, {where: {id: habilidadeId}})
            .then(() => res.status(204).json())
            .catch(err => res.status(500).json(err))
    }

    async deletarHabilidade(req, res){
        const habilidadeId = req.params.id;

        if(req.user.role !== 'gestor'){
            res.status(401).json({erro: "Não Autorizado"})
            return;
        }
        
        await database.habilidades.destroy({where: {id: habilidadeId}})
            .then(() => res.status(204).json())
            .catch(err => res.status(500).json())
    }

}


module.exports = new HabilidadeController();