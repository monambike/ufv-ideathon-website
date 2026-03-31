<?php
    include("config.php");

    $name = htmlentities($_POST["login--name"]);
    $email = htmlentities($_POST["login--email"]);
    $institution = htmlentities($_POST["login--institution"]);

    $GUID = generateGUID()
    $current_time = new DateTime()

    $msg = "{$GUID};{$name};{$email};{$institution};{$current_time};";

    file_put_contents($FILE_PATH, $msg, FILE_APPEND)

    function generateGUID() {
        return bin2hex(random_bytes(16));
    }
?>
