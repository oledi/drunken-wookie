 var APP = APP || {};

(function () {
	'use strict';

	/**
	* Test
	*/
	var exercise = null;
	

    var sensors = {
        accelerometer: null
    }

    var storage = { 
	    setExercises: function() {
	   		if ('localStorage' in window && window['localStorage'] !== null || typeof(Storage) !== "undefined") {
              	try {
	              	for( var i = 0; i<localStorage.length; i++){
                        var retrievedObject = JSON.parse(localStorage.getItem('oefening'+i));
                        var name = JSON.parse(localStorage.getItem(localStorage.key(i))).name;
                        var url = JSON.parse(localStorage.getItem(localStorage.key(i))).url;
						$("#container_oefeningen").append('<a href="#" name=""><div class="container_item"><img src="static/img/'+url+'" />"<h1>'+name+'</h1></div></a>'); 
                	}	
			    } catch (e) {
			        console.log(e);
			  	}
	    	} else {
	       		console.log('heb ik niet');
	    	}
		}, addExersice: function() {
			try {              
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
	
	
	APP.controller = {
		init: function () {
			$('#page1').show();
        		sensors.accelerometer = new Accelerometer();
            	exercise = new Exercise(sensors.accelerometer);
				storage.setExercises();
        		App.controller.clickEvents();
        		navigator.splashscreen.hide();
		}, clickEvents: function () {
			// More code here
		}
	}
	// var controller = {
	// 	init: function () {
	// 		$('#page1').show();
 //           sensors.accelerometer = new Accelerometer();
 //           exercise = new Exercise(sensors.accelerometer);

	// 		storage.setExercises();
 //           controller.clickEvents();

	// 		navigator.splashscreen.hide();
	// 	}, clickEvents: function() {
 //       	$(".addExcersiceBtn").click(function() {
 //       		storage.addExersice();
 //       	});

 //       	$(".deleteExcersis").click(function() {
 //       		storage.cleanLocalstorage();
 //       	});

 //       	// Page 3 is excersises
 //       	// Page 4 is recording
 //       	$('#page3 .btn_start').click(function(){
	// 		   	$('.btn_start').toggle();
	// 			$('.btn_stop').toggle();

	// 			exercise.startRecord();
	// 		});

	// 		$('#page4 .btn_start').click(function(){
	// 		   	$('.btn_start').toggle();
	// 			$('.btn_stop').toggle();

	// 			exercise.startRecord();
	// 		});

	// 		$('#page3 .btn_stop').click(function(){
	// 		   	$('.btn_start').toggle();
	// 			$('.btn_stop').toggle();
			
	// 			exercise.saveRecord();

	// 			// $('.pages').hide();
	// 			// $('#page2').show();
	// 		});

	// 		$('#page4 .btn_stop').click(function(){
	// 		   	$('.btn_start').toggle();
	// 			$('.btn_stop').toggle();
				
	// 			exercise.saveRecord();

	// 			// $('.pages').hide();
	// 			// $('#page1').show();
	// 		});

	// 		$('#page1').show();
	
	// 		$('#page2 #bgcontainer_menu').click(function(){
				
	// 		   	$('.pages').hide();
	// 			$('#page1').show();
					 
	// 		    return false;
	// 		});

	// 		$('#page3 #bgcontainer_menu').click(function(){
				
	// 		   	$('.pages').hide();
	// 			$('#page2').show();
					 
	// 		    return false;
	// 		});
			
	// 		$('#page1 a').click(function(){
				
	// 		   	$('.pages').hide();
	// 			$('#page2').show();
					 
	// 				 return false;
	// 		});
			
	// 		$('#page2 a').click(function(){
				
	// 		   	$('.pages').hide();
	// 			$('#page3').show();
					 
	// 		    return false;
	// 		});

	// 		$('#page2 #bgcontainer_menu').click(function(){
	// 		   	$('.pages').hide();
	// 			$('#page1').show();
					 
	// 		    return false;
	// 		});

	// 		$('#page4 #bgcontainer_menu').click(function(){
	// 		   	$('.pages').hide();
	// 			$('#page1').show();
					 
	// 		    return false;
	// 		});

 //       }
	// };

	document.addEventListener("deviceready", APP.controller.init, false);
})();
