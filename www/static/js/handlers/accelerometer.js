/**
 *	Accelerometer class
 *	Creates an object of the accelometer sensor.
 *
 *	@version 	0.3
 *	@author		Floyd van Boksel
 */

function Accelerometer() {
	this.watchId = null;
	this.options = { frequency: 50, movementSensitivity: 2 };
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
	this.watchId = navigator.accelerometer.watchAcceleration(this.onSuccses.bind(this), this.onError, this.options);
}

/**
 *	Stop the watch for the accelerometer
 */
Accelerometer.prototype.stopWatch = function() {
	if( this.watchId !== null ) {
		navigator.accelerometer.clearWatch(this.watchId);
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
	if(this.startVieuw === null) {
		this.startVieuw.x = acceleration.x;
		this.startVieuw.y = acceleration.y;
		this.startVieuw.z = acceleration.z;
		this.startVieuw.timestamp = acceleration.timestamp
	}

	this.checkForBreakpoint(acceleration);

	this.acceleration.x = acceleration.x;
	this.acceleration.y = acceleration.y;
	this.acceleration.z = acceleration.z;
	this.acceleration.timestamp = acceleration.timestamp;
}

/**
 *	Get the direction the accelerometer is moving
 *
 *	@return Object 	movement
 */
Accelerometer.prototype.getMovementDirection = function() {
	var movement = {};

	if(	this.acceleration.previousPos.x != null && 
		this.acceleration.previousPos.y != null &&
		this.acceleration.previousPos.z != null	) {
			
		if((this.acceleration.x - this.acceleration.previousPos.x) > this.options.movementSensitivity) {
			movement.movX = -2;
		}else if((this.acceleration.x - this.acceleration.previousPos.x) < -this.options.movementSensitivity) {
			movement.movX = 2;
		}else{
			movement.movX = 0;
		}

		if((this.acceleration.y - this.acceleration.previousPos.y) > this.options.movementSensitivity) {
			movement.movY = 2;
		}else if((this.acceleration.y - this.acceleration.previousPos.y) < -this.options.movementSensitivity) {
			movement.movY = -2;
		}else {
			movement.movY = 0;
		}	
	}else {
		this.acceleration.previousPos.x = this.acceleration.x;
		this.acceleration.previousPos.y = this.acceleration.y;
		this.acceleration.previousPos.z = this.acceleration.z;
		this.acceleration.previousPos.timestamp = this.acceleration.timestamp);

		movement.movX = 0;
		movement.movY = 0;
	}
	
	return movement;
}

/**
 *	Checks if the movement is different than the expected path
 */
Accelerometer.prototype.checkForBreakpoint = function(newAcceleration) {
	var currentDirrection = this.getMovementDirection();

	this.breakpoint = false;
	if(newAcceleration.x - this.acceleration.x <= -2 || newAcceleration.x - this.acceleration.x >= 2 || 
	   newAcceleration.y - this.acceleration.y <= -2 || newAcceleration.y - this.acceleration.y >= 2 ||
	   newAcceleration.z - this.acceleration.z <= -2 || newAcceleration.z - this.acceleration.z >= 2 ||
	   currentDirrection.movX != this.acceleration.movement.movX || currentDirrection.movY != this.acceleration.movement.movY) {
	   	this.acceleration.movement = movement;
		this.breakpoint = true;
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

