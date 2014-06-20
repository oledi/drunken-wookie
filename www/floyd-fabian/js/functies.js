$(document).ready(function(){
	
	
	function setExercises() {
   		 if ('localStorage' in window && window['localStorage'] !== null) {
              try {
              	for( var i = 0; i<localStorage.length; i++){
              		var retrievedObject = JSON.parse(localStorage.getItem('oefening'+i));
           		   $("#container_oefeningen").append('<a href="#" name=""><div class="container_item"><img src="img/'+retrievedObject.url+'" /><h1>'+retrievedObject.name+'</h1></div></a>'); 
              	}
              
			    } catch (e) {
			        console.log(e);
			  }
	    } else {
	       console.log('heb ik niet');
	    } 
   
	}
	
	setExercises();
	
	

	// Start en stop functie
	
	 $('.btn_start').click(function(){
	   	 $('.btn_start').toggle();
		 $('.btn_stop').toggle();
		 
		 start();
	 });
	 $('.btn_stop').click(function(){
	   	$('.btn_start').toggle();
		$('.btn_stop').toggle();
			 
		$('.pages').hide();
		$('#page2').show();
		
		stop();
	 });
	
	function start() {
     console.log('start')
	}

	function stop() {
     console.log('stop')
	}	
	
	//
	
	
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
	

 
   	
 
});
