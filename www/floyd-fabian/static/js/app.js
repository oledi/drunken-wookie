(function () {
	'use strict';

	/**
	* Test
	*/
	var exercise = null;
	

    var sensors = {
        accelerometer: null
    }

    var localStorage = { 
	    setExercises: function() {
	   		if ('localStorage' in window && window['localStorage'] !== null) {
              	try {
	              	for( var i = 0; i<localStorage.length; i++){
	              		var retrievedObject = JSON.parse(localStorage.getItem('oefening'+i));
	           		   $("#container_oefeningen").append('<a href="#" name=""><div class="container_item"><img src="static/img/'+retrievedObject.url+'" /><h1>'+retrievedObject.name+'</h1></div></a>'); 
	              	}
			    } catch (e) {
			        console.log(e);
			  	}
	    	} else {
	       		console.log('heb ik niet');
	    	}
		}, addExersice: function() {
			try {
				console.log('ja');
              	for( var i = 0; i<localStorage.length; i++){
                }
                
              	var oefeningObject = "oefening" + localStorage.length;
              	
		     	oefeningObject = { 'name': 'Squats', 'url': "squats.jpg" };
		        localStorage.setItem("oefening" + i, JSON.stringify(oefeningObject));
            } catch (e) {
                console.log(e);
            }
		}, cleanLocalstorage: function() {
			localStorage.clear();
		}
	}

	var controller = {
		init: function () {
			$('#page1').show();
            sensors.accelerometer = new Accelerometer();
            exercise = new Exercise(sensors.accelerometer);

			localStorage.setExercises();
            controller.clickEvents();

			navigator.splashscreen.hide();
		}, clickEvents: function() {
        	$(".addExcersiceBtn").click(function() {
        		localStorage.addExersice();
        	});

        	$(".deleteExcersis").click(function() {
        		localStorage.cleanLocalstorage();
        	});

        	$('.btn_start').click(function(){
			   	$('.btn_start').toggle();
				$('.btn_stop').toggle();

				exercise.startRecord();
			});

			$('.btn_stop').click(function(){
			   	$('.btn_start').toggle();
				$('.btn_stop').toggle();
				
				exercise.saveRecord();
			
				// $('.pages').hide();
				// $('#page2').show();
			});

			$('#page1').show();
	
			$('#page2 #bgcontainer_menu').click(function(){
				
			   	$('.pages').hide();
				$('#page1').show();
					 
			    return false;
			});

			$('#page3 #bgcontainer_menu').click(function(){
				
			   	$('.pages').hide();
				$('#page2').show();
					 
			    return false;
			});
			
			$('#page1 a').click(function(){
				
			   	$('.pages').hide();
				$('#page2').show();
					 
					 return false;
			});
			
			$('#page2 a').click(function(){
				
			   	$('.pages').hide();
				$('#page3').show();
					 
			    return false;
			});
        }
	};

	document.addEventListener("deviceready", controller.init, false);
})();