const database = require('../../database/models');
const { isNull, verificaHabilidadeDevCorreta } = require('../helpers/Helpers');

class HabilidadeController {

    async getHabilidadesDevs(req, res) {
        await database.habilidades_devs.findAll()
            .then(habilidades => res.status(200).json(habilidades))
            .catch(err => res.status(500).json(err.message))
    }

    async getHabilidadeDevPorId(req, res) {

        try {
            const dev = await database.habilidades_devs.findAll({where: {id_dev: parseInt(req.params.id)}});
            try {
                isNull(dev, "Usuario não encontrado.");
            } catch (error) {
                res.status(404).json({erro: error.message})
            }
            res.status(200).json(dev);
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async addHabilidadeDev(req, res) {
        let habilidade = { ...req.body, id_dev: req.params.id }
        try {
            verificaHabilidadeDevCorreta(habilidade)
            let habilidadeExiste = await database.habilidades.findOne({where: {id: habilidade.id_habilidade}});
            isNull(habilidadeExiste, 'Habilidade não existe');
            let possuiHabilidade = await database.habilidades_devs.findOne({where: {id_dev: habilidade.id_dev, id_habilidade: habilidade.id_habilidade }})
            isNull(!possuiHabilidade, 'O Usuário já possui esta habilidade.')
            await database.habilidades_devs.create(habilidade)
                .then(habilidade => res.status(200).json(habilidade))
                .catch(err => res.status(500).json(err.message))
        } catch (err) {
            res.status(400).json({erro: err.message})
        }
    }

    async deletaHabilidadeDev(req, res){
        const idDev = req.params.id;
        const idHabilidade = req.params.idHabilidade;

        try {
            let usuario = await database.usuarios.findOne({where: {id: idDev}});
            isNull(usuario, 'Usuario não encontrado.');
            let habilidade = await database.habilidades.findOne({where: {id: idHabilidade}})
            isNull(habilidade, 'Habilidade não encontrada.');
        } catch (err) {
            res.status(400).json({erro: err.message})
        }

        await database.habilidades_devs.destroy({where: {id_dev: idDev, id_habilidade: idHabilidade}})
            .then(() => res.status(204).send())
            .catch(err => res.status(500).json(err.message))
    }

}


module.exports = new HabilidadeController();