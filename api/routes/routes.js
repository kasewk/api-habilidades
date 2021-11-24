const express = require('express');
const HabilidadesController = require('../controllers/HabilidadesController');
const HabilidadesDevsController = require('../controllers/HabilidadesDevsController');
const UsuarioController = require('../controllers/UsuarioController');
const MiddlewaresAutenticacao = require('../auth/MiddlewaresAutenticacao.js');
const passport = require('passport');
const cors = require('cors');
const LogsController = require('../controllers/LogsController');

const corsOptions = {
    exposedHeaders: ['Authorization']
};

module.exports = (app, upload, express) => {
    

    app.use(cors(corsOptions))

    app.use(express.json(), express.urlencoded({extended: true}), passport.initialize())

    app.route('/emailcadastrado')
        .get(UsuarioController.emailCadastrado)

    app.route('/recuperarsenha')
        .post(UsuarioController.recuperarSenha)

    app.route('/recuperarsenha/codigo')
        .post(UsuarioController.verificarCodigoSenha)

    app.route('/recuperarsenha/senha')
        .post(UsuarioController.atualizarSenhaComCodigo)

    app.route('/usuarios/login')
        .post(MiddlewaresAutenticacao.local, UsuarioController.login)

    app.route('/usuarios')
        .get(MiddlewaresAutenticacao.bearer, UsuarioController.getUsuarios)
        .put(MiddlewaresAutenticacao.bearer, upload.single('avatar'), UsuarioController.uploadPhoto)
        .post(UsuarioController.criarUsuario)

    app.use('/usuarios/photo', express.static('/home/paulo/codeProjects/wise/projeto2/api-habilidades/uploads'))

    app.post('/usuarios/gestor', UsuarioController.criarUsuario)

    app.route('/usuarios/:id/habilidades')
        .all(MiddlewaresAutenticacao.bearer)
        .get(HabilidadesDevsController.getHabilidadeDevPorId)
        .post(HabilidadesDevsController.addHabilidadeDev)
    
    app.route('/usuarios/:id/habilidades/:idHabilidade')
        .all(MiddlewaresAutenticacao.bearer)
        .delete(HabilidadesDevsController.deletaHabilidadeDev)

    app.route('/habilidades')
        .all(MiddlewaresAutenticacao.bearer)
        .get(HabilidadesController.getHabilidades)
        .post(HabilidadesController.criarHabilidade)

    app.route('/habilidades/:id')
        .all(MiddlewaresAutenticacao.bearer)
        .get(HabilidadesController.getHabilidadePorId)
        .put(HabilidadesController.editarHabilidade)
        .delete(HabilidadesController.deletarHabilidade)
    
    app.route('/habilidades/devs')
        .all(MiddlewaresAutenticacao.bearer)
        .get(HabilidadesDevsController.getHabilidadesDevs)
    
    app.route('/logs')
        .all(MiddlewaresAutenticacao.bearer)
        .get(LogsController.getLogs)
    
    app.route('/logs/logout')
        .all(MiddlewaresAutenticacao.bearer)
        .post(LogsController.logout)


}