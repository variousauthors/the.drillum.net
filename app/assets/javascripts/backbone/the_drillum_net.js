//= require_self
//= require ./core_ext
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

// create a marionette app in the global namespace
MyApp = new Backbone.Marionette.Application();

// add the content div as a region our app will be aware of
MyApp.addRegions({
  mainRegion: "#content"
});

// here we define the initializer for the app, later we will call it
MyApp.addInitializer(function(options) {
  var angryCatsView = new AngryCatsView({ });

  MyApp.mainRegion.show(angryCatsView);
});

$(document).ready(function() {
  MyApp.start();
});
