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

Exercise.prototype.startRecord = function() {
	var self = this;

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

Exercise.prototype.startWatch = function() {
	var self = this;

	self.exerciseIntervals.watchExercise = setInterval(function() {

	}, 500);
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

		// minus 2 to get the second last entry as last. Since that is the last entry that has a duration
		for(var z = 0; z < this.breakpoints.length - 2; z++) {
			this.breakpoints[z].duration = this.breakpoints[z+1].timestamp - this.breakpoints[z].timestamp;
		}
		this.breakpoints[this.breakpoints.length - 1].duration = null;

		for(var h = 0; h < this.breakpoints.length - 2; h++) {
			console.log('Movement directions');
			this.accelerometer.getMovementDirectionBetween(this.breakpoints[h], this.breakpoints[h+1]);
		}

	    localStorage.setItem(/*this.buttons.inputExerciseName.value*/ 'Aardappel', JSON.stringify(this.breakpoints));
	    
	    // example of getting an exercise from the localstorage
	    // var retrievedObject = localStorage.getItem(/*this.buttons.inputExerciseName.value*/ 'Aardappel');
		// example call to retrieve data from a specific entry
		// console.log(JSON.parse(retrievedObject)[0].x);

	 	// this.buttons.inputExerciseName.parentNode.removeChild(this.buttons.inputExerciseName);
		// this.buttons.saveRecordBtn.parentNode.removeChild(this.buttons.saveRecordBtn);
	} else {
	    // Sorry! No Web Storage support..
	    // Need some error handling here
	}
}
