$(document).ready(function(){
  const CHAT_LOG_FILE_PATH = "../../php/message_log.csv"

  const $chatBox = $("#chat--box");
  const $chatInput = $("#chat--input");
  const $sendButton = $("#chat--send");

  // Setting events on controls
  $sendButton.on("click", handleSendMessage);

  function handleSendMessage(){
    // Retrieving the data from the input
		var message = $("#chat--input").val();

    if (!message) return false;

    // Posting the data using php.
		sendMessage(message)

    // Clearing the chat input.
		$chatInput.val("");

		// loadChatLog;

		return false
  }

  function sendMessage(message) {
    $.post(CHAT_LOG_FILE_PATH, { text: message });
  }

	/**
   * Updating the chat--box without reloading the page using Ajax.
   */
	function loadChatLog(){
		var oldscrollHeight = $("#chat--box").prop("scrollHeight"); //Tamanho da 'rolagem' antes

		$.ajax({
			url: CHAT_LOG_FILE_PATH,
			cache: false,
			success: function(html){
        // Inserting the message log into the chatbox
				$("#chat--box").html(html);

        // Retrieving how much will necessary to scroll to the top after
        // loading the data
				var newscrollHeight = $("#chat--box").prop("scrollHeight");

        // Scrolls to the necessary amount
				if(newscrollHeight > oldscrollHeight){
					$("#chat--box").animate({ scrollTop: newscrollHeight }, 'normal');
				}
			},
		});
	}
	setInterval (loadChatLog, 500); //2500
});
