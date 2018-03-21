<?php
  opcache_reset();
  require_once __DIR__ . '/vendor/autoload.php';
  require_once __DIR__ . '/inc/db.class.php';
  $db = new Database();


  $uniid = uniqid();

  $ganador = $db->isGanador($uniid);
  echo $ganador;
 ?>
