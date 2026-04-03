import Config from "./../config/configs.js"
import TextFormatting from "./../utils/text-formatting.js";

export default class ChatBot {
  static async requestBotResponse() {
    var lastBotMessage = this.getLastBotMessage();

    var rowItems = await this.getLastMessage();
    var userInput = rowItems[3];

    if (!rowItems || rowItems[2] == "bot") return;

    if (lastBotMessage !== undefined){
      lastBotMessage = TextFormatting.normalizeText(lastBotMessage);
    }

    userInput = TextFormatting.removeDoubleQuotes(userInput);
    userInput = TextFormatting.decodeHtmlEntities(userInput);
    userInput = TextFormatting.normalizeText(userInput);
    
    this.chooseBotResponse(userInput, lastBotMessage);
  }

  static async getLastMessage() {
    try {
      const res = await fetch(Config.$CHAT_LOG_FILE_PATH);
      const text = await res.text();

      const data = text.split("\n").filter(n => n);
      
      var lastMessage = data[data.length - 1];

      lastMessage = TextFormatting.returnCsvAsArray(lastMessage);

      const rowItems = lastMessage.filter(n => n);

      return rowItems; // <-- agora sim retorna pra quem chamou
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /**
   * Retrieves the last bot message in CSV message data file.
   */
  static getLastBotMessage() {
    fetch(Config.$CHAT_LOG_FILE_PATH)
      .then((res) => res.text())
      .then((text) => {
          if (!text) return null;

          var data = text.split("\n").filter(n => n);
          var lastBotMessage = data[data.length - 1];
          
          var rowItems = TextFormatting.returnCsvAsArray(lastBotMessage);

          // Getting only the message content
          var lastMessage = rowItems[3];

          return lastMessage;
      })
      .catch((e) => console.error(e));
  }

  static async sendBotMessage(messageContent) {
    messageContent = `${messageContent}`;

    let data = {sender: "bot", message: messageContent};

    fetch("../../php/chat-send.php", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Message has been sent. response:", res);
    });
  }

  static async chooseBotResponse(userInput) {
    var options = [];
    var responses = [];

    responses = [
      "Opa! Tudo bem? Como eu posso ajudar?",
      "Olá! Como posso ajudar?",
      "Olá! Tudo bem? Como posso ajudar?"
    ]
    var randomElement = responses[Math.floor(Math.random() * responses.length)];
    options = ["oi", "ola", "tudo bem?", "oii"]
    if (options.some(option => userInput.includes(option))) {
      await this.sendBotMessage(randomElement);
      return;
    }

    responses = [
      "De nada! Se precisar de algo mais estou aqui para ajudar.",
      "Imagina, qualquer coisa, se precisar de algo mais me avise!",
      "De nada! Precisa de ajuda com algo mais?"
    ]
    var randomElement = responses[Math.floor(Math.random() * responses.length)];
    options = ["obrigado", "obrigada", "valeu", "vlw", "obg"]
    if (options.some(option => userInput.includes(option))) {
      await this.sendBotMessage(randomElement);
      return;
    }

    options = ["identificar primos", "numeros primos", "numero primo", "primo", "primos"]
    if (options.some(option => userInput.includes(option))) {
      var slidePrimeNumbers = '<a href=\'https://www.canva.com/design/DAGN8k2HU6s/N0-BSoZnXVZIxEUWa1CrPA/edit?utm_content=DAGN8k2HU6s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton\' target="_blank" rel="noopener noreferrer">Slides de Números Primos</a>';

      await this.sendBotMessage(`Vou te enviar os slides para aprender sobre numeros primos! (Link: ${slidePrimeNumbers})`)
      window.open(slidePrimeNumbers, '_blank');

      return;
    }

    options = ["limpar chat", "limpar"]
    if (options.includes(userInput)) {
      this.clearMessageFile();
      return;
    }

    responses = [
      "Não entendi, tente enviar algum comando disponível.",
      "Não consegui entender esse comando, tente um disponível.",
      "Tente algum comando existente.",
      "Não consegui entender.",
      "Esse comando não está disponível."
    ]
    var randomElement = responses[Math.floor(Math.random() * responses.length)];
    await this.sendBotMessage(randomElement);
  }

  static clearMessageFile() {
    fetch("../../php/clear-messages.php")
      .then(res => res.text())
      .then(console.log);
  }
}
