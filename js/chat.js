$(document).ready(function(){
  const $CHAT_LOG_FILE_PATH = "../data/message_log.csv"

  const $chatBox = $("#chat-box");
  const $sendButton = $("#chat-input-button");

  // Setting events on controls
  $sendButton.on("click", handleSendMessage);

  /**
   * Handles the send message event for the chat input button.
   * @returns false to avoid page reload\
   */
  function handleSendMessage(){
    loadChatLog();
  }

  function formatMessageToHtml(text) {
    if (text.includes("user;")){
      text = text.replace("user;", "")
      text = "<div class=\"user\">" + text + "</div>"
    }

    if (text.includes("bot;")){
      text = text.replace("bot;", "")
      text = "<div class=\"bot\">" + text + "</div>"
    }

    return text
  }

  /**
   * Updating the chat--box without reloading the page using Ajax.
   */
  function loadChatLog(){
    var oldscrollHeight = $chatBox.prop("scrollHeight"); //Tamanho da 'rolagem' antes

    $.ajax({
      url: $CHAT_LOG_FILE_PATH,
      cache: false,
      success: function(html){
        const parsedData = [];

        fullChatBox = ""
        for(let row of html.split("\n").filter(n => n)){
          const rowItems = row.split(";");

          // Getting only the sender (user or bot) and the message content
          senderMessageCsv = rowItems[2] + ";" + rowItems[3];

          // Formatting the CSV message to HTML
          senderMessageHtml = formatMessageToHtml(senderMessageCsv);

          fullChatBox += senderMessageHtml
        }
        console.log(fullChatBox)


        // Inserting the message log into the chatbox
        $chatBox.html(fullChatBox);

        // Retrieving how much will necessary to scroll to the top after
        // loading the data
        var newscrollHeight = $chatBox.prop("scrollHeight");

        // Scrolls to the necessary amount
        if(newscrollHeight > oldscrollHeight){
          $chatBox.animate({ scrollTop: newscrollHeight }, 'normal');
        }
      },
    });
  }
  setInterval (loadChatLog, 500);
});
