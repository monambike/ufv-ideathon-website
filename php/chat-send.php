<?php  
    include("config.php");
    include("utils.php");

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    $sender = htmlentities($input['sender'] ?? $_POST['sender']);
    $message = htmlentities($input['message'] ?? $_POST['message']);

    $GUID = generateGUID();
    $current_time = getTimeNow();

    $input = "{$GUID};{$current_time};{$sender};\"{$message}\";\n";

    file_put_contents($MESSAGES_CSV_FILE_PATH, $input, FILE_APPEND);

    echo
    '<script>
      window.open("../chat.html", "_self");
    </script>';
?>
