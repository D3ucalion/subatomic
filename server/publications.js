Meteor.publish('messages', function (channel) {
	return Messages.find({channel: channel});
});
Meteor.publish('rooms', function (channel) {
	return Rooms.find({channel: channel});
});