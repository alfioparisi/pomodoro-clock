var app = app || {};

app.PomodoroView = Backbone.View.extend({
  // The pomodoro is a div.
  el: $(".timer")[0],

  // Initialize the starting time to be the user chosen time.
  initialize: function() {
    // _.bindAll(this, "");
    // // If the user has chosen its own time, tell it to the pomodoro.
    // // TODO
  }
});
