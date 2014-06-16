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
	this.buttons = {};
}

Exercise.prototype.setStartBtnClick = function() {
	var startBtn = document.getElementById("startBtn").click = this.startRecord();
	//startBtn.onclick = this.startRecord();
}

Exercise.prototype.startRecord = function() {
	var self = this;
	console.log('hai');
	self.exerciseIntervals.recordExercise = setInterval(function() {
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
	clearInterval(this.exerciseIntervals.recordExercise);

	this.buttons.inputExerciseName = document.createElement("INPUT");
	inputExerciseName.setAttribute("type", "text");
	inputExerciseName.setAttribute("id", "exerciseName");
	context.appendChild(inputExerciseName);

	this.buttons.saveRecordBtn = document.createElement("input");
    saveRecordBtn.type = "sendBtn";
    saveRecordBtn.value = "save";
    saveRecordBtn.onclick = this.saveRecord;
    context.appendChild(saveRecordBtn);
}

Exercise.prototype.saveRecord = function() {
	if(typeof(Storage) !== "undefined") {
	    // Code for localStorage/sessionStorage.
	    localStorage.setItem(this.buttons.inputExerciseName.value, JSON.stringify(this.breakpoints));
	    
	    var retrievedObject = localStorage.getItem(this.buttons.inputExerciseName.value);
		console.log('retrievedObject: ', JSON.parse(retrievedObject));

	    this.buttons.inputExerciseName.parentNode.removeChild(this.buttons.inputExerciseName);
		this.buttons.saveRecordBtn.parentNode.removeChild(this.buttons.saveRecordBtn);
	} else {
	    // Sorry! No Web Storage support..
	}
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