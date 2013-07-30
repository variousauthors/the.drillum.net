
MyApp.Views.VertexView = Backbone.Marionette.ItemView.extend({
  template: 'backbone/templates/vertex_view',
  tagName: 'canvas',
  attributes: {
    'height': '500px',
    'width': '500px'
  },

  radius: 10,

  render: function(){
    console.log("render");
    this.isClosed = false;

    this.triggerMethod("before:render", this);
    this.triggerMethod("item:before:render", this);

    var data = this.serializeData();
    data = this.mixinTemplateHelpers(data);

    this.draw(data);

    this.triggerMethod("render", this);
    this.triggerMethod("item:rendered", this);

    return this;
  },

  draw: function(data) {
    console.log(data);
    var context = this.el.getContext('2d');
    context.beginPath();
    context.arc(data.x, data.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
  }
});
