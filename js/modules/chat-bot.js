/**************************************************************************
Copyright(c) 2026 UFV - Universidade Federal de Viçosa. All rights reserved.
Project from: Davi Atayde, Maria Eduarda Neves, Vinícius Gabriel.
For license information, please see the LICENSE file in the root directory.
**************************************************************************/

import ChatBotRequest from "./chat-box-request.js";
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

      return rowItems;
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
    if (await this.chooseBotResponseTalk(userInput)) return true;

    if (ChatBotRequest.systemClearChat(userInput)) return;

    ChatBotRequest.systemCommandNotFound();
  }

  static async chooseBotResponseTalk(userInput) {
    if (await ChatBotRequest.talkHello(userInput)) return true;

    if (await ChatBotRequest.talkThankYou(userInput)) return true;

    if (await ChatBotRequest.learnPrimeNumbers(userInput)) return true;
    
    return false;
  }

  static clearMessageFile() {
    fetch("../../php/clear-messages.php")
      .then(res => res.text())
      .then(console.log);
  }
}
