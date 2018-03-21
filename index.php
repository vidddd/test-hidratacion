<?php
if($_SERVER["HTTPS"] != "on"){ header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
  }
session_start();
opcache_reset();
error_reporting(E_ALL);
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/inc/config.php';
$loader = new Twig_Loader_Filesystem('templates/');
$twig = new Twig_Environment($loader, array());
require_once __DIR__ . '/inc/db.class.php';
$db = new Database();


if($_POST) {

  $uniid = $_POST['uniid'];
  $nombre = $_POST['nombre'];
  $apellidos = $_POST['apellidos'];
  $direccion = $_POST['direccion'];
  $cp = $_POST['cp'];
  $poblacion = $_POST['poblacion'];
  $provincia = $_POST['provincia'];
  $dni = $_POST['dni'];
  $edad = $_POST['edad'];
  $email = $_POST['email'];
  $telefono = $_POST['telefono'];

  if($db->existeUniid($uniid) && $uniid != '') {
    $db->updateGanadorUniid($uniid, $nombre, $apellidos, $direccion, $cp, $poblacion, $provincia, $dni, $edad, $email, $telefono);
  }
}

echo $twig->render('index.html', array());
