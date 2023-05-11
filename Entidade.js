import FuncoesES from './EntradaSaida.js';
import FuncoesDado from './Dado.js';

export class Entidade{    
    #tipoEntidade
    constructor(nome,velocidade,vida,tipoEntidade = "a Entidade"){
        this.fncES = new FuncoesES();
        this.fncDado = new FuncoesDado();
        this.nome = nome;
        this.velocidade = velocidade;
        this.vida = vida;
        this.#tipoEntidade = tipoEntidade;
    }
    get tipoEntidade(){
        return this.#tipoEntidade;
    }
    set tipoEntidade(tipoEntidade){
        if (tipoEntidade.length>=5){
            this.#tipoEntidade = tipoEntidade;
        }else{
            throw new Error('Tamanho inválido');
        }
    }
    nomeCompleto(){
        return this.#tipoEntidade + " "+this.nome;
    }
    correr(){
        return this.fncDado.rolarAtributos(this.sorte,this.velocidade);
    }

    andar(){
        return this.fncDado.rolarAtributos(this.sorte,parseInt(this.velocidade/2));
    }

    falar(mensagem){
        this.fncES.mensagemCompleta(this.nomeCompleto()+" falou: "+mensagem);
    }    
}

export class Player extends Entidade{    
    constructor(nome,velocidade,vida,forca,inteligencia,sorte,tipoEntidade = "o Player"){
        super(nome,velocidade,vida,tipoEntidade)
        this.forca = forca;
        this.inteligencia = inteligencia;
        this.sorte = sorte;
    }
    atacar(){
        return this.fncDado.rolarAtributos(this.sorte,parseInt(this.forca));           
    }   
    persuadir(){
        return this.fncDado.rolarAtributos(this.sorte,parseInt(this.velocidade/2));
    } 
}