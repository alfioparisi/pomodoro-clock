/** There are six steps in the technique:
* Decide on the task to be done.
* Set the pomodoro timer (traditionally to 25 minutes).[1]
* Work on the task until the timer rings.
* After the timer rings, put a checkmark on a piece of paper.[5]
* If you have fewer than four checkmarks, take a short break (3–5 minutes), then go to step 2.
* After four pomodoros, take a longer break (15–30 minutes), reset your checkmark count to zero, then go to step 1.**/
// https://en.wikipedia.org/wiki/Pomodoro_Technique

// Let the user choose a task and show it on the page, over the timer
// Let the user set the timer, the default is 25mins
// Wait for the user to press start, then start to count down
// After the timer rings, save a "checkmark"
// If there are up to 3 checkmarks set a break of 5 minutes
// If there are 4 checkmarks set a break of 15 mins

var userTime;

// Make the timer
// @param {string} : user input
var Timer = function(startTime) {
  // Take the user input, turn it into seconds
  this.startTime = Number(startTime) * 60 || 25 * 60;
  // The time
  this.time = this.startTime;
  // It ends at 0 seconds
  this.endTime = 0;
  // The display
  this.display = document.querySelector(".timer");
  // checkmark
  this.checkmarks = 0;
  // Breaks
  this.shortBreak = 5 * 60;
  this.break = 15 * 60;
};

// Our timer can count down
Timer.prototype.countDown = function() {
  // Until we reach 0 seconds...
  if (this.time > this.endTime) {
    // ...Take away one second
    this.time -= 10;  //TODO: put back to --
  }
  this.update();
};

// Update the stats
Timer.prototype.update = function() {
  this.output(this.display);
  if (this.time === 0) {
    this.addCheck();
  }
  if (this.checkmarks === 5) {
    this.restart();
  }
};

// Update the interface
// @param {node object}
Timer.prototype.output = function(el) {
  el.textContent = Math.floor(this.time / 60) + " : " + Math.floor(this.time % 60);
};

// Increase the checkmarks
Timer.prototype.addCheck = function() {
  this.checkmarks++;
  if (this.checkmarks < 4) {
    // give a short break
    this.time = this.shortBreak;
  } else {
    // or a long one
    this.time = this.break;
  }
};

// At 4 checkmarks, reset and restart
Timer.prototype.restart = function() {
  this.time = this.startTime;
  this.checkmarks = 0;
};

var init;

// Take the button
var btnGo = document.querySelector(".start");
// Wait for click
btnGo.addEventListener("click", function() {
  // Take the user input
  userTime = document.querySelector(".time").value;
  // Make a timer instance
  var timer = new Timer(userTime);
  // Call countDown() every second
  init = setInterval(function() {
    timer.countDown();
  }, 1000);
  // Make the ID of setInterval available globally, so to use clearInterval()
  return init;
});

var btnStop = document.querySelector(".stop");
btnStop.addEventListener("click", function() {
  clearInterval(init);
});

// TODO: make a stop button, style
