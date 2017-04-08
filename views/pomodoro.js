var app = app || {};

app.PomodoroView = Backbone.View.extend({
  // The root element of this view is 'div.container'.
  el: ".container",

  // Bind events.
  events: {
    // Update the timer with the user own time.
    // Whenever the value of the input change.
    "change input[type='number']": "getUserTime",
    // Whenever the 'button.reset' is clicked.
    "click .reset": "getUserTime",
    // Start the timer on 'button.start' click.
    "click .start": "startTimer",
    // Stop the timer on 'button.stop' click.
    "click .stop": "stopTimer",
    // Slide in the todo-pane on 'a.toggle-todo' click.
    "click .todo-toggle": "toggleTodo"
  },

  initialize: function() {
    // Use Underscore.js to keep the context of the functions of this view tyed to
    // the view itself.
    _.bindAll(this, "render", "displayAsTimer", "getUserTime", "countDown", "stopTimer");
    // Get the input field responsible of setting the time.
    this.$input = this.$("input[type='number']");
    // Wait for model changes.
    this.listenTo(pomodoro, "change", this.displayAsTimer);
  },

  // Update the HTML.
  // Called by "this.displayAsTimer".
  render: function() {
    // Message.
    if (!pomodoro.get("isBreak")) {
      this.$(".msg").html("work to do");
    } else {
      this.$(".msg").html("time for a break");
    }
    // Timer.
    this.$(".timer").html(this.displayedTime);
  },

  // Called by the "change" event fired by the model.
  displayAsTimer: function() {
    // Take the model time.
    var time = pomodoro.get("time");
    // Show it clock-like.
    this.displayedTime = "" + Math.floor(time / 60) + " : " + Math.floor(time % 60);
    // Call render to update the HTML.
    this.render();
  },

  // Get the user time and updated the model property. Also stop the timer.
  // Called by the "change" event on the 'this.$input' and by the "click" event
  // on 'button.reset'.
  getUserTime: function() {
    // Get the user custom time. If there is none, use the default.
    this.userTime = this.$input.val();
    // Set the attributes.
    pomodoro.set({
      // Turn it into seconds.
      time: this.userTime * 60,
      // Reset the checkmarks.
      checkmarks: 0,
      // Reset the breaks.
      isBreak: false
    });
    // Remove any checkmark.
    this.$(".timer").removeClass(function(index, className) {
      return (className.match(/(^|\s)checkmark-\d+/g) || []).join(" ");
    });
    // Stop the timer.
    this.stopTimer();
  },

  // Run the timer by calling "this.countDown" every second.
  // Called by the "click" event on 'button.start'.
  startTimer: function() {
    // Default user time.
    if (this.userTime === undefined) {
      this.userTime = 25;
    }
    // Disable 'button.start'.
    this.$(".start").css("pointer-events", "none");
    // Start the timer.
    this.interval = setInterval(this.countDown, 1000);
    return this.interval;
  },

  // Set how the timer works.
  // Called by "this.startTimer".
  countDown: function() {
    // Check if there is still time.
    if (pomodoro.get("time") > 0) {
      // Decrese the time attribute by 1.
      pomodoro.set({
        time: pomodoro.get("time") - 1
      });
    // Otherwise, check the number of checkmarks.
    } else if (pomodoro.get("time") <= 0) {
      // If it's not break time and...
      if (!pomodoro.get("isBreak") && pomodoro.get("checkmarks") < 4) {
        // ...there are less than 4 checkmarks, set a short break.
        pomodoro.set({
          time: pomodoro.get("shortBreak"),
          checkmarks: pomodoro.get("checkmarks") + 1,
          isBreak: true
        });
        // Show the checkmarks.
        this.$(".timer").addClass("checkmark-" + pomodoro.get("checkmarks"));
        this.$(".timer").removeClass("checkmark-" + (pomodoro.get("checkmarks") - 1));
      } else if (!pomodoro.get("isBreak") && pomodoro.get("checkmarks") < 5) {
        // If it's 4, set a long break.
        pomodoro.set({
          time: pomodoro.get("longBreak"),
          checkmarks: pomodoro.get("checkmarks") + 1,
          isBreak: true
        });
      // If it's break time, but we still have max 4 checkmarks...
      } else if (pomodoro.get("isBreak") && pomodoro.get("checkmarks") < 5) {
        // ...restart counting.
        pomodoro.set({
          time: this.userTime * 60,
          isBreak: false
        });
      // Finally, if we're done, stop the timer.
      } else {
        this.stopTimer();
        // And remove the checkmarks.
        this.$(".timer").removeClass("checkmark-4");
      }
    }
  },

  // Stop the timer count down.
  // Called by the "click" on 'button.stop', "this.countDown", "this.getUserTime".
  stopTimer: function() {
    // Enable 'button.start'.
    this.$(".start").css("pointer-events", "auto");
    // Stop timer.
    return clearInterval(this.interval);
  },

  toggleTodo: function(evt) {
    evt.preventDefault();
    app.TodoPane.slideInOut();
  }
});
