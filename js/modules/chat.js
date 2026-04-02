import Config from "./../config/configs.js"

$(document).ready(function(){
  const $chatBox = $("#chat-box");
  const $sendButton = $("#chat-input-button");

  // Setting events on controls
  $sendButton.on("click", handleOnClickSendMessage);

  /**
   * Handles the click send message event for the chat input button.
   */
  function handleOnClickSendMessage(){
    refreshChatLog();
  }

  /**
   * Updates the ChatBox without reloading the page using Ajax.
   */
  function refreshChatLog(){
    var scrollHeight = $chatBox.prop("scrollHeight");

    $.ajax({
      url: Config.$CHAT_LOG_FILE_PATH,
      cache: false,
      success: function(html){
        // Converting whole chat csv to html
        var fullChatBox = convertChatCsvToHtml(html);

        // Inserting the message log into the chatbox
        $chatBox.html(fullChatBox);

        // Scrolling chat to the bottom
        scrollChatToBottom(scrollHeight);
      },
    });
  }

  /**
   * Converts the csv text message from CSV to HTML.
   * @param {*} text The message text context as csv.
   * @returns The message text content formatted as HTML.
   */
  function formatCsvMessageToHtml(text) {
    if (text.includes("user;")) {
      text = text.replace("user;", "");
      text = `<div class="user">${text}</div>`;
    }

    if (text.includes("bot;")) {
      text = text.replace("bot;", "");
      text = `<div class="bot">${text}</div>`;
    }

    return text;
  }

  /**
   * Converts whole ChatBox content from csv to html.
   * @param {*} html The ChatBox content to be converted as HTML.
   * @returns The converted chat content as HTML.
   */
  function convertChatCsvToHtml(html){
    var fullChatBox = "";
    var data = html.split("\n").filter(n => n);

    for(let row of data) {
      const rowItems = row.split(";");

      // Getting only the sender (user or bot) and the message content
      var senderMessageCsv = `${rowItems[2]};${rowItems[3]}`;

      // Formatting the CSV message to HTML
      var senderMessageHtml = formatCsvMessageToHtml(senderMessageCsv);

      fullChatBox += senderMessageHtml;
    }

    return fullChatBox;
  }

  /**
   * Scrolls the ChatBox to the bottom using the previous height.
   * @param {*} previousScrollHeight Previous scroll height before any change is made to the ChatBox.
   */
  function scrollChatToBottom(previousScrollHeight){
    // Retrieving how much will necessary to scroll to the top after
    // loading the data
    var newHeight = $chatBox.prop("scrollHeight");

    // Scrolls to the necessary amount
    if(newHeight > previousScrollHeight){
      $chatBox.animate({ scrollTop: newHeight }, 'normal');
    }
  }

  /**
   * Retrieves the last bot message in CSV message data file.
   */
  function retrieveLastBotMessage(){
    fetch(Config.$CHAT_LOG_FILE_PATH)
      .then((res) => res.text())
      .then((text) => {
          var data = text.split("\n").filter(n => n);

          var lastBotMessage = data[data.length - 2];
          
          const rowItems = row.split(";");

          // Getting only the the message content
          var lastMessage = rowItems[3];
          return lastMessage;
      })
      .catch((e) => console.error(e));
  }

  setInterval(refreshChatLog, 500);
});
