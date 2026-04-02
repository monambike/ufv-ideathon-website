<?php
    function generateGUID() {
        return bin2hex(random_bytes(16));
    }

    function getTimeNow() {
        $current_time = new DateTime("now", new DateTimeZone("America/Sao_Paulo"));

        $formatted_current_time = $current_time -> format("Y-m-d H:i:s");

        return $formatted_current_time;
    }
?>