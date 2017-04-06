var app = app || {};

var TodoPanel = Backbone.View.extend({
  // The root element is the already existing 'section.todo-pane'.
  el: ".todo-pane",

  // Set event listeners.
  events: {
    "keypress #new-todo": "createOnEnter",
    "click #clear-completed": "clearCompleted",
    "click #toggle-all": "toggleAllComplete",
    "click .go-back": "slideInOut"
  },

  initialize: function() {
    // Save some DOM elemnts.
    this.allCheckbox = this.$("#toggle-all")[0];
    // These are jQuery collections.
    this.$input = this.$("#new-todo");
    this.$main = this.$("#main");

    // The "add" event is fired when a new "item" is added to the collection.
    this.listenTo(app.Todos, "add", this.addOne);
    // The "reset" event is fired when all the collection "items" are deleted/replaced at once.
    this.listenTo(app.Todos, "reset", this.addAll);
    // "all" is a special event fired for any triggered event, passing the event
    // name as first argument.
    this.listenTo(app.Todos, "all", this.render);
  },

  // Update the HTML.
  render: function() {
    // Check if there are todos left in the collection.
    var remaining = app.Todos.remaining().length;
    if (app.Todos.length) {
      // Show the main section.
      this.$main.show();
    } else {
      // Or hide it.
      this.$main.hide();
    }
    this.allCheckbox.checked = !remaining;
  },

  // Add one new todo to the collection.
  // @param {object} : a todo.
  // NB: the todo is returned by the "add" event.
  addOne: function(todo) {
    // Make a new TodoView adding a new property to it.
    var view = new app.TodoView({
      model: todo
    });
    // Append the "li" to the list.
    $("#todo-list").append(view.render().el);
  },

  // Add all the todos at once to the collection.
  addAll: function() {
    // Clear the "ul".
    this.$("#todo-list").html("");
    app.Todos.each(this.addOne, this);
  },

  // Set attributes for a new todo.
  newAttributes: function() {
    return {
      title: this.$input.val().trim(),
      order: app.Todos.nextOrder(),
      completed: false
    };
  },

  // Create a new todo when the ENTER key is pressed.
  createOnEnter: function(event) {
    if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
      return;
    }
    app.Todos.add(this.newAttributes());
    // Reset the main input field.
    this.$input.val("");
  },

  // Delete all the completed todos at once.
  clearCompleted: function() {
    _.invoke(app.Todos.completed(), "destroy");
    return false;
  },

  // Set all the todos in (un)completed state.
  toggleAllComplete: function() {
    var completed = this.allCheckbox.checked;
    app.Todos.each(function(todo) {
      todo.set({
        completed: completed
      });
    });
  },

  // Show or hide the todo list.
  slideInOut: function() {
    this.$el.toggleClass("slide-in");
  }
});

app.TodoPane = new TodoPanel();
