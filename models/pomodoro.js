var app = app || {};

app.Pomodoro = Backbone.Model.extend({
  // Set the default values for the model properties.
  defaults: {
    // Turn to seconds.
    time: 25 * 60
  }
});
// Make the pomodoro model, so it is globally available.
var pomodoro = new app.Pomodoro();
