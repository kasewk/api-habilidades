const database = require('../../database/models');
const { verificaUsuarioCorreto } = require('../helpers/Helpers.js');
const Helpers = require('../helpers/Helpers.js');
const bcrypt = require('bcrypt');
const geraToken = require('../auth/token');

class UsuarioController {

    getUsuarios = async(req, res) => {

        if(req.query.dev){
            await database.usuarios.findAll({ where: { role: 'dev' } })
                .then(usuarios => res.status(200).json(usuarios))
                .catch(err => res.status(500).json(err.message))
            return;
        }

        await database.usuarios.findAll()
            .then(usuarios => res.status(200).json(usuarios))
            .catch(err => res.status(500).json(err.message))
        
    }


    getUserPorId = async (req, res) =>{
        const idDev = req.params.id;

        try{
            Helpers.isInteiro(idDev)
            const userObj = {};
    
            await database.usuarios.findOne({where: {id: idDev}})
                .then(user => {
                    if(user){
                        userObj.id = user.id;
                        userObj.nome = user.nome;
                        userObj.cargo = user.cargo;
                        userObj.role = user.role;
                    }else{
                        throw new Error("Usuário não encontrado.");
                    }
                }).catch(err => res.status(500).json(err.message))
    
            userObj.habilidades = await this.getUserHabilidades(idDev);
            res.status(200).json(userObj);

        }catch(err){
            res.status(400).json(err.message)
        }
    }

    async getUsuariosDevs(req, res){
        await database.usuarios.findAll({where: {role: 'dev'}})
            .then(usuarios => res.status(200).json(usuarios))
            .catch(err => res.status(500).json(err.message))
    }


    async criarUsuario(req, res) {
        const usuario = {...req.body}
        try {
            verificaUsuarioCorreto(usuario);
            let senha = usuario.senha;
            let salt = await bcrypt.genSalt()
            await bcrypt.hash(senha, salt).then(senhaHash => usuario.senha = senhaHash)
            await database.usuarios.create(usuario)
                .then(user => res.status(200).json(user))
                .catch(err => res.status(500).json(err))
            
        } catch (err) {
            res.status(400).json(err.message)

        }
    }

    async buscaPorEmail(valorEmail){
        const usuario = await database.usuarios.findOne({ where: { email: valorEmail}});
        return usuario
    }
    async buscaPorId(valorId){
        const usuario = await database.usuarios.findOne({ where: { id: valorId}});
        return usuario
    }

    login(req, res) {
        const token = geraToken(req.user);
        res.set('Authorization', token);
        res.status(204).send();
    }

    async getUserHabilidades(id) {
        try {
            let habilidades = await database.sequelize.query(`
                SELECT b.nome FROM habilidades b
                JOIN habilidades_devs a ON a.id_habilidade = b.id
                WHERE a.id_dev = ${id};`,
                { type: database.sequelize.QueryTypes.SELECT }
            )

            return habilidades.map(habilidade => habilidade.nome)
        } catch (err) {
            return;
        }

    }

    montaObjeto(user){
        return {
            id: user.id,
            nome: user.nome,
            cargo: user.cargo,
            role: user.role,
            habilidades: []
        }
    }

}

module.exports = new UsuarioController();