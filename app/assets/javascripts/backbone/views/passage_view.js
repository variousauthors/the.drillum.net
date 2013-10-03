
MyApp.Views.PassageView = Backbone.Marionette.ItemView.extend({
  template: 'backbone/templates/passage_view',

  onRender: function() {
    console.log("EVENT  PassageView->render");
  }

});

