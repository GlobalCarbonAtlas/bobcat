<?php

$mailTo = $_POST['emailTo'];
$mailArray = explode(",", $mailTo);
$mailFrom = $_POST['emailFrom'];
$subject = $_POST['subject'];
$message = $_POST['message'];

//mail($mailTo, $subject, $message, "From: ".$mailFrom);

//$bob = $_FILES['file']['tmp_name'];

// include and start phpmailer
require_once('PHPMailer_5.2.4/class.phpmailer.php');
$mail = new PHPMailer();

//Deal with the email
$mail->From = $mailFrom;
for($i=0;$i<sizeof($mailArray);$i++)
{
    $mail->AddAddress($mailArray[$i]);
}

$mail->Subject = $subject;
$mail->Body = $message;

$mail->AddAttachment('img/addChamp.png');      // attachment
$mail->AddAttachment('metadataAccess.php'); // attachment

$mail->Send();

?>