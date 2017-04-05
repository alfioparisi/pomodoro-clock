var app = app || {};

app.Pomodoro = Backbone.Model.extend({
  // If no timer is set, the pomodoro will start at 25 minutes.
  defaults: {
    // Minutes.
    time: 25
  }
});
// Make the pomodoro model.
var pomodoro = new app.Pomodoro();
