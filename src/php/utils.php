<?php
    /**************************************************************************
    Copyright(c) 2026 UFV - Universidade Federal de Viçosa. All rights reserved.
    Project from: Davi Atayde, Maria Eduarda Neves, Vinícius Gabriel.
    For license information, please see the LICENSE file in the root directory.
    **************************************************************************/

    function generateGUID() {
        return bin2hex(random_bytes(16));
    }

    function getTimeNow() {
        $current_time = new DateTime("now", new DateTimeZone("America/Sao_Paulo"));

        $formatted_current_time = $current_time -> format("Y-m-d H:i:s");

        return $formatted_current_time;
    }

    function getFileCsvAsJson($filePath) {
      $file = fopen($filePath, 'r');
      $data = [];

      if ($file) {
          flock($file, LOCK_SH);

          while (($line = fgetcsv($file)) !== false) {
              $data[] = $line;
          }

          flock($file, LOCK_UN);
          fclose($file);
      }

      header('Content-Type: application/json');
      echo json_encode($data);
    }

    function getLastLineCsv($filePath) {
        $file = fopen($filePath, 'r');

        if (!$file) return null;

        flock($file, LOCK_SH);

        $lastLine = null;
        while (($line = fgetcsv($file, 0, ";", '"')) !== false) {
            $lastLine = $line;
        }

        flock($file, LOCK_UN);
        fclose($file);

        return $lastLine;
    }
?>