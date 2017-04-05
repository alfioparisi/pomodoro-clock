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
    "click .reset": "getUserTime"
  },

  initialize: function() {
    // Use Underscore.js to keep the context of the functions of this view tyed to
    // the view itself.
    _.bindAll(this, "render", "displayAsTimer", "getUserTime");
    // Get the input field responsible of setting the time.
    this.$input = this.$("input[type='number']");
    // Wait for model changes.
    this.listenTo(pomodoro, "change", this.displayAsTimer);
  },

  // Updates the HTML.
  // Called by "this.displayAsTimer".
  render: function() {
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

  // Get the user time and updated the model property.
  // Called by the "change" event on the 'this.$input' and by the "click" event
  // on 'button.reset'.
  getUserTime: function() {
    var userTime = this.$input.val();
    pomodoro.set({
      // Turn it into seconds.
      time: userTime * 60
    });
  }
});
