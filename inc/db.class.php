<?php
  opcache_reset();
require_once __DIR__ . '/config.php';

class Database{
    private $db;
    public function __construct()
    {
        $this->db = new MysqliDb (HOST,USER,PASSWORD,DATABASE);
    }

    public function isGanador($uniid) {
        $horaactual = date('G');
        $diaactual = date('Y-m-d');

        $ents = $this->db->rawQueryOne('select * from ganadores where dia=?', Array($diaactual));
        if(!empty($ents)){
            return 0;
        } else {
            // hasta las 9 de la mañana no hay premios
            if($horaactual >= HORA_PREMIO) {
              $this->insertPreGanador($diaactual,$uniid);
              return $uniid;
            }
            else return 0;
        }

    }

    private function insertPreGanador($dia,$uniid){
      $data = Array ("dia" => $dia, "uniid" => $uniid );

        $id = $this->db->insert ('ganadores', $data);
        if($id){
             return $id;
        } else {
            echo 'insert failed: ' . $this->db->getLastError(); die;
        }
    }
    public function getSocials($pag){
          $this->db->orderBy("id","desc");
          $this->db->page = $pag;
          // set page limit to 2 results per page. 20 by default
          $this->db->pageLimit = 20;
          //$this->db->where("estado", 2);
           $ciudades = $this->db->paginate('social_networks', $pag );

           return $ciudades;
        }

    public function updateGanadorUniid($uniid, $nombre, $apellidos, $direccion, $cp, $poblacion, $provincia, $dni, $edad, $email, $telefono) {

      $data = Array (
            "date" => date("Y-m-d h:i:sa"),
          	'nombre' => $nombre,
          	'apellidos' => $apellidos,
          	'direccion' => $direccion,
            'cp' => $cp,
            'poblacion' => $poblacion,
            'provincia' => $provincia,
            'dni' => $dni,
            'edad' => $edad,
            'email' => $email,
            'telefono' => $telefono
          );
          $this->db->where ('uniid', $uniid);
          if ($this->db->update ('ganadores', $data))
              echo $this->db->count . ' records were updated';
          else
              echo 'update failed: ' . $this->db->getLastError();

    }
    public function existeUniid($uniid) {
           $ents = $this->db->rawQueryOne('select * from ganadores where uniid=?', Array($uniid));
           if(!empty($ents)){
               return true;
           } else {
               return false;
           }
    }
    public function existeUser($username, $password) {
      $ents = $this->db->rawQueryOne('select * from user where username=? AND password=?', Array($username, $password));
      if(!empty($ents)){
          return true;
      } else {
          return false;
      }
    }

    /*
      public function getBuscarParticipaciones($txt){
                $this->db->orderBy("id","desc");
                $this->db->where("estado", 2);
                $this->db->where('nombre LIKE ?', array("%".$txt."%"));
                $this->db->orWhere('apellidos LIKE ?', array("%".$txt."%"));
                $this->db->page = 1;
                  // set page limit to 2 results per page. 20 by default
                $this->db->pageLimit = 6;
                $ciudades = $this->db->paginate('participaciones',1);
                if($this->db->count > 0) $ciudades[0]['total']=$this->db->totalPages;
              //  print_r($this->db->getLastQuery()); die;
                 return $ciudades;
              }



    public function hayGafasPrincesa() {
        $this->db->where("premio", "gafas_princesa");
        $this->db->get("participaciones");
        if($this->db->count == 50) {
                mail('david.alvarez@tbwa.com, rebeca.garrobo@tbwa.com, diana.benito@tbwa.com','HORA DE AVENTURAS APP', 'Se han entregado 50 gafas Princesa');
        }
        if($this->db->count < PRINCESA) {
          return 1;
        } else {
          return 0;
        }
    }
    */
}
