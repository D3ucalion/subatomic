TodoItems = new Mongo.Collection("TodoItems");

if (Meteor.isServer) {
Meteor.publish('TodoItems', function todoPublication() {
    return TodoItems.find();
  });
}