const express = require('express');
const HabilidadesController = require('../controllers/HabilidadesController');
const HabilidadesDevsController = require('../controllers/HabilidadesDevsController');
const UsuarioController = require('../controllers/UsuarioController');
const MiddlewaresAutenticacao = require('../auth/MiddlewaresAutenticacao.js');
const passport = require('passport');
const cors = require('cors')

const corsOptions = {
    exposedHeaders: ['Authorization']
};

module.exports = app => {
    

    // app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //     next();
    // })

    app.use(cors(corsOptions))

    app.use(express.json(), passport.initialize())

    app.route('/usuarios/login')
        .post(MiddlewaresAutenticacao.local, UsuarioController.login)

    app.route('/usuarios')
        .get(MiddlewaresAutenticacao.bearer, UsuarioController.getUsuarios)
        .post(UsuarioController.criarUsuario)

    app.post('/usuarios/gestor', UsuarioController.criarUsuario)

    app.route('/usuarios/:id/habilidades')
        .all(MiddlewaresAutenticacao.bearer)
        .get(HabilidadesDevsController.getHabilidadeDevPorId)
        .post(HabilidadesDevsController.addHabilidadeDev)
    
    app.route('/usuarios/:id/habilidades/:idHabilidade')
        .all(MiddlewaresAutenticacao.bearer)
        .delete(HabilidadesDevsController.deletaHabilidadeDev)

    app.route('/emailcadastrado')
        .get(UsuarioController.emailCadastrado)

    app.route('/habilidades')
        .all(MiddlewaresAutenticacao.bearer)
        .get(HabilidadesController.getHabilidades)
        .post(HabilidadesController.criarHabilidade)
    
    app.route('/habilidades/devs')
        .all(MiddlewaresAutenticacao.bearer)
        .get(HabilidadesDevsController.getHabilidadesDevs)


}