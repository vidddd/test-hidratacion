define(['auxiliares'], function(aux){

	var _initWebcam = function () {
    var video = aux.getVideo();
		var canvas = aux.getCanvas();
		var context = canvas.getContext('2d');
    var mediaConfig =  { video: true };
    var isWebcam = false;
    var errBack = function(e) {
      alert('An error has occurred!   '+e);
    };

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
           video.src = window.URL.createObjectURL(stream);

					// video.src = stream;
            video.play(); isWebcam = true;
        }, errBack);
    }
    else if(navigator.getUserMedia) { // Standard
        //alert('2');
        navigator.getUserMedia(mediaConfig, function(stream) {
          video.src = stream;
          video.play(); isWebcam = true;
        }, errBack);
      } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        //alert('3');
        navigator.webkitGetUserMedia(mediaConfig, function(stream){
          video.src = window.webkitURL.createObjectURL(stream);
          video.play(); isWebcam = true;
        }, errBack);
      } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
        //alert('4');
        navigator.mozGetUserMedia(mediaConfig, function(stream){
          video.src = window.URL.createObjectURL(stream);
          video.play(); isWebcam = true;
        }, errBack);
      } else {
        alert('Your browser not support web cam api');
      }

			setInterval(function(){
				console.log(isWebcam);


			}, 1400);


/*
			setInterval(function(){
				console.log(isWebcam);
						if(isWebcam) {
							 context.drawImage(video, 0, 0, 480, 480);
							 var imgData = context.getImageData(10,10,380,430);
							// alert(imgData.data.length);
							 // hay 820800 / 4
							 muestras = [];
							 for (var i=0;i<imgData.data.length;i+=400)
								 {
									let avg = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
									muestras.push(""+parseInt(avg));
								 }

								aux.getPres().innerHTML = "Paragraph changed!  "+ muestras[1];
									if(muestras[1] != 0) {
										var max = Math.max.apply(this, muestras);
										var min = Math.min.apply(this, muestras);
										var diff = max - min;
								//  alert("Max: "+max+" Min: "+min+ " Difff: "+ diff);
										if (diff <= 75) {
											alert('HOLA  !!!!!!!!!!!!!!!!!!!!!'+ diff);
										}
								}
							}
					 }, 1400);

		 }, false);*/


	};

	return {
		initWebcam: _initWebcam
	};

});
