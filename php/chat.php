<?php
    include("config.php");

    $file = fopen($FILE_PATH, "r");

    foreach($content as $line){
      echo "<div><p><b>{$data[1]}:</b> {$data[2]}</p></div><br>\n";
        while (($data = fgetcsv($file)) !== false) {
            
        }
    }

    fclose($file);
?>
