class Helpers {

    static isInteiro(numero){

        let numeroFormatado = parseInt(numero)
        if (Number.isInteger(numeroFormatado)) {
            return;
        }else{
            throw new Error("O valor precisa ser um número inteiro.")
        }
    }

    static verificaUsuarioCorreto({nome, cargo, email, senha, role}){

        let erros = [];
        if(!nome){
            erros.push('Nome Inválido.');
        }
        if(!cargo){
            erros.push('Cargo Inválido.');
        }
        if(!email){
            erros.push('Email Inválido.');
        }
        if(!senha){
            erros.push('Senha Inválida.');
        }
        if (!role){
            erros.push('Role Inválida.');
        }

        if(erros.length > 0){
            throw new Error(`Erro: ${erros.join(" ")}`)
        }

    }

    static verificaHabilidadeCorreta({nome}){
 
        if(!nome){
            throw new Error('Nome Inválido.');
        }
    }

    static verificaHabilidadeDevCorreta({id_habilidade, nivel}){

        let erros = [];
        let idHab = parseInt(id_habilidade);
        let nivelFormatado = parseInt(nivel);
        if (!idHab || !Number.isInteger(idHab)){
            erros.push('Habilidade Inválida.')
        }
        if (!nivelFormatado || !Number.isInteger(nivelFormatado)){
            erros.push('Nível Inválido.')
        }

        if(erros.length > 0){
            throw new Error(`Erro: ${erros.join(" ")}`)
        }

    }

    static isNull(valor, msg){
        if (!valor) throw new Error(msg)
        if (Array.isArray(valor) && valor.length === 0) throw new Error(msg)
        if (typeof valor === 'string' && !valor.trim()) throw new Error(msg)
    }
}

module.exports = Helpers;