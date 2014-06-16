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
            exercise.setStartBtnClick();

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