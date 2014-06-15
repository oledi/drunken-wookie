/**
 *	Accelerometer class
 *	Creates an object of the accelometer sensor.
 *
 *	@version 	0.3
 *	@author		Floyd van Boksel
 */

function Accelerometer() {
	this.watchID = null;
	this.options = { frequency: 10, movementSensitivity: 2 };
	this.startView = null;
	this.acceleration = {};
	this.breakpoint = false;

	this.startWatch();
}

/**
 *	Gives a scope to a function
 */
Function.prototype.bind = function(scope) {
	var _function = this;

	return function() {
		return _function.apply(scope, arguments);
	};
}

/**
 *	Start the watch for the accelerometer
 */
Accelerometer.prototype.startWatch = function() {
	this.watchID = navigator.accelerometer.watchAcceleration(this.onSuccses.bind(this), this.onError, this.options);
}

/**
 *	Stop the watch for the accelerometer
 */
Accelerometer.prototype.stopWatch = function() {
	if( this.watchID !== null ) {
		navigator.accelerometer.clearWatch(this.watchID);
	}
}

/**
 *	Error handling when no accelerometer could be found
 */
Accelerometer.prototype.onError = function() {
    console.log('onError!');
}

/**
 *	Update the acceleration and set the start view
 */
Accelerometer.prototype.onSuccses = function(acceleration) {
	if(this.startView === null) {
		this.startView = {
			x: acceleration.x,
			y: acceleration.y,
			z: acceleration.z,
			timestamp: acceleration.timestamp
		} 
	}

	// check for breakpoints between old and new data
	this.checkForBreakpoint(acceleration);

	this.acceleration = {
		x: acceleration.x,
		y: acceleration.y,
		z: acceleration.z,
		timestamp: acceleration.timestamp
	}
}

/**
 *	Get the direction the accelerometer is moving
 *
 *	@return Object 	movement
 */
Accelerometer.prototype.getMovementDirection = function() {
	var movement = {};

	if(this.startView === null) {
		movement.movX = 0;
		movement.movY = 0;
	}else {
		if((this.acceleration.x - this.startView.x) > this.options.movementSensitivity) {
			movement.movX = -2;
		}else if((this.acceleration.x - this.startView.x) < -this.options.movementSensitivity) {
			movement.movX = 2;
		}else{
			movement.movX = 0;
		}

		if((this.acceleration.y - this.startView.y) > this.options.movementSensitivity) {
			movement.movY = 2;
		}else if((this.acceleration.y - this.startView.y) < -this.options.movementSensitivity) {
			movement.movY = -2;
		}else {
			movement.movY = 0;
		}
	}
	
	this.acceleration.movement = movement;
	return movement;
}

/**
 *	Checks if the movement is different than the expected path
 */
Accelerometer.prototype.checkForBreakpoint = function(newAcceleration) {
	if(newAcceleration.x - this.acceleration.x <= -1 || newAcceleration.x - this.acceleration.x >= 1 || 
	   newAcceleration.y - this.acceleration.y <= -1 || newAcceleration.y - this.acceleration.y >= 1 ||
	   newAcceleration.z - this.acceleration.z <= -1 || newAcceleration.z - this.acceleration.z >= 1 ) {
		this.breakpoint = true;
	}else {

	}
}

/** Get & Set function */ 
/**
 *	Set the update frequency
 *
 * 	@param Number 	speed
 */
Accelerometer.prototype.setUpdateFrequency = function(speed) {
	this.options.frequency = speed;
}

/**
 *	Set the movement sensitivity
 *
 *	@param Number 	sensitivity
 */
Accelerometer.prototype.setMovementSensitivity = function(sensitivity) {
	this.options.movementSensitivity = sensitivity;
}

