<?php
if(!$_POST) exit;

$name     = $_POST['name'];
$phone    = $_POST['phone'];
$email    = $_POST['email'];
$comment  = $_POST['comment'];

$address = "marketing@bit-it.ru, aleynikov.oleg@gmail.com";

$subject = 'Запрос с сайта БИТ Аудитор';
$e_subject = '=?utf-8?B?'.base64_encode($subject).'?=';

$msg = "С формы сообщения на лэндинге пишет $name" . PHP_EOL .
	   'Тел.: '.$phone."\n".
	   "Email: $email"."\n".
	   "Комментарий: $comment";

$headers = "From: no-reply@bit-it.ru" . PHP_EOL;
$headers .= "Reply-To: $email" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

echo mail($address, $e_subject, $msg, $headers); 
?>