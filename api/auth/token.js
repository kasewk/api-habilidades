const jwt = require('jsonwebtoken');

module.exports = usuario => {
    const payload = {
        id: usuario.id,
        role: usuario.role,
        cargo: usuario.cargo,
        nome: usuario.nome,
        photo_url: usuario.photo_url
    };

    const token = jwt.sign(payload, process.env.CHAVE_JWT);

    return token

}