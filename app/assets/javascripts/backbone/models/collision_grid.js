
MyApp.Models.CollisionGrid = Backbone.Model.extend({
  defaults: {
    step: 1,
    size: 100
  },

  initialize: function (options) {

  },

  startTransaction: function () {

  },

  commit: function () {

  },

  add: function (origin) {
    return origin;
  },

  getLine: function (start, end, options) {
    return [];
  },

  jigger: function (coord) {
    return coord;
  }
});
