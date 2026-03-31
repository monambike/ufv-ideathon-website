const chatBox = document.getElementById("chatBox");


function addBot(texto) {
    chatBox.innerHTML += `<div class="bot">${texto}</div>`;
}

function addUser(texto) {
    chatBox.innerHTML += `<div class="user">${texto}</div>`;
}


async function enviarPergunta() {
    const input = document.getElementById("mensagem");
    const pergunta = input.value;
    if (!pergunta) return;

    addUser(pergunta);
    input.value = "";

   
    const resposta = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: pergunta })
    });

    const dados = await resposta.json();
    addBot(dados.resposta);
}


window.onload = function() {
    setTimeout(() => {
        adicionarMensagemBot("Oi 👋, como posso ajudar?");
    }, 700);
}


function enviarMensagem() {
    const input = document.getElementById("mensagem");
    const texto = input.value.trim();
    if (texto === "") return;

    adicionarMensagemUser(texto);
    input.value = "";

 
    animacaoDigitando();
    setTimeout(() => {
        removerDigitando();
        adicionarMensagemBot("Estou processando sua pergunta...");
    }, 1500);
}

function adicionarMensagemUser(texto) {
    const chat = document.getElementById("chat");
    const msg = document.createElement("div");
    msg.className = "user";
    msg.innerText = texto;
    chat.appendChild(msg);
    scrollFinal();
}

function adicionarMensagemBot(texto) {
    const chat = document.getElementById("chat");
    const msg = document.createElement("div");
    msg.className = "bot";
    msg.innerText = texto;
    chat.appendChild(msg);
    scrollFinal();
}

function animacaoDigitando() {
    const chat = document.getElementById("chat");
    const digitando = document.createElement("div");
    digitando.className = "bot";
    digitando.id = "digitando";
    digitando.innerHTML = "digitando<span class='dots'>...</span>";
    chat.appendChild(digitando);
    scrollFinal();
}

function removerDigitando() {
    const d = document.getElementById("digitando");
    if (d) d.remove();
}


function scrollFinal() {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
}


document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") enviarMensagem();
});


function toggleMenu() {
    const menu = document.getElementById("dropdown");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
