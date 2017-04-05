var app = app || {};

app.Pomodoro = Backbone.Model.extend({
  // Set the default values for the model properties.
  defaults: {
    // Minutes.
    time: 25
  }
});
// Make the pomodoro model, so it is globally available.
var pomodoro = new app.Pomodoro();
