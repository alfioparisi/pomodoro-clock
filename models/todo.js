var app = app || {};

app.Todo = Backbone.Model.extend({
  // Default attributes.
  defaults: {
    title: "",
    completed: false
  },

  // Toggle the "completed" state of the todo.
  toggle: function() {
    this.set({
      completed: !this.get("completed")
    });
  }
});
