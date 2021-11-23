const database = require('../../database/models');
const { verificaUsuarioCorreto, isNull } = require('../helpers/Helpers.js');
const Helpers = require('../helpers/Helpers.js');
const bcrypt = require('bcrypt');
const geraToken = require('../auth/token');
const { v4: uuidv4 } = require('uuid');
const enviaEmail = require('../email/Email');
const LogsController = require('./LogsController');

class UsuarioController {

    getUsuarios = async(req, res) => {

        if(req.query.dev){
            await database.usuarios.findAll({ where: { role: 'dev' } })
                .then(usuarios => res.status(200).json(usuarios))
                .catch(err => res.status(500).json(err.message))
            return;
        }

        let arrayUsers = [];
        
        if(req.query.page){
            await database.usuarios.findAll({ offset: (parseInt(req.query.page) * 12) - 12, limit: 12, attributes: ['id', 'nome', 'cargo', 'email'], include: [database.habilidades_devs], order: [['nome', 'ASC']] })
                .then(users => {
                    arrayUsers = users.map(async user => {
                        let hab = await this.getUserHabilidades(user.id)
                        return {
                            id: user.id,
                            nome: user.nome,
                            cargo: user.cargo,
                            role: user.role,
                            email: user.email,
                            habilidades: hab
                        }
                    })
                }).catch(err => console.log(err.message))
        
        Promise.all(arrayUsers)
            .then(resposta => res.status(200).json(resposta))
            .catch(err => res.status(500).json({erro: err.message}))
        }else{
            
            await database.usuarios.findAll({order: [['nome', 'ASC']]})
                .then(users => {
                    arrayUsers = users.map(async user => {
                        let hab = await this.getUserHabilidades(user.id)
                        return {
                            id: user.id,
                            nome: user.nome,
                            cargo: user.cargo,
                            role: user.role,
                            email: user.email,
                            habilidades: hab
                        }
                    })
                }).catch(err => console.log(err.message))
            
            Promise.all(arrayUsers)
                .then(resposta => res.status(200).json(resposta))
                .catch(err => res.status(500).json({erro: err.message}))
        }

        
    }


    getUserPorId = async (req, res) => {
        const idDev = req.params.id;

        try{
            Helpers.isInteiro(idDev)
            const userObj = {};
    
            await database.usuarios.findOne({where: {id: idDev}})
                .then(user => {
                        isNull(user, 'Usuário não encontrado.')
                        userObj.id = user.id;
                        userObj.nome = user.nome;
                        userObj.cargo = user.cargo;
                        userObj.role = user.role;
                }).catch(err => res.status(500).json(err.message))
    
            userObj.habilidades = await this.getUserHabilidades(idDev);
            res.status(200).json(userObj);

        }catch(err){
            res.status(400).json(err.message)
        }
    }

    async criarUsuario(req, res) {
        const usuario = {...req.body}
        try {
            verificaUsuarioCorreto(usuario);
            if(req.url === '/usuarios/' || !usuario.role){
                usuario.role = "dev";
            }
            let senha = usuario.senha;
            let salt = await bcrypt.genSalt();
            await bcrypt.hash(senha, salt).then(senhaHash => usuario.senha = senhaHash)
            await database.usuarios.create(usuario)
                .then(user => {
                    res.status(204).send()
                    LogsController.novoUsuario(user)
                })
                .catch(err => res.status(500).json(err))
            
        } catch (err) {
            res.status(400).json({erro: err['message']});
        }
    }
    
    async emailCadastrado(req, res){
        const email = req.query.email;
        await database.usuarios.findOne({where: {email}})
            .then((usuario) => {
                if(usuario){
                    res.status(200).json({emailCadastrado: true})
                }else{
                    res.status(200).json({ emailCadastrado: false })
                }
            })
            .catch(err => res.status(500).json({emailCadastrado: false}))
    }

    async recuperarSenha(req, res){
        const email = req.body.email;

        await database.usuarios.findOne({where: {email}})
            .then(async usuario => {
                res.status(204).json();
                const codigo = uuidv4().split('-')[0];
                usuario.codigo_temp = codigo;
                usuario.save({fields: ['codigo_temp']}).catch(console.log)
                enviaEmail(usuario.email, usuario.codigo_temp).catch(console.log)
            })
            .catch(err => res.status(500).json(err))

    }

    async verificarCodigoSenha(req, res){
        const dados = {...req.body};

        await database.usuarios.findOne({where: {email: dados.email}})
            .then(async usuario => {
                if(dados.codigo === usuario.codigo_temp){
                    res.status(204).json()
                    return;
                }
                res.status(400).json({erro: 'codigo invalido'})
            })
            .catch(err => res.status(500).json(err))
    }

    atualizarSenhaComCodigo = async (req, res) => {
        const dados = {...req.body};

        await database.usuarios.findOne({where: {email: dados.email}})
            .then(async usuario => {
                if(!usuario.codigo_temp){
                    res.status(400).json();
                    return;
                }
                if(dados.codigo != usuario.codigo_temp){
                    res.status(400).json({erro: "código inválido"})
                    return;
                }
                let senhaHash = await this.criptografaSenha(dados.senha)
                usuario.senha = senhaHash;
                usuario.codigo_temp = null;
                await usuario.save({fields: ['senha', 'codigo_temp']})
                    .then(() => {
                        res.status(204).json()
                        LogsController.recuperarSenha(req.user)
                    })
                    .catch(err => res.status(500).json(err))

            }).catch(err => res.status(500).json())
    }

    async buscaPorEmail(valorEmail){
        const usuario = await database.usuarios.findOne({ where: { email: valorEmail}});
        isNull(usuario, 'Usuario não encontrado.');
        return usuario
    }

    async buscaPorId(valorId){
        const usuario = await database.usuarios.findOne({ where: { id: valorId}});
        isNull(usuario, 'Usuario não encontrado.');
        return usuario
    }


    login(req, res) {
        const token = geraToken(req.user);
        res.set('Authorization', token);
        res.status(204).send();
        LogsController.login(req.user)
    }

    async getUserHabilidades(id) {
        
        let habilidades = [];
        await database.sequelize.query(`
            SELECT b.nome FROM habilidades b
            JOIN habilidades_devs a ON a.id_habilidade = b.id
            WHERE a.id_dev = ${id}
            ORDER BY a.nivel DESC, b.nome;`,
            { type: database.sequelize.QueryTypes.SELECT })
            .then(resultadoHabilidades => habilidades = resultadoHabilidades)
            .catch(err => console.log("Erro ao buscar habilidades"))
        return habilidades.map(habilidade => habilidade.nome)
    }

    async criptografaSenha(senha){
        let salt = await bcrypt.genSalt();
        return await bcrypt.hash(senha, salt)
    }

}

module.exports = new UsuarioController();