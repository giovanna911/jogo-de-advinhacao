const btnEnviarPalpite = document.getElementById("btn-enviar-palpite");
const btnReiniciarJogo = document.getElementById("btn-reiniciar-jogo");
const msgAlertaSucesso = document.getElementById("msg-alerta-sucesso");
const msgAlertaFalha = document.getElementById("msg-alerta-falha");
const inputPalpite = document.getElementById("palpite");
const msgDica = document.getElementById("msg-dica");

let numeroGerado, qtdTentativas;
let spnTentativas = document.getElementById("spn-tentativas");

function gerarNumeroAleatorio() {
  let numeroGerado = parseInt(Math.random() * 51);
  return numeroGerado;
}

function atualizarTentativa(qtdTentativasAtualizada) {
  spnTentativas.innerHTML = qtdTentativasAtualizada;
  if (qtdTentativasAtualizada == 0) {
    msgAlertaFalha.classList.remove("esconder");
    finalizarJogo();
  }
}

function limparInput() {
  inputPalpite.value = null;
  inputPalpite.focus();
}

function entrarNoJogo() {
  limparInput();
  numeroGerado = gerarNumeroAleatorio();
  qtdTentativas = 5;
  btnEnviarPalpite.classList.remove("esconder");
  btnReiniciarJogo.disabled = true;
  btnReiniciarJogo.classList.add("esconder");
  msgAlertaSucesso.classList.add("esconder");
  msgAlertaFalha.classList.add("esconder");
  atualizarTentativa(qtdTentativas);
}

function digitarPalpite() {
  let valorDigitado = inputPalpite.value;
  if (valorDigitado >= 0 && valorDigitado <= 50) {
    btnEnviarPalpite.disabled = false;
  } else {
    btnEnviarPalpite.disabled = true;
    if (valorDigitado > 50) {
      inputPalpite.value = 50;
      btnEnviarPalpite.disabled = false;
    }

    if (valorDigitado < 0) {
      inputPalpite.value = 0;
      btnEnviarPalpite.disabled = false;
    }
  }

  return parseInt(valorDigitado);
}

function enviarPalpite() {
  let valorDigitado = digitarPalpite();
  if (numeroGerado == valorDigitado) {
    finalizarJogo("sucesso");
  } else {
    qtdTentativas--;
    atualizarTentativa(qtdTentativas);
    if (valorDigitado > numeroGerado) {
      msgDica.innerHTML = "O número gerado é <strong>menor</strong>."
    } else {
      msgDica.innerHTML = "O número gerado é <strong>maior</strong>."
    }
  }
  limparInput();
}

function finalizarJogo(mensagem) {
  if (mensagem == "sucesso") {
    msgAlertaSucesso.classList.remove("esconder");
  } else {
    msgAlertaFalha.classList.remove("esconder");
  }
  btnEnviarPalpite.classList.add("esconder");
  btnReiniciarJogo.classList.remove("esconder");
  btnReiniciarJogo.disabled = false;
  btnEnviarPalpite.disabled = true;
}

function reiniciarJogo() {
  entrarNoJogo();
}

entrarNoJogo();
