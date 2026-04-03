/**************************************************************************
Copyright(c) 2026 UFV - Universidade Federal de Viçosa. All rights reserved.
Project from: Davi Atayde, Maria Eduarda Neves, Vinícius Gabriel.
For license information, please see the LICENSE file in the root directory.
**************************************************************************/

import ChatBot from "./chat-bot.js";

export default class ChatBotRequest {
  static async request(input, options, responses) {
    if (responses == null) return false;

    if (options.some(option => input.includes(option))) {
      var randomElement = responses[Math.floor(Math.random() * responses.length)];

      await ChatBot.sendBotMessage(randomElement);
      return true;
    }
    return false;
  }

  static systemClearChat(input) {
    var options = ["limpar chat", "limpar"]

    if (options.includes(input)) {
      ChatBot.clearMessageFile();

      return true;
    }
    return false;
  }

  static async systemCommandNotFound() {
    var responses = [
      "Não entendi, tente enviar algum comando disponível.",
      "Não consegui entender esse comando, tente um disponível.",
      "Tente algum comando existente.",
      "Não consegui entender.",
      "Esse comando não está disponível."
    ]

    var randomElement = responses[Math.floor(Math.random() * responses.length)];

    await ChatBot.sendBotMessage(randomElement);
  }

  static async talkHello(input) {
    var options = ["oi", "ola", "tudo bem?", "oii"];

    var responses = [
      "Opa! Tudo bem? Como eu posso ajudar?",
      "Olá! Como posso ajudar?",
      "Olá! Tudo bem? Como posso ajudar?"
    ];

    var response = await this.request(input, options, responses);

    return response;
  }

  static async talkThankYou(input) {
    var options = ["obrigado", "obrigada", "valeu", "vlw", "obg"]

    var responses = [
      "De nada! Se precisar de algo mais estou aqui para ajudar.",
      "Imagina, qualquer coisa, se precisar de algo mais me avise!",
      "De nada! Precisa de ajuda com algo mais?"
    ]

    var response = this.request(input, options, responses);

    return response;
  }

  static async learnPrimeNumbers(input) {
    var options = ["identificar primos", "numeros primos", "numero primo", "primo", "primos"]

    var slidePrimeNumbers = '<a href=\'https://www.canva.com/design/DAGN8k2HU6s/N0-BSoZnXVZIxEUWa1CrPA/edit?utm_content=DAGN8k2HU6s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton\' target="_blank" rel="noopener noreferrer">Slides de Números Primos</a>';
    
    var responses = [
      `Vou te enviar os slides para aprender sobre numeros primos! (Link: ${slidePrimeNumbers})`
    ];

    var response = this.request(input, options, responses);

    return response;
  }
}
