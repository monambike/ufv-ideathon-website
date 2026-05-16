<?php
    /**************************************************************************
    Copyright(c) 2026 UFV - Universidade Federal de Viçosa. All rights reserved.
    Project from: Davi Atayde, Maria Eduarda Neves, Vinícius Gabriel.
    For license information, please see the LICENSE file in the root directory.
    **************************************************************************/

    require_once("config.php");
    require_once("utils.php");

    $lastLineCsv = getLastLineCsv($USERS_CSV_FILE_PATH);
    $studentName = $lastLineCsv[3];

    $message = "Olá estudante {$studentName} 👋,<br> Como posso ajudar?";
    $sender = "bot";

    $GUID = generateGUID();
    $current_time = getTimeNow();

    $input = "{$GUID};{$current_time};{$sender};\"{$message}\";\n";

    file_put_contents($MESSAGES_CSV_FILE_PATH, $input, LOCK_EX);
?>
