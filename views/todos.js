var app = app || {};

app.TodoView = Backbone.View.extend({
  // The root element is an "li" tag.
  tagName: "li",

  // Underscore "template()".
  template: _.template($("#item-template").html()),

  // Set event listeners.
  events: {
    "click .toggle": "toggleCompleted",
    "dblclick .edit": "edit",
    "click .destroy": "clear",
    "keypress .edit": "updateOnEnter",
    "blur .edit": "close"
  },

  initialize: function() {
    // Set event listeners on the model.
    this.listenTo(this.model, "change", this.render);
    // ".remove()" is a built-in Backbone function.
    this.listenTo(this.model, "destroy", this.remove);
  },

  // Update the HTML.
  // @return {object} : this view.
  render: function() {
    // Fill the template with the model attributes and pass it in the "li" element.
    this.$el.html(this.template(this.model.attributes));
    // Toggle the '.completed' class based on the "completed" state of the todo.
    this.$el.toggleClass("completed", this.model.get("completed"));
    // Store the input field used for editing.
    this.$input = this.$(".edit");
    // Returning "this" allows chaining.
    return this;
  },

  // Toggle the "completed" state of the model.
  toggleCompleted: function() {
    this.model.toggle();
  },

  // Enter editing-mode.
  edit: function() {
    this.$el.addClass("editing");
    this.$input.focus();
  },

  // Exit editing-mode.
  close: function() {
    // Save the new value of the todo "title".
    var value = this.$input.val().trim();
    // Check if it's not empty.
    if (value) {
      this.model.set({
        title: value
      });
    }
    this.$el.removeClass("editing");
  },

  // Update the todo after an editing.
  updateOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.close();
    }
  },

  // Get rid of a todo.
  clear: function() {
    this.model.destroy();
  }
});
