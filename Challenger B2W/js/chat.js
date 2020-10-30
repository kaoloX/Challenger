var session_id = '';

const botaoChat = document.querySelector(".chat-icon");
const botaoFechar = document.querySelector("#chat-close")

botaoChat.addEventListener("click", openForm);
botaoFechar.addEventListener("click", e => {
    e.preventDefault();
    closeForm();
});

function openForm() {
    if (botaoChat.classList.contains("active")) {
        botaoChat.classList.remove("active");
        return;
    }
    document.querySelector(".principal").style.display = "block";
    botaoChat.classList.add("active");
}

function closeForm() {
    document.querySelector(".principal").style.display = "none";
}

const carregarDados = () => {
    const input = document.querySelector('#pergunta');

    if (input.value) criaLinha(input.value, 'me');

    const digitando = document.querySelector('.writing');
    digitando.classList.add('ativo');

    const mensagem = input.value ? input.value : '';
    input.value = '';

    fetch(
            `https://ambers-bot.herokuapp.com/red/chat?mensagem=${mensagem}&session_id=${session_id}`
        )
        .then((resultado) => resultado.json())
        .then((dados) => {
            dados.respostas.forEach((resposta) => {
                if (resposta.text) criaLinha(resposta.text, 'bot');
            });
            session_id = dados.session_id;
            digitando.classList.remove('ativo');
        });
};

const criaLinha = (msg, tipo) => {
    const chat = document.querySelector('.conversa');
    const linha = document.createElement('div');
    const balao = criaBalaoConversa(msg, tipo);
    linha.classList.add('linha');
    linha.appendChild(balao);
    chat.appendChild(linha);
    scrollDivDown(chat);
};

const criaBalaoConversa = (texto, tipo) => {
    const balao = document.createElement('div');
    balao.classList.add('chat');
    balao.classList.add(tipo);
    balao.innerHTML = texto;
    return balao;
};

const scrollDivDown = (div) => {
    for (let i = 0; i < div.offsetHeight; i++) {
        div.scrollTop++;
    }
};

document
    .querySelector('#pergunta')
    .addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
            carregarDados();
        }
    });

window.onload = carregarDados();