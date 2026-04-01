<?php
    include("config.php");
    include("utils.php");

    $name = htmlentities($_POST["name"]);
    $email = htmlentities($_POST["email"]);
    $institution = htmlentities($_POST["institution"]);

    $GUID = generateGUID();
    $current_time = date("Y-m-d H:i:s");

    $login = "{$GUID};{$current_time};{$institution};{$name};{$email};\n";

    file_put_contents($USERS_CSV_FILE_PATH, $login, FILE_APPEND);

    echo
    '<script>
      window.open("../chat.html", "_self");
    </script>';
?>
