
FlowRouter.route('/', {

  subscriptions: function(params, queryParams) {
    console.log (params);
    this.register('partcol', Meteor.subscribe('partcol'));
    //Meteor.subscribe('partcol');
  },

  waitOn: function () {
    return Meteor.subscribe('partcol');
  },

  data: function () {
    return Parts.find({}).fetch();
  },

  action: function () {
    Tracker.autorun(function() {
      var ready = FlowRouter.subsReady("partcol");

      Tracker.nonreactive(function() {

        if (ready) {
          BlazeLayout.render("mainLayout", {content: "dataTables"});
        }
      })
    });
  }
});