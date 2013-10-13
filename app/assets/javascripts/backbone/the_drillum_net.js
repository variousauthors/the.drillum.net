//= require_self
//= require ./core_ext
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

// create a marionette app in the global namespace
MyApp = new Backbone.Marionette.Application();
MyApp.module("Models");
MyApp.module("Views");

// add the content div as a region our app will be aware of
MyApp.addRegions({
  mainRegion: "#content"
});

/* setup the Canvas view with graph */
MyApp.addInitializer(function(options) {
  console.log("== MyApp-->initializer ==");

  var masterDetailLayout = new MyApp.Views.MasterDetailLayout();
  MyApp.mainRegion.show(masterDetailLayout);

  var graph_view = new MyApp.Views.GraphView({
    collection: options.graph
  });

  var passage_view = new MyApp.Views.PassageView();

  masterDetailLayout.master.show(graph_view);
  masterDetailLayout.detail.show(passage_view);
});

$(document).ready(function() {
  /* vertices created one at a time */
  var A = new MyApp.Models.Vertex({x:250, y:250});

  A.set('passage', new MyApp.Models.Passage({ text: "Bob was a man, who liked snow." }));

  /* we could also say Graph([A, B, C, D, E]),
  * and redundant edges would not be included
  * note also: D is nested in A->C->D
  * and: B is a duplicate
  * but the result will be a set of vertices */
  var graph = new MyApp.Models.Graph([A]);

  graph.setup();

  /* after this point it is the view that listens */
  MyApp.start({ graph: graph });
});
