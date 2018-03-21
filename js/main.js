
$( document ).ready(function() {
    $('#comenzar').click(function(){
      $('#comenzard').hide(); $('#webcam').show();
      webcam();
    });

    $('#ganado').click(function(){
       // si viene un 0 no es, sino viene el id de ganador
       $.get("ajax.php", function(data, status){
             res = data;
             // console.info(res);
             if(res == 0) {
                $('#result').hide(); $('#ooooh').show();
             } else {
               $('#result').hide(); $('#formpremio').show();$('#uniid').val(res); $('.premioo').html(res);
             }
             //alert("Data: " + data + "\nStatus: " + status);
         });
    });
});


function webcam() {
          // Grab elements, create settings, etc.
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      const video = document.querySelector('video');
      var muestras = []; // array de muestras
      const constraints =  { video: true };
      var isWebcam = false;

      function handleSuccess(stream) {
        video.srcObject = stream;
        isWebcam = true;
      }

      function handleError(error) {

        if(error.name == 'NotAllowedError') {
          //console.error(error.name);
          alert(error.name);
        } else {
          // NotReadableError
            //console.log('Reeeejected!', error.name);
            alert('Reeeejected!', error.name);
        }
      }

      navigator.mediaDevices.getUserMedia(constraints).
        then(handleSuccess).catch(handleError);

        setInterval(function(){
              if(isWebcam) {
                 context.drawImage(video, 0, 0, 480, 480);
                 var imgData=context.getImageData(10,10,380,430);
                // alert(imgData.data.length);
                 // hay 820800 / 4
                 muestras = [];
                 for (var i=0;i<imgData.data.length;i+=400)
                   {
                    let avg = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
                    muestras.push(""+parseInt(avg));
                   }
                    if(muestras[1] != 0) {
                      var max = parseInt(Math.max.apply(this, muestras));
                      var min = parseInt(Math.min.apply(this, muestras));
                      var diff = max - min;
                    //  alert("Max: "+max+" Min: "+min+ " Difff: "+ diff);
                    document.getElementById("pres").innerHTML = "Paragraph changed!  "+ diff;
                      if (diff <= 75) {
                        $('#webcam').hide(); $('#result').show(); isWebcam = false;
                        $('.hidra').html(diff); video.pause(); video.src='';

                        //alert('HOLA  !!!!!!!!!!!!!!!!!!!!!'+ diff);
                      }
                  }
                }
             }, 1400);
}

function validate() {

  if($('#nombre') == '' || $('#apellidos') == '' || $('#direccion') == '' || $('#direccion') == '' || $('#cp') == '' || $('#poblacion') == '' || $('#provincia') == '' || $('#dni') == '' || $('#edad') == '' || $('#email') == '' || $('#telefono') == '') {
    alert('Debes introducir todos los campos'); return false;
  }
  var email = $("#email").val();
   if ((/(.+)@(.+){2,}\.(.+){2,}/.test(email)) || email=="" || email==null) { } else {
       alert("Introduce una direccion de email valida");
       return false;
   }

  return true;

}

function isGanador() {
  let res;
}
