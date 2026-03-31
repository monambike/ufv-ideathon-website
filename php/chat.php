<?php
    include("config.php")

    $file = fopen($FILE_PATH, "r");

    while (($data = fgetcsv($file)) !== false) {
        echo "<div><p><b>{$data[1]}:</b> {$data[2]}</p></div>";
    }

    fclose($file);
?>
