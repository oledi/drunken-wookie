(function () {
	'use strict';

	var exercise = null;

    var sensors = {
        accelerometer: null
    }

	var controller = {
		init: function () {
            sensors.accelerometer = new Accelerometer();
            exercise = new Exercise(sensors.accelerometer);

			navigator.splashscreen.hide();
		}, update: function() {

			setInterval(function() {
				if(sensors.accelerometer.breakpoint) {


					sensors.accelerometer.breakpoint = false;
				}
			}, 500);
        }, clickEvents: function() {
        		 $('.btn_start').click(function(){
			   	 $('.btn_start').toggle();
				 $('.btn_stop').toggle();
			 });

			 $('.btn_stop').click(function(){
			   	$('.btn_start').toggle();
				$('.btn_stop').toggle();
					 
				$('.pages').hide();
				$('#page2').show();
			 });
        }
	};

	document.addEventListener("deviceready", controller.init, false);
})();