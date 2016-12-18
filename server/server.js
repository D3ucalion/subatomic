 Meteor.startup(function () {
     // code to run on server at startup

 });
 //methods to call from the client
 Meteor.methods({
     //request to external api    
     'ResultsExternal': function () {
         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         var res = HTTP.call('GET', 'http://jsonplaceholder.typicode.com/posts',
             function (err, res1) {
                 if (err) {
                     v.return(err);
                 } else {
                     v.return(res1);
                 }
             });
         return v.wait();
     },
     'TodoItems': function () {
         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         var res = HTTP.call('GET', 'http://localhost:51800/api/todo/',
             function (err, res1) {
                 if (err) {
                     v.return(err);
                 } else {
                     v.return(res1);
                 }
             });
         return v.wait();
     },
     'TodoItem': function (e) {
         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         var res = HTTP.call('GET', 'http://localhost:51800/api/todo/' + e,
             function (err, res1) {
                 if (err) {
                     v.return(err);
                 } else {
                     v.return(res1);
                 }
             });
         return v.wait();
     },
     'TodoLocal': function (e) {
         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         let todos = TodoItems.find().fetch();
         v.return(todos);
         return v.wait();
     },
     'HygroItems': function () {
         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         var res = HTTP.call('GET', 'http://localhost:51800/api/hygro/',
             function (err, res1) {
                 if (err) {
                     v.return(err);
                 } else {
                     v.return(res1);
                 }
             });
         return v.wait();
     },
     'addMessages': function (e) {

         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         let msgs = Messages.insert({
             text: e.text,
             user: e.userId,
             timestamp: e.timestamp,
             name: e.userName,
             room: e.room,
             id: e.id,
             edited: e.edited,
             photo: e.photo
         });
         v.return(msgs);
         return v.wait();
     },
     'addRoom': function (e) {

         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         let room = Rooms.insert({
             room: e.room,
             owner: e.owner,
             timestamp: e.timestamp,
             ownerName: e.ownerName
         });
         v.return(room);
         return v.wait();
     },
     'updateMessage': function (e) {
         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         let message = Messages.update({
             id: e.id
         }, {
             $set: {
                 text: e.text,
                 id: e.id,
                 edited: true
             }
         });
         v.return(message);
         return v.wait();
     },
     'UpdatePhoto': function (e) {
         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         let photo = Meteor.users.update({
             _id: e.user
         }, {
             $set: {
                 'profile.photo': e.photo
             }
         });
         v.return(photo);
         return v.wait();
     },
     'UpdateUsername': function (e) {
         Future = Npm.require('fibers/future');
         let v = new Future();
         this.unblock();
         let username = Meteor.users.update({
             _id: e.user
         }, {
             $set: {
                 'username': e.username
             }
         });
         v.return(username);
         return v.wait();
     }
 });