const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const UsuarioController = require('../controllers/UsuarioController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await UsuarioController.buscaPorEmail(email);
            if(!usuario) throw new Error('Usuario não encontrado');
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if(!senhaValida) throw new Error('Email e/ou senha inválidos.');
            done(null, usuario);
            
        } catch (err) {
            done(err);
        }

    })
)

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const usuario = await UsuarioController.buscaPorId(payload.id);
                done(null, usuario);
            } catch (err) {
                done(err);
            }
        }
    )
)
