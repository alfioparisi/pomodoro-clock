var app = app || {};

// Using jQuery assures that this function is run when the DOM is loaded.
$(function() {
  // Start the app by creating the view.
  new app.PomodoroView();
});
