<?php

$mailTo = $_POST['emailTo'];
$mailArray = explode( ",", $mailTo );
$mailFrom = $_POST['emailFrom'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$messageEnd = $_POST['messageEnd'];
$fileList = $_POST["fileList"];
$fileArray = explode( ",", $fileList );

// include and start phpmailer
require_once( 'PHPMailer_5.2.4/class.phpmailer.php' );
$mail = new PHPMailer( );

//Deal with the email
$mail->From = $mailFrom;

// Addresses
for( $i = 0; $i < sizeof( $mailArray ); $i++ )
    $mail->AddAddress( $mailArray[$i] );

// Files
for( $i = 0; $i < sizeof( $fileArray ); $i++ )
{
    $message = $message." ".$fileArray[$i];
    $mail->AddAttachment( $fileArray[$i] );
}

$mail->Subject = $subject;
$mail->Body = $message."\n\n".$messageEnd;

$mail->Send( );

?>