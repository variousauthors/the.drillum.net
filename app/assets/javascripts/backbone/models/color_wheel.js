//= require ./color

/* instantiate a new colorwheel with a list of colours, or a number
*  The wheel will fill with those colors. You can later expand the
*  wheel with the expand method, adding a specific colour or a random
*  one. You can cycle through the colours in the wheel using "next"
*  or you can pass the next method a colour and, if that colour is in
*  the wheel, you will get the next colour back. */
MyApp.Models.ColorWheel = Backbone.Collection.extend({
  model: MyApp.Models.Color,

  initialize: function(options) {
    console.log("ColorWheel-->initialize");
    this._spectrum = 0;
    if (!options['length']) return;

    this._spectrum = options['length'];
  },

  setup: function() {
    console.log("ColorWheel-->setup");
    if (this.length >= this._spectrum) return;

    var self = this;
    this.pop(); // get rid of the undefined model

    _.times(this._spectrum, function(i) {
      self.add(new MyApp.Models.Color());
    });

    console.log(this.length);
  },

  next: function(color) { },
  expand: function(color) { },

  /* get a random colour from the wheel */
  color: function() {
    console.log("ColorWheel-->color")
    var index = parseInt(Math.random() * 100, 10) % this.length;
    return this.at(index).toString();
  }
});
