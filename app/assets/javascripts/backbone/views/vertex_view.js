
MyApp.Views.VertexView = Backbone.Marionette.ItemView.extend({
  template: 'backbone/templates/vertex_view',
  tagName: 'canvas',
  attributes: {
    'height': '500px',
    'width': '500px'
  },

  render: function() {
    console.log("render");
    console.log(this.el);
    var context = this.el.getContext('2d');
    context.fillStyle = '#000';
    context.fillText("wow", 50, 50);
  }
});
