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
    var optionExit = ["sair", "parar", "voltar", "menu", "home", "inicio"]
    if (optionExit.includes(userInput)) {
      await this.sendBotMessage("Olá estudante, Como posso ajudar?");
      return;
    }

    var optionPrime = ["identificar primos", "numeros primos", "numero primo", "primo", "primos"]
    if (optionPrime.includes(userInput)) {
      var slidePrimeNumbers = 'https://www.canva.com/design/DAGN8k2HU6s/N0-BSoZnXVZIxEUWa1CrPA/edit?utm_content=DAGN8k2HU6s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';

      await this.sendBotMessage(`Vou te enviar os slides para aprender sobre numeros primos! (Link: ${slidePrimeNumbers})`)
      window.open(slidePrimeNumbers, '_blank');

      return;
    }

    var optionPrime = ["limpar chat", "limpar"]
    if (optionPrime.includes(userInput)) {
      this.clearMessageFile();
      return;
    }

    var responses = [
      "Não entendi, tente enviar algum comando disponível.",
      "Não consegui entender esse comando, tente um disponível.",
      "Tente algum comando existente.",
      "Não consegui entender.",
      "Esse comando não está disponível."
    ]
    const randomElement = responses[Math.floor(Math.random() * responses.length)];
    await this.sendBotMessage(randomElement);
  }

  static clearMessageFile() {
    fetch("../../php/clear-messages.php")
      .then(res => res.text())
      .then(console.log);
  }
}
