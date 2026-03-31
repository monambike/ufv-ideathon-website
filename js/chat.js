$(document).ready(function(){
  const $CHAT_LOG_FILE_PATH = "../data/message_log.csv"

  const $chatBox = $("#chat--box");
  const $chatInput = $("#chat--input");
  const $sendButton = $("#chat--send");

  // Setting events on controls
  $sendButton.on("click", handleSendMessage);

  /**
   * Handles the send message event for the chat input button.
   * @returns false to avoid page reload\
   */
  function handleSendMessage(){
    // Retrieving the data from the input
    var message = $chatInput.val();

    if (!message) return false;

    // Posting the data using php.
    sendMessage(message)

    // Clearing the chat input.
    $chatInput.val("");

    loadChatLog();

    return false
  }

  function sendMessage(message) {
    $.post($CHAT_LOG_FILE_PATH, { text: message });
  }

  function replace(text) {
    text = text.replace("<user>", "<div class=\"chat-message-user\">")
    text = text.replace("<user>", "</div>")
    text = text.replace("<ai>", "<div class=\"chat-message-ai\">")
    text = text.replace("</ai>", "</div>")
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
        // Inserting the message log into the chatbox
        $chatBox.html(html);

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
