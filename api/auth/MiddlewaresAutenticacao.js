const passport = require('passport');


class MiddlewaresAutenticacao {

    local(req, res, next){
        passport.authenticate(
            'local',
            {session: false},
            (erro, usuario, info) => {
            
                if (erro.message == 'Usuario não encontrado' || erro.message == 'Email e/ou senha inválidos.'){
                return res.status(401).json({erro: erro.message})
                }else if(erro){
                    return res.status(500).json({erro: erro.message});
                }

                if(!usuario) {
                    return res.status(401).json();
                }

                req.user = usuario;
                return next();
        })(req, res, next);
    }

    bearer(req, res, next){
        passport.authenticate(
            'bearer',
            {session: false},
            (erro, usuario, info) => {

                if(erro && erro.name === 'JsonWebTokenError'){
                    return res.status(401).json({erro: erro.message})
                }else if(erro){
                    return res.status(500).json({erro: erro.message})
                }

                if(!usuario){
                    return res.status(401).json();
                }


                req.user = usuario;
                return next();
            }
        )(req, res, next);
    }
}


module.exports = new MiddlewaresAutenticacao();