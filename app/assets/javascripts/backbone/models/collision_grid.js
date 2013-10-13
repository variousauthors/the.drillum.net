
MyApp.Models.CollisionGrid = Backbone.Model.extend({
  defaults: {
    step: 1,
    size: 100
  },

  initialize: function (options) {

  },

  startTransaction: function () {
    this.open_transactions.push({
      origin: undefined, // where our search began
      current: undefined // where we are now
    });

  },

  commit: function () {

  },

  add: function (origin) {
    if (this.open_transactions.length > 0) {
      if (this.open_transactions.first.origin != undefined) {
        return this._continueAdd(origin);
      }
    }

    // find a free cell near the given point and flip it

    return origin;
  },

  _continueAdd: function (origin) {
    // continue to spiral outward from the origin
    // picking up wherever we left off
    // in search of a free cell to flip

  },

  getLine: function (start, end, options) {
    return [];
  },

  jigger: function (coord) {
    return coord;
  }
});
