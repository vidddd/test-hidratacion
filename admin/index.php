<?php
if($_SERVER["HTTPS"] != "on"){ header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
  }
session_start();
opcache_reset();
error_reporting(E_ALL);
require_once '../vendor/autoload.php';
require_once '../inc/config.php';

$loader = new Twig_Loader_Filesystem('templates/');
$twig = new Twig_Environment($loader, array());
require_once '../inc/db.class.php';
$db = new Database();
    $images = $db->getSocials(1);

if (isset($_POST['username']) and isset($_POST['password'])){
//3.1.1 Assigning posted values to variables.
$username = $_POST['username'];
$password = $_POST['password'];

 if($db->existeUser($username, $password)) {
    $_SESSION['username'] = $username;
    $_SESSION['password'] = $password;
   echo $twig->render('index.html', array('images' => $images));

 } else {
     echo $twig->render('login.html', array('mensaje' => 'Usuario o password incorrectos'));
 }

}else{

  if($db->existeUser($_SESSION['username'], $_SESSION['password'])) {
    echo $twig->render('index.html', array('images' => $images));

  } else {
  echo $twig->render('login.html', array());
  }
}
