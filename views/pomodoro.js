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
    _.bindAll(this, "getUserTime");
    // Get the input field responsible of setting the time.
    this.$input = this.$("input[type='number']");
    // Wait for model changes.
    this.listenTo(pomodoro, "change", this.render);
  },

  // Updates the HTML.
  render: function() {
    this.$(".timer").html(pomodoro.get("time"));
  },

  // Get the user time and updated the model property.
  // Called by the "change" event on the 'this.$input' and by the "click" event
  // on 'button.reset'.
  getUserTime: function() {
    var userTime = this.$input.val();
    pomodoro.set({
      time: userTime
    });
  }
});
