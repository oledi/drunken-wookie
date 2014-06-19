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

            controller.clickEvents();
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

				exercise.startRecord();
			});

			$('.btn_stop').click(function(){
			   	$('.btn_start').toggle();
				$('.btn_stop').toggle();
				
				exercise.saveRecord();

//				$('.pages').hide();
//				$('#page2').show();
			});

//			$('#page1').show();
	
//			$('#page2 #bgcontainer_menu').click(function(){
//
//			   	$('.pages').hide();
//				$('#page1').show();
//
//			    return false;
//			});
//
//			$('#page3 #bgcontainer_menu').click(function(){
//
//			   	$('.pages').hide();
//				$('#page2').show();
//
//			    return false;
//			});
//
//			$('#page1 a').click(function(){
//
//			   	$('.pages').hide();
//				$('#page2').show();
//
//					 return false;
//			});
//
//			$('#page2 a').click(function(){
//
//			   	$('.pages').hide();
//				$('#page3').show();
//
//			    return false;
//			});
        }
	};

	document.addEventListener("deviceready", controller.init, false);
})();