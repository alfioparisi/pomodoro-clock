var app = app || {};

var TodoPanel = Backbone.View.extend({
  el: ".todo-pane",

  events: {
    "keypress #new-todo": "createOnEnter",
    "click #clear-completed": "clearCompleted",
    "click #toggle-all": "toggleAllComplete",
    "click .go-back": "slideInOut"
  },

  initialize: function() {
    this.allCheckbox = this.$("#toggle-all")[0];
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

  render: function() {
    var remaining = app.Todos.remaining().length;
    if (app.Todos.length) {
      this.$main.show();
    } else {
      this.$main.hide();
    }
    this.allCheckbox.checked = !remaining;
  },

  addOne: function(todo) {
    var view = new app.TodoView({
      model: todo
    });
    $("#todo-list").append(view.render().el);
  },

  addAll: function() {
    this.$("#todo-list").html("");
    app.Todos.each(this.addOne, this);
  },

  newAttributes: function() {
    return {
      title: this.$input.val().trim(),
      order: app.Todos.nextOrder(),
      completed: false
    };
  },

  createOnEnter: function(event) {
    if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
      return;
    }
    app.Todos.add(this.newAttributes());
    this.$input.val("");
  },

  clearCompleted: function() {
    _.invoke(app.Todos.completed(), "destroy");
    return false;
  },

  toggleAllComplete: function() {
    var completed = this.allCheckbox.checked;
    app.Todos.each(function(todo) {
      todo.set({
        completed: completed
      });
    });
  },

  slideInOut: function() {
    this.$el.toggleClass("slide-in");
  }
});

app.TodoPane = new TodoPanel();
