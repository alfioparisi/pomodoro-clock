var app = app || {};

app.AppView = Backbone.View.extend({
  el: ".container",

  events: {
    "blur input[type='number']": "getUserTime"
  },

  initialize: function() {
    _.bindAll(this, "getUserTime");
    // Get the input field to set the time.
    this.$input = this.$("input[type='number']");
    // Make a pomodoro view.
    var pomodoroView = new app.PomodoroView();
  },

  getUserTime: function() {
    var userTime = this.$input.val();
    pomodoro.set({
      time: userTime
    });
  }
});
