function Exercise(accelerometer) {
	this.exerciseInterval = {};
	this.position = [];
	this.breakpoints = [];
	this.accelerometer = accelerometer;

	this.start();
}

Exercise.prototype.start = function() {
	var self = this;

	self.exerciseInterval.excercise = setInterval(function() {
		console.log(self.accelerometer.breakpoint);
	}, 100);
}

Exercise.prototype.checkForBreak = function() {
	var self = this;

	self.exerciseInterval.update = setInterval(function() {
		if(self.accelerometer.breakpoint) {
					

			self.accelerometer.breakpoint = false;
		}
	}, 500);
}

Exercise.prototype.end = function() {

}