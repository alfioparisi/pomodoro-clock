var app = app || {};

app.AppView = Backbone.View.extend({
  el: ".container",

  events: {

  },

  initialize: function() {
    var pomodoroView = new app.PomodoroView();
  }
});
