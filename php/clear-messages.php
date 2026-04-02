<?php
    include("config.php");
    include("utils.php");

    $message = "Olá estudante,<br> Como posso ajudar?";
    $sender = "bot";

    $GUID = generateGUID();
    $current_time = getTimeNow();

    $input = "{$GUID};{$current_time};{$sender};\"{$message}\";\n";

    file_put_contents($MESSAGES_CSV_FILE_PATH, $input);
?>
