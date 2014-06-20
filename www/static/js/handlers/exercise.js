function Exercise(accelerometer) {
	this.exerciseIntervals = {};
	this.breakpoints = [];
	this.exercise = {
		marginForError: 1,
		breakpointNumber: 0,
		breakpoints: null
	};
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
	}, 50);
}

Exercise.prototype.startWatch = function() {
	var self = this;
	self.setTimeoutNextBreakpoint();

	self.exerciseIntervals.watchExercise = setInterval(function() {
		console.log('hurr-duur-durr?');
		var inBounds = self.checkIfWithinBounds();
		if(inBounds) {

		}
	}, 500);
}

Exercise.prototype.setTimeoutNextBreakpoint = function() {
	var self = this;

	if(JSON.parse(self.exercise.breakpoints)[self.exercise.breakpointNumber].duration != null) {
		var timeoutMiliseconds = JSON.parse(self.exercise.breakpoints)[self.exercise.breakpointNumber].duration;
		self.exerciseIntervals.nextBreakpoint = setTimeout(function(){
			self.exercise.breakpointNumber++;
			self.setTimeoutNextBreakpoint();
		}, timeoutMiliseconds);
	}else {
		window.clearInterval(self.exerciseIntervals.watchExercise);
	}
}

Exercise.prototype.checkIfWithinBounds = function() {
	var inBounds = true;
	var currentPos = JSON.parse(this.exercise.breakpoints)[this.exercise.breakpointNumber];
	var nextPos = JSON.parse(this.exercise.breakpoints)[this.exercise.breakpointNumber + 1];
	var currentDirection = this.accelerometer.getMovementDirectionBetween(currentPos, nextPos);
	
	/* 
		Check which direction the user should go from point A to point B
		Check if the user isnt going another way (like up instead of sideways)
		Check if the user isn't going past the mark (higher/lower)
		Movement direction 
	 */
	if()

	return inBounds;
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
		for(var z = 0; z < this.breakpoints.length - 1; z++) {
			this.breakpoints[z].duration = this.breakpoints[z+1].timestamp - this.breakpoints[z].timestamp;
		}
		this.breakpoints[this.breakpoints.length - 1].duration = null;

		// Test to check movement direction
		// for(var h = 0; h < this.breakpoints.length - 2; h++) {
		// 	console.log('Movement directions');
		// 	var movementDirection = this.accelerometer.getMovementDirectionBetween(this.breakpoints[h], this.breakpoints[h+1]);
		// 	console.log('X movement : ' + movementDirection.movX);
		// 	console.log('Y movement : ' + movementDirection.movY);
		// }

	    localStorage.setItem(/*this.buttons.inputExerciseName.value*/ 'Aardappel', JSON.stringify(this.breakpoints));
	    
	    // example of getting an exercise from the localstorage
	    // var retrievedObject = localStorage.getItem(/*this.buttons.inputExerciseName.value*/ 'Aardappel');
	    this.exercise.breakpoints = localStorage.getItem(/*this.buttons.inputExerciseName.value*/ 'Aardappel');
		// example call to retrieve data from a specific entry
		// console.log(JSON.parse(retrievedObject)[0].x);

	 	// this.buttons.inputExerciseName.parentNode.removeChild(this.buttons.inputExerciseName);
		// this.buttons.saveRecordBtn.parentNode.removeChild(this.buttons.saveRecordBtn);
	} else {
	    // Sorry! No Web Storage support..
	    // Need some error handling here
	}

	this.startWatch();
}
