<?php
    require_once("config.php");

    $result = getLastLineCsv($MESSAGES_CSV_FILE_PATH);

    header('Content-Type: application/json');
    echo json_encode($result);
?>