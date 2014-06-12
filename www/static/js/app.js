(function () {
	'use strict';

    var sensors = {
        accelerometer: null
    }

	var controller = {
		init: function () {
            sensors.accelerometer = new Accelerometer();

			navigator.splashscreen.hide();
		}, update: function() {

			setInterval(function() {
				if(sensors.accelerometer.breakpoint) {


					sensors.accelerometer.breakpoint = false;
				}
			}, 500);
        } 
	};

	document.addEventListener("deviceready", controller.init, false);
})();
      