//= require ./color

/* instantiate a new colorwheel with a list of colours, or a number
*  The wheel will fill with those colors. You can later expand the
*  wheel with the expand method, adding a specific colour or a random
*  one. You can cycle through the colours in the wheel using "next"
*  or you can pass the next method a colour and, if that colour is in
*  the wheel, you will get the next colour back. */
MyApp.Models.ColorWheel = Backbone.Collection.extend({
  model: MyApp.Models.Color,

  /* if a length option is provided in place of colours,
  * then this is the desired 'spectrum' */
  initialize: function(options) {
    console.log("ColorWheel-->initialize");
    this._spectrum = 0;
    if (!options['length']) return;

    this._spectrum = options['length'];
  },

  /* once initialize has been called, we are ready to add
  * colours to the collection until the spectrum is full */
  setup: function() {
    console.log("ColorWheel-->setup");

    while (this.length != this._spectrum) {
      if (this.length > this._spectrum) {
        this.pop();
      } else {
        self.add(new MyApp.Models.Color());
      }
    }
  },

  /* get the colour after the given colour in the wheel */
  next: function(color) {
    console.log("ColorWheel-->next");
  },

  /* add a new colour to the wheel */
  increment: function(color) {
    console.log("ColorWheel-->increment");
    this.add(new MyApp.Models.Color());
    this._spectrum = this.length;
  },

  /* remove a colour from the wheel if it is present */
  decrement: function(color) {
    console.log("ColorWheel-->decrement");
  },

  /* get a random colour from the wheel */
  sample: function() {
    console.log("ColorWheel-->color")
    var index = parseInt(Math.random() * 100, 10) % this.length;
    return this.at(index).toString();
  }
});
