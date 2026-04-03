<?php
    /**************************************************************************
    Copyright(c) 2026 UFV - Universidade Federal de Viçosa. All rights reserved.
    Project from: Davi Atayde, Maria Eduarda Neves, Vinícius Gabriel.
    For license information, please see the LICENSE file in the root directory.
    **************************************************************************/

    require_once("config.php");

    $result = getLastLineCsv($MESSAGES_CSV_FILE_PATH);

    header('Content-Type: application/json');
    echo json_encode($result);
?>
