<?php
    require_once("config.php");
    require_once("utils.php");

    $name = htmlentities($_POST["name"]);
    $email = htmlentities($_POST["email"]);
    $institution = htmlentities($_POST["institution"]);

    $GUID = generateGUID();
    $current_time = getTimeNow();

    $login = "{$GUID};{$current_time};{$institution};{$name};{$email};\n";

    file_put_contents($USERS_CSV_FILE_PATH, $login, FILE_APPEND);

    require_once("clear-messages.php");

    echo
    '<script>
      window.open("../chat.html", "_self");
    </script>';
?>
