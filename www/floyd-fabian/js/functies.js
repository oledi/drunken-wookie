$(document).ready(function(){
	
	
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
