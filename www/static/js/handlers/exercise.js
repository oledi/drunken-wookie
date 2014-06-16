/**
 *	First just collect all the data (breakpoints, positions and such)
 *	When everything is collected and the user pressed the stop button calculate the average time till the break
 *	Temp storage till calculation
 *		this.breakpoints = [
			*repeating* 0 = [
				average = [
					x = number
					y = number
					z = number
					time = number
				]
				*repeating* 0 = []
					x = number
					y = number
					z = number
					timestamp: number
				]
			]
 		]

		// general loop based on
 		this.breakpoints.lengt

 		// loop to get all the times
 		// this.breakpoints.length - 1

 */

function Exercise(accelerometer) {
	this.exerciseIntervals = {};
	this.breakpoints = [];
	this.accelerometer = accelerometer;

	this.startRecord();
}

Exercise.prototype.startRecord = function() {
	var self = this;

	self.exerciseIntervals.excercise = setInterval(function() {
		if(self.accelerometer.breakpoint) {
			var coordinates = {
				x: self.accelerometer.acceleration.x,
				y: self.accelerometer.acceleration.y,
				z: self.accelerometer.acceleration.z,
				timestamp: self.accelerometer.acceleration.timestamp
			};

			self.breakpoints.push(coordinates);
			self.accelerometer.breakpoint = false;
		}

	}, 100);
}

Exercise.prototype.endRecord = function() {
	var self = this;

	/*
	var	exerciseName = document.createElement("INPUT");
	exerciseName.setAttribute("type", "text");
	container.appendChild(exerciseName);
	

	if(typeof(Storage) !== "undefined") {
	    // Code for localStorage/sessionStorage.

	} else {
	    // Sorry! No Web Storage support..
	}
	*/
}

Exercise.prototype.calculateAverages = function() {
	/* 
	// Ze array opbouw
	this.breakpoints = [
		*repeating* 0 = [
			average = {
				x = number
				y = number
				z = number
				time = number
			}
			data = [
				*repeating* 0 = {
					x = number
					y = number
					z = number
					timestamp: number
				}	
			]
		]
 	]

 	The for loop blueprint
 	
 	for(var x = 0; x < this.breakpoints.length - 1; x++) {

 		var averages {};
 		for(var y = 0; y < this.breakpoints[x].length -1; y++) {
 			
 		}
 	}
 	*/
}