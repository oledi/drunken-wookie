/**
 *	Excersise function/object
 *
 *	Regulates the excersises done by users and the record of 
 * 	possible new excersises. 
 */
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

/** 
 *	Start the recording of a new excersise
 */
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

/**
 *	Start the watch during the excersice and generates feedback
 *	in the form of vibrations
 */
Exercise.prototype.startWatch = function() {
	var self = this;
	self.setTimeoutNextBreakpoint();

	self.exerciseIntervals.watchExercise = setInterval(function() {
		var inBounds = self.checkIfInBounds();
		if(!inBounds) {
			console.log('Not in bounds / Should be shaking atm');
		}
	}, 500);
}

/** 
 *	Causes the phone to vibrate
 *
 *	@param 	miliseconds 		Vibrate duration in miliseconds
 */
Exercise.prototype.vibrate = function(miliseconds) {
	navigator.notification.vibrate(milliseconds)
}

/**
 *	Causes the phone to make a beeping noise
 *
 *	@param 	times 		The amount of times the beeping noise should be made
 */
Exercise.prototype.beep = function(times) {
	navigator.notification.beep(times);
}

/** 
 *	Sets an timeout interval for the current breakpoint. When completed
 * 	the current breakpoint number is added and a new interval is set
 */
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

/** 
 *	Checks if the user is with the range between the two breakpoints
 *	and not overextending or leaving the 'bounds' that is set
 *
 *	@retur 	inBouns 		Returns if the user is within the bounds
 */
Exercise.prototype.checkIfInBounds = function() {
	var inBounds = true;
<<<<<<< HEAD
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
=======
	var maxValues = this.getMaxValuesBounds();
	var previousPos = this.accelerometer.acceleration.previousPos;
	var currentPos = this.accelerometer.acceleration.currentPos;
	var currentDirection = this.accelerometer.getMovementDirectionBetween(previousPos, currentPos);4

	/* Breakpoint values */
	var currentBreakpoint = JSON.parse(this.exercise.breakpoints)[this.exercise.breakpointNumber];
	var nextBreakpoint = JSON.parse(this.exercise.breakpoints)[this.exercise.breakpointNumber + 1];
	var directionBreakpoints = this.accelerometer.getMovementDirectionBetween(currentBreakpoint, nextBreakpoint);
	
	if(currentDirection.movX != directionBreakpoints.movX || 
		currentDirection.movY != directionBreakpoints.movY) {
		return false;
	}else { 
		if(directionBreakpoints.movX == this.accelerometer.movementDirections.right) {
			// maxValues.x = nextBreakpoint.x;
			if(currentPos > nextBreakpoint.x + this.accelerometer.options.movementSensitivity) {
				return false;
			}
		}else if(directionBreakpoints.movX == this.accelerometer.movementDirections.left) {
			// maxValues.x = currentBreakpoint.x;
			if(currentPos < currentBreakpoint.x  - this.accelerometer.acceleration.movementSensitivity) {
				return false;
			}
		}
>>>>>>> origin/master

		if(directionBreakpoints.movY == this.accelerometer.movementDirections.down) {
			// maxValues.y = nextBreakpoint.y;
			if(currentPos.y > nextBreakpoint.y + this.accelerometer.acceleration.movementSensitivity) {
				return false;
			}
		}else if(directionBreakpoints.movY == this.accelerometer.movementDirections.up) {
			// maxValues.y = currentBreakpoint.y;
			if(currentPos.y < nextBreakpoint - this.accelerometer.acceleration.movementSensitivity) {
				return false;
			}
		}
	}
	
	return inBounds;
}

/**
 *	Stops the recording of the excersice
 */
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

/**
 *	Stores the excersice that has just been recorded in the localStorage
 */
Exercise.prototype.saveRecord = function() {
	if(typeof(Storage) !== "undefined") {

		// TEMP - clear the record interval
		clearInterval(this.exerciseIntervals.recordExercise);
		
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
		
	    localStorage.setItem('oefening' + localStorage.length, JSON.stringify(this.breakpoints));
	    
	    // example of getting an exercise from the localstorage
	    // var retrievedObject = localStorage.getItem(/*this.buttons.inputExerciseName.value*/ 'Aardappel');
	    this.exercise.breakpoints = localStorage.getItem('oefening' + localStorage.length);
		// example call to retrieve data from a specific entry
		// console.log(JSON.parse(retrievedObject)[0].x);

	 	// this.buttons.inputExerciseName.parentNode.removeChild(this.buttons.inputExerciseName);
		// this.buttons.saveRecordBtn.parentNode.removeChild(this.buttons.saveRecordBtn);
	} 

	// NEEDS TO BE REMOVED WHEN WE HAZ BUTTONS WORKING
	this.startWatch();
}
