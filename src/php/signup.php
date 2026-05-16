<?php
    /**************************************************************************
    Copyright(c) 2026 UFV - Universidade Federal de Viçosa. All rights reserved.
    Project from: Davi Atayde, Maria Eduarda Neves, Vinícius Gabriel.
    For license information, please see the LICENSE file in the root directory.
    **************************************************************************/

    require_once("config.php");
    require_once("utils.php");

    $name = htmlentities($_POST["name"]);
    $email = htmlentities($_POST["email"]);
    $institution = htmlentities($_POST["institution"]);

    $GUID = generateGUID();
    $current_time = getTimeNow();

    $login = "{$GUID};{$current_time};{$institution};{$name};{$email};\n";

    file_put_contents($USERS_CSV_FILE_PATH, $login, FILE_APPEND);

    // Clearing the ChatBox.
    require_once("clear-messages.php");

    // Redirecting to the Chat page.
    echo
    '<script>
      window.open("../chat.html", "_self");
    </script>';
?>
