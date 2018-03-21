define(function(){
	////////////////////////////
	// FUNCIONES AUXILIARES
	////////////////////////////

	//Obtener referencias a elementos del DOM
	var canvas = null;
	var video = null;

	var _getCanvas = function () {
		if (canvas == null)
			canvas = document.getElementById("canvas");
		return canvas;
	};

	var _getVideo = function () {
		if (video == null)
			video = document.getElementById("video");
		return video;
	};

	var _getPres = function () {
		if (video == null)
			pres = document.getElementById("pres");
		return pres;
	};

	return {
		getCanvas: _getCanvas,
		getVideo: _getVideo,
		getPres: _getPRes
	};
});
