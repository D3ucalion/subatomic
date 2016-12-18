HygroItems = new Mongo.Collection("HygroItems");

if (Meteor.isServer) {
Meteor.publish('HygroItems', function hygroPublication() {
    return HygroItems.find();
  });
}