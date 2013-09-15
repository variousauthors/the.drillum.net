
MyApp.Models.Color = Backbone.Model.extend({
  defaults: {
    color: 'black'
  },
  initialize: function(options) {
    if (options && options['color']) return;

    var r = parseInt(Math.random() * 100, 16) % 16;
    var g = parseInt(Math.random() * 100, 16) % 16;
    var b = parseInt(Math.random() * 100, 16) % 16;

    this.set('color', '#' + r + g + b);
  },

  toString: function() {
    return this.get('color');
  }

});
