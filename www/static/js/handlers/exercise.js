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
		var inBounds = self.checkIfInBounds();
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

Exercise.prototype.checkIfInBounds = function() {
	var inBounds = true;
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
		}else if(directionBreakpoints.movX == this.accelerometer.movementDirections.left) {
			// maxValues.x = currentBreakpoint.x;
		}

		if(directionBreakpoints.movY == this.accelerometer.movementDirections.up) {
			// maxValues.y = currentBreakpoint.y;
		}else if(directionBreakpoints.movY == this.accelerometer.movementDirections.down) {
			// maxValues.y = nextBreakpoint.y;
		}
	}
	
	

	return inBounds;
}

Exercise.prototype.getMaxValuesBounds = function() {
	var maxValues = {
		movementDirection: directionBreakpoints
	};
	
	//Shit is going to the right
	if(directionBreakpoints.movX == this.accelerometer.movementDirections.right) {
		maxValues.x = nextPos.x;
	}else if(directionBreakpoints.movX == this.accelerometer.movementDirections.left) {
		maxValues.x = currentPos.x;
	}

	if(directionBreakpoints.movY == this.accelerometer.movementDirections.up) {
		maxValues.y = currentPos.y;
	}else if(directionBreakpoints.movY == this.accelerometer.movementDirections.down) {
		maxValues.y = nextPos.y;
	}

	return maxValues;
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
