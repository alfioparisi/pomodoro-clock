var app = app || {};

app.Pomodoro = Backbone.Model.extend({
  // Set the default values for the model properties.
  defaults: {
    // Turn to seconds.
    time: 25 * 60,
    // Keep track of the number of cycles (from "time" to 0).
    checkmarks: 0,
    // Check it's break time.
    isBreak: false,
    // Breaks between work-times.
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  }
});
// Make the pomodoro model, so it is globally available.
var pomodoro = new app.Pomodoro();
