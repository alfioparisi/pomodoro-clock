var app = app || {};

var TodoList = Backbone.Collection.extend({
  // Model to which this collection references.
  model: app.Todo,

  // Check which todos are in completed state.
  // @return {array} : list of todos.
  completed: function() {
    return this.filter(function(todo) {
      return todo.get("completed");
    });
  },

  // Chech which todos are not in completed state.
  // @return {array} : list of todos.
  remaining: function() {
    return this.without.apply(this, this.completed());
  },

  // Assign a number to each todo based on the number of the last todo created.
  // @return {number}
  nextOrder: function() {
    if (!this.length) {
      return 1;
    }
    return this.last().get("order") + 1;
  },

  // Order the todos based on their "order" attribute.
  // @return {number}
  comparator: function() {
    return this.get("order");
  }
});

app.Todos = new TodoList();
