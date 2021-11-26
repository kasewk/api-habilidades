const nodemailer = require('nodemailer');


async function enviaEmail(email, codigo, nome){

    let contaTeste = await nodemailer.createTestAccount();

    let transportador = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        auth: {
            user: contaTeste.user,
            pass: contaTeste.pass
        }
    })

    let info = await transportador.sendMail({
        from: '"Catálogo de habilidades" <noreply@catalogo.com>',
        to: email,
        subject: "Email de Recuperação de senha",
        text: `Olá, ${nome} Código para recuperação de senha: ${codigo}`,
        html: `<h1>Olá, ${nome}</h1><br> <p>Código para recuperação de senha: ${codigo}</p>`
    })

    console.log("Mensagem enviada: " + info.messageId);

    console.log('URL: ' + nodemailer.getTestMessageUrl(info))
}


module.exports = enviaEmail;