import Config from "./../config/configs.js"
import TextFormatting from "./../utils/text-formatting.js";

export default class ChatBot {
  static async requestBotResponse() {
    var lastBotMessage = this.getLastBotMessage();

    var rowItems = await this.getLastMessage();
    var userInput = rowItems[3];

    if (rowItems === undefined || rowItems[2] == "bot") return

    if (lastBotMessage !== undefined){
      var normalizedLastBotMessage = TextFormatting.normalizeText(lastBotMessage);
    }

    var normalizedUserInput = TextFormatting.normalizeText(userInput);

    var optionExit = ["sair", "parar"]
    if (normalizedLastBotMessage === undefined || optionExit.includes(normalizedUserInput)) {
      await this.sendBotMessage("Olá estudante, Como posso ajudar?");
      return;
    }

    var optionPrime = ["identificar primos", "numeros primos", "numero primo", "primo", "primos"]
    if (optionPrime.includes(normalizedUserInput)) {
      slidePrimeNumbers = 'https://www.canva.com/design/DAGN8k2HU6s/N0-BSoZnXVZIxEUWa1CrPA/edit?utm_content=DAGN8k2HU6s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
      window.open(slidePrimeNumbers, '_blank');
      return;
    }

    await this.sendBotMessage("Não entendi, tente enviar algum comando disponível.");
  }

  static async getLastMessage() {
    try {
      const res = await fetch(Config.$CHAT_LOG_FILE_PATH);
      const text = await res.text();

      const data = text.split("\n").filter(n => n);
      const lastMessage = data[data.length - 1];

      const rowItems = lastMessage.split(";").filter(n => n);

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
          var data = text.split("\n").filter(n => n);
          var lastBotMessage = data[data.length - 2];
          
          const rowItems = lastBotMessage.split(";");

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
}
