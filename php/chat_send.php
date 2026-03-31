<?php  
    include("config.php");

    $input = "\n" . "user;" .htmlentities($_POST["message"]);

    file_put_contents($FILE_PATH, $input, FILE_APPEND);

		echo
		'<script>
			window.open("../index.html", "_self");
		</script>';
?>
