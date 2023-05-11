import * as Entidades from "./Entidade.js";
import FuncoesES from "./EntradaSaida.js";

class acoesRPGEntidades {
  constructor(p1, p2) {
    this.fncES = new FuncoesES();
    this.opAtaques = ["Ataque", "Fuga", "Conversa"];
    this.p1 = p1;
    this.p2 = p2;
  }
  pergOpAtaques() {
    var opcao = this.fncES.perguntaMenu(this.opAtaques);
    switch (opcao) {
      case 0:
        return this.ataque(this.p1, this.p2);
      case 1:
        return this.fuga(this.p1, this.p2);
      case 2:
        return this.conversa(this.p1, this.p2);
      default:
        return 0;
    }
  }

  verificarVencedor(resultado) {
    if (resultado == 0) {
      this.fncES.mensagemCompleta(
        "Não acho que quem ganhar ou quem perder, nem quem ganhar nem perder, vai ganhar ou perder. Todo mundo perdeu."
      );
    } else if (resultado == 1) {
      this.fncES.mensagemCompleta(
        this.p1.nomeCompleto() + " conseguiu vencer!!"
      );
    } else if (resultado == -1) {
      this.fncES.mensagemCompleta(
        this.p2.nomeCompleto() + " conseguiu vencer!!"
      );
    } else {
      this.fncES.mensagemCompleta(
        "====================================Fim===================================="
      );
    }
  }

  ataque() {
    if (this.p1.forca != undefined && this.p2.vida != undefined) {
      this.fncES.mensagemCompleta(
        this.p1.nomeCompleto() + " atacou " + this.p2.nomeCompleto()
      );
      var dano = this.p1.atacar();
      this.p2.vida = this.p2.vida - dano;
      this.fncES.mensagemCompleta(
        this.p1.nomeCompleto() +
          " causou " +
          dano +
          " de dano a" +
          this.p2.nomeCompleto() +
          " que ficou com " +
          this.p2.vida +
          " pontos de vida"
      );
      return this.verificaMortos(this.p1, this.p2);
    } else {
      this.fncES.mensagemCompleta(
        this.p1.nomeCompleto() +
          " não pode atacar " +
          this.p2.nomeCompleto() +
          "."
      );
      this.fncES.mensagemCompleta("A batalha acabou.");
      return -2;
    }
  }
  fuga() {
    if (this.p1.velocidade != undefined && this.p2.velocidade != undefined) {
      this.fncES.mensagemCompleta(
        this.p1.nomeCompleto() + " tenta correr de " + this.p2.nomeCompleto()
      );
      var dano = this.p1.correr();
      var defesa = this.p2.correr();
      if (dano > defesa) {
        this.fncES.mensagemCompleta(
          this.p1.nomeCompleto() +
            " conseguiu correr de " +
            this.p2.nomeCompleto() +
            "."
        );
        return 1;
      } else {
        this.fncES.mensagemCompleta(
          this.p1.nomeCompleto() +
            " não conseguiu correr de " +
            this.p2.nomeCompleto() +
            "."
        );
        return 0;
      }
    } else {
      this.fncES.mensagemCompleta(
        this.p1.nomeCompleto() +
          " não conseguiu correr de " +
          this.p2.nomeCompleto() +
          "."
      );
      return 0;
    }
  }
  conversa() {
    if (
      this.p1.inteligencia != undefined &&
      this.p2.inteligencia != undefined
    ) {
      this.fncES.mensagemCompleta(
        this.p1.nomeCompleto() + " tenta persuadir " + this.p2.nomeCompleto()
      );
      var dano = this.p1.persuadir();
      var defesa = this.p2.persuadir();

      if (dano > defesa) {
        this.fncES.mensagemCompleta(
          this.p1.nomeCompleto() +
            " conseguiu convercer " +
            this.p2.nomeCompleto() +
            "."
        );
        return 1;
      } else if (dano < defesa) {
        this.fncES.mensagemCompleta(
          this.p1.nomeCompleto() +
            " não conseguiu convercer " +
            this.p2.nomeCompleto() +
            "."
        );
        return -1;
      } else {
        this.fncES.mensagemCompleta(
          this.p1.nomeCompleto() +
            " não conseguiu convercer " +
            this.p2.nomeCompleto() +
            "."
        );
        return 0;
      }
    } else {
      this.fncES.mensagemCompleta(
        this.p1.nomeCompleto() +
          " não conseguiu convercer " +
          this.p2.nomeCompleto() +
          "."
      );
      return 0;
    }
  }

  verificaMortos() {
    if (this.p1.vida != undefined && this.p2.vida != undefined) {
      if (this.p1.vida <= 0) {
        return -1;
      } else if (this.p2.vida <= 0) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}

const npc = new Entidades.Entidade("ZéPequeno", 1, 100);
npc.falar("OLá");

const player1 = new Entidades.Player("ZéColmeia", 10, 100, 1000, 10, 10);

const fncJogo = new acoesRPGEntidades(player1, npc);
//inicia batalha entre player1 e npc
var contBatalha = 0;
while (contBatalha == 0) {
  contBatalha = fncJogo.pergOpAtaques();
  if (contBatalha != 0) {
    fncJogo.verificarVencedor(contBatalha);
  }
}

//console.log(npc.tipoEntidade);

//npc.tipoEntidade = "test"
