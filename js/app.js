
/*
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/libs',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
  /*  paths: {
        app: '../app'
    }
});
*/
// Start the main app logic.
require(['webcam'], function(web){
	// accedemos a la funcion que expone el modulo app
	web.initWebcam();

});
