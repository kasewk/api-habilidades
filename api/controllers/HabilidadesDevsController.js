const database = require('../../database/models');
const Helpers = require('../helpers/Helpers');

class HabilidadeController {

    async getHabilidadesDevs(req, res) {
        
        await database.habilidades_devs.findAll()
            .then(habilidades => res.status(200).json(habilidades))
            .catch(err => res.status(500).json(err.message))
    }

    async getHabilidadeDevPorId(req, res) {
        await database.habilidades_devs.findAll({where: {id_dev: parseInt(req.params.id)}})
            .then(dev => res.status(200).json(dev))
            .catch(err => res.status(500).json(err.message))
    }

    async addHabilidadeDev(req, res) {
        const habilidade = { ...req.body }

        try {
            Helpers.verificaHabilidadeDevCorreta(habilidade)
            await database.habilidades_devs.create(habilidade)
                .then(habilidade => res.status(200).json(habilidade))
                .catch(err => res.status(500).json(err.message))
        } catch (err) {
            res.status(400).json(err.message)
        }
    }

    async deletaHabilidadeDev(req, res){
        const idDev = req.params.id;
        const idHabilidade = req.params.idHabilidade;

        await database.habilidades_devs.destroy({where: {id_dev: idDev, id_habilidade: idHabilidade}})
            .then(() => res.status(204).send())
            .catch(err => res.status(500).json(err.message))
    }

}


module.exports = new HabilidadeController();