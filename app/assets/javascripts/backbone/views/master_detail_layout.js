MyApp.Views.MasterDetailLayout = Backbone.Marionette.Layout.extend({
  template: 'backbone/templates/master_detail_layout',

  regions: {
    master: "#master",
    detail: "#detail"
  },

  initialize: function() {
    console.log('MasterDetailLayout->initialize');

    var self = this;
    _.each(_.keys(this.regions), function(region_name) {
      var name = region_name.charAt(0).toUpperCase() + region_name.slice(1);

      self.listenTo(self[region_name], 'show', self['on' + name + 'Show']);
    });
  },

  onMasterShow: function(view) {
    console.log('EVENT  MasterDetailLayout->onMasterShow');

    this.listenTo(view, 'graph:selected', this.wat);
  },

  onDetailShow: function() {
    console.log('EVENT  MasterDetailLayout->onDetailShow');
  },

  wat: function() {
    console.log('EVENT  MasterDetailLayout->WAT');
  },

  onShow: function(region) {
    console.log('EVENT  MasterDetailLayout->onShow');
    console.log(region);
  }

});
