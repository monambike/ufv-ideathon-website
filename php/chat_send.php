<?php  
    include("config.php");
    include("utils.php");

    $GUID = generateGUID();
    $current_time = date("Y-m-d H:i:s");

    $input = "{$GUID};{$current_time};user;" .htmlentities($_POST["message"]) . ";\n";

    file_put_contents($MESSAGES_CSV_FILE_PATH, $input, FILE_APPEND);

    echo
    '<script>
      window.open("../chat.html", "_self");
    </script>';
?>
