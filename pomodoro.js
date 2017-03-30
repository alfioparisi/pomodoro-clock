var userTime;
var timerDiv = document.querySelector(".timer");
// Checkmarks
var checkOne = document.querySelector(".check-first");
var checkTwo = document.querySelector(".check-second");
var checkThree = document.querySelector(".check-third");
var checkFour = document.querySelector(".check-fourth");

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
  this.display = timerDiv;
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
    this.time -= 1;
  }
  this.update();
};

// Update the stats
// called inside countDown()
Timer.prototype.update = function() {
  this.output(this.display);
  if (this.time === 0) {
    this.addCheck();
  }
};

// Update the interface
// @param {node object}
// called inside update()
Timer.prototype.output = function(el) {
  el.textContent = Math.floor(this.time / 60) + " : " + Math.floor(this.time % 60);
};

// Increase the checkmarks
// called inside update()
Timer.prototype.addCheck = function() {
  this.checkmarks++;
  switch (this.checkmarks) {
    case 1 :
        checkOne.style.opacity = "1";
        break;
    case 2 :
        checkTwo.style.opacity = "1";
        break;
    case 3 :
        checkThree.style.opacity = "1";
        break;
    case 4 :
        checkFour.style.opacity = "1";
        break;
    case 5 :
      checkOne.style.opacity = "0";
      checkTwo.style.opacity = "0";
      checkThree.style.opacity = "0";
      checkFour.style.opacity = "0";
      this.restart();
  }
  if (this.checkmarks < 4) {
    // give a short break
    this.time = this.shortBreak;
  } else {
    // or a long one
    this.time = this.break;
  }
};

// At 4 checkmarks, reset and restart
// called inside update()
Timer.prototype.restart = function() {
  this.time = this.startTime;
  this.checkmarks = 0;
};

// Need for clearInterval()
var init;
var isPaused = false;
var intervalCalls = 0;

// Take the button
var btnGo = document.querySelector(".start");
// Wait for click
btnGo.addEventListener("click", function() {
  var timer;
  isPaused = false;
  if (intervalCalls === 0) {
    intervalCalls++;
    // Take the user input
    userTime = document.querySelector(".time").value;
    // Make a timer instance
    timer = new Timer(userTime);
    // Call countDown() every second
  }
  init = setInterval(function() {
    if (!isPaused) {
      timer.countDown();
    }
  }, 1000);
});

var btnStop = document.querySelector(".stop");
btnStop.addEventListener("click", function() {
  isPaused = true;
});

var btnReset = document.querySelector("button[type='reset']");
btnReset.addEventListener("click", function() {
  timerDiv.textContent = "Set your time";
  intervalCalls = 0;
  clearInterval(init);
});
