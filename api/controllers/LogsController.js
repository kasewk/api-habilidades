const database = require('../../database/models')

class LogsControler {

    async getLogs(req, res){
        console.log("GET Logs chamado")

        if(req.user.role !== 'gestor'){
            res.status(401).json({erro: 'Não Autorizado'})
            return;
        }

        await database.logs.findAll({include: database.usuarios, order: [['createdAt', 'DESC']]})
            .then(logs => {
                console.log("LOGS")
                let logsFormatado = logs.map(log => {
                    return {
                        id: log.id,
                        id_user: log.id_user,
                        tipo: log.tipo,
                        tabela: log.tabela,
                        id_changed: log.id_changed,
                        createdAt: log.createdAt,
                        updatedAt: log.updatedAt,
                        usuario: {
                            id: log.usuario.id,
                            nome: log.usuario.nome,
                            cargo: log.usuario.cargo,
                            role: log.usuario.role,
                            email: log.usuario.email
                        }
                    }
                })
                console.log(logsFormatado)
                res.status(200).json(logsFormatado)
            })
            .catch(err => res.status(500).json(err))
    }

    async novoUsuario(user){
        const logNovoUsuario = {
            id_user: user.id,
            tipo: 'ADD',
            tabela: 'usuarios',
            id_changed: user.id
        }
        database.logs.create(logNovoUsuario)
    }

    async novaHabilidade(user, habilidade){
        const logNovaHabilidade = {
            id_user: user.id,
            tipo: 'ADD',
            tabela: 'habilidades',
            id_changed: habilidade.id
        }
        database.logs.create(logNovaHabilidade)
    }

    async vincularHabilidade(user, habilidadeDev){
        const logVincularHabilidade = {
            id_user: user.id,
            tipo: 'ADD',
            tabela: 'habilidades_devs',
            id_changed: habilidadeDev.id
        }
        database.logs.create(logVincularHabilidade)
    }

    async desvincularHabilidade(user){
        const logDesvincularHabilidade = {
            id_user: user.id,
            tipo: 'DELETE',
            tabela: 'habilidades_devs',
            id_changed: null
        }
        database.logs.create(logDesvincularHabilidade)
    }

    async recuperarSenha(user){
        const logRecuperarSenha = {
            id_user: user.id,
            tipo: 'recuperarSenha',
            tabela: 'usuarios',
            id_changed: user.id
        }
        database.logs.create(logRecuperarSenha)
    }

    async login(user){
        const logLogin = {
            id_user: user.id,
            tipo: 'Login',
            tabela: 'usuarios',
            id_changed: null
        }
        database.logs.create(logLogin)
    }

    async logout(req, res){
        const user = req.user;
        const logLogout = {
            id_user: user.id,
            tipo: 'Logout',
            tabela: 'usuarios',
            id_changed: null
        }
        database.logs.create(logLogout)
        res.status(200).json()
    }

}


module.exports = new LogsControler();