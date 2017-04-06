var app = app || {};

app.TodoView = Backbone.View.extend({
  tagName: "li",

  template: _.template($("#item-template").html()),

  events: {
    "click .toggle": "toggleCompleted",
    "dblclick label": "edit",
    "click .destroy": "clear",
    "keypress .edit": "updateOnEnter",
    "blur .edit": "close"
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    this.$el.toggleClass("completed", this.model.get("completed"));
    this.$input = this.$(".edit");
    return this;
  },

  toggleCompleted: function() {
    this.model.toggle();
  },

  edit: function() {
    this.$el.addClass("editing");
    this.$input.focus();
  },

  close: function() {
    var value = this.$input.val().trim();
    if (value) {
      this.model.set({
        title: value
      });
    }
    this.$el.removeClass("editing");
  },

  updateOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.close();
    }
  },

  clear: function() {
    this.model.destroy();
  }
});
