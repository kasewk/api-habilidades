const database = require('../../database/models')

class LogsControler {

    async getLogs(req, res){}

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

    async logout(user){
        const logLogout = {
            id_user: user.id,
            tipo: 'Logout',
            tabela: 'usuarios',
            id_changed: null
        }
        database.logs.create(logLogout)
    }

}


module.exports = new LogsControler();