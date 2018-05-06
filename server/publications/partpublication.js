Meteor.publish('partcol', function () {
  if (! this.userId) {
    return this.ready();
  }

  return Parts.find({});
});