var app = app || {};
var ENTER_KEY = 13;

// Using jQuery assures that this function is run when the DOM is loaded.
$(function() {
  // Start the app by creating the view.
  new app.PomodoroView();
});
