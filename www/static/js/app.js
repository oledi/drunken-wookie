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

        } 
	};

	document.addEventListener("deviceready", controller.init, false);
})();
      