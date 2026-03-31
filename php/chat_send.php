<?php  
    include("config.php")

    $input = htmlentities($_POST["login"]);

    $msg = "test1;test2;test3;" + new DateTime();

    file_put_contents($FILE_PATH, $msg, FILE_APPEND);
?>
