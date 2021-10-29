const express = require('express');
const HabilidadesController = require('../controllers/HabilidadesController');
const HabilidadesDevsController = require('../controllers/HabilidadesDevsController');
const UsuarioController = require('../controllers/UsuarioController');
const MiddlewaresAutenticacao = require('../auth/MiddlewaresAutenticacao.js');
const passport = require('passport');

module.exports = app => {

    app.use(express.json(), passport.initialize())

    app.route('/usuarios/login')
        .post(MiddlewaresAutenticacao.local, UsuarioController.login)

    app.route('/usuarios')
        .all(MiddlewaresAutenticacao.bearer)
        .get(UsuarioController.getUsuarios)
        .post(UsuarioController.criarUsuario)

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
    
    app.route('/habilidades/devs')
        .all(MiddlewaresAutenticacao.bearer)
        .get(HabilidadesDevsController.getHabilidadesDevs)


}