<?php
    function generateGUID() {
        return bin2hex(random_bytes(16));
    }
?>