Meteor.startup(function () {

    //removes pre-existing users before seeding
    Meteor.users.remove({});

    var userPhoto = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AsYBC0rs3L0MAAABQpJREFUSMd9lltslMcVx39nZj5/uxjfgoWxTRJHEIJQ1GBBRKK2wUIEx8Rc4jy0VZSklKsQ1I+VolZqlDTKUyvqCOEohEsUIRJxCaWWSYIVp60EgrA8JAoKbbkIY2FjBy/ry+5+M9MHew2svT1PI835/3X+58w5Z4Q8a25v4+TWnSzduklVP10/y0dRozK6RbSpF5FqAO99r7dRwkX2qBhzqvdcYuB8+wcuh73fhGls9e5d9SbQ20TrDaJVgM95T7h7P4n21mW9tfuirN3Tsb01kc+lcofGP78LwJr339sYxMMuFQRbRI2TizaoMETSI0h6ZPysDXgQpQIVBFuCeNi15v33Nt7PNUVBc/tfXzVheDBf451/nubWlx24KBqPShuqnm+i/GcrmVQ3YVE6/drJrb/9aFJBc3vbZOQT5JMQFYYMfHGCa387TlgSp3JuJZVzKymeVczl48cY+OIEKgzv5/cmDA/mlDS3t40rWL17V30QD7tEpPyBcDKjJN79E6+sXMTvliwmgwZAC3T/51u2Hf6GZ9/4AxTFH4B57+9kR9MrOra3JvTSbZtU2dyaPyqtf/pgaoS7N29QefsH9v9yHQbFDGOIG0NoDIsenseZ3qsMldcSlj+UB5WY4KWktqZDVS+tnyVab8ivviAkBwb5+ZPzwQtaa5RSKKXQWoN3LH7sEe4O/ojI1McoWm+oXlo/y/goapRYLMh38DgWzNTU2WJ2nUuA0ayfXQbA8dtJJGOZVxpngdKknJvy3kWpwGcyjUpp3TJdLyjraF04h38nB3jR1dH6VAtv/+MS7/zrB1p/0kKTfZRLd/ppXTQH7R3TcmjdIuv27bkiInX5l857Nka3WBsm+epSL5UzZ1BcHCBAajjL7dQIDQurOZEuZa+pQk2TJu/9VZNr/6k1gMO2lGeJaFhYh0dAJvqywiF4+lEctmWImVYAIlKtoOAlgyZG23AcvMNn72L7E9j+i/hMCryjbXgGgyactsiTafLe9xa6jBvF16aCj1MBLixDVTyBqliAi5XycSrga1NB3BSMEe99r/JRlCjoAFQEik+KqjidHEE5i3KW08kRPimqoiJQ+ZPiQXwUJZSz9miBHIFSOGuRrCUtGlL9kOonLRrJWpy1oNS9KZv/UKw9qsSYU9657CSvMeA96Rs3GLpwgZnX+3irbjlrwyocgkNYG6virbrllFzvY+hCgnRPzz1sLnrnsmLMKV1aUzNWMqeqVrReAjD63ysku7qwPTdJXr/GK48vZ9WTy0hbjx68CB4yNY3UzH6C1LUeus90ovtuM/zd9xCLEZSX59Kzt/ebi5/qm+cv+HlNjT3a6F/YkZHYUGcnRWGIAPFYnL+f+5xhU8SSxxvQA+fxOk5m7sv85avDtH22m6rK2QigRRi9fJnY/PmoILiTTWd3dr/5Tq/k1tzaD/dszFy98sHombNex2JyX8tzNzmECUv5/apmAN7+/CRROklJaRne3etiOzbm488sk6K6xzad+M22vZPjOmcrfvXy6wwP75+uYDaKCIvHZ1F6eAhtCnRXcfGvuw4dOTBlZT73wgq6Dh054ER2AMl8nDaG7FiK7FiqEHnSiezoOnTkwHMvrPj/S3/5S6uXibVbBXlNmNgyhXvFevxBr3V797GOswWXfs4a1jfRfazj7IBNb87iap1SWxx0ItLnx/8THpE+B51OqS1ZXO2ATW/uPtZxtmF905QA/gcdgQI0HzOS/wAAAABJRU5ErkJggg=="

    defaultChatbotPhoto = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABzlBMVEVEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREAgIB4ICAcFBQUBAQEAAAAVFRQBAQEAAAAAAAAAAAAKCgoEBAQAAAAAAAAICAcJCQgGBgUAAAAAAAABAQEFBQUBAQELCwsODg0FBQQAAAAAAAAAAAABAQEAAAAAAAACAgIQEA8FBQUCAgIKCgkiIiAEBAQXFxYGBgYBAQEICAgAAAAGBgYAAAADAwMEBAQCAgENDQwBAQEFBQURERAEBAQEBAQHBwYJCQgBAQEHBwcAAAABAQEGBgYYGBYFBQUJCQgEBAQBAQEGBgUJCQgBAQEEBAQBAQENDQwMDAsDAwMGBgYGBgUWFhUCAgIFBQUAAAAFBQQCAgICAgIFBQUSEhEDAwIAAAAEBAQCAgIPDw4FBQQBAQEAAAAODg0BAQECAgIGBgYBAQEAAAAAAAABAQEBAQEAAAABAQECAgIAAAACAgICAgIAAAACAgICAgIAAAADAwIDAwMAAAADAwMDAwMBAQADAwMEBAMBAQEEBAMEBAQAAAABAQEBAQEUFZ3uAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfgCxsRLBb6WUcVAAAAwUlEQVQ4y6VTORKDMAzUW1KlIh3kART51VYZPuDhvYkFsq0VDsPEhbAOr1crI+IXIL8X0klB6iEACaszAZryCNCUXxmB8zg5DzyakjkHvt/7lrrtnF4evyKVXSnI0aEycWeqCFbZ7EgEmYzfc6ROj5rwnVrUa3KgRFsu0xUl6yXVXB33X8suJPzBmO76hyZ0Nyv/vpI2Dh2C63RU40TwnVrMPRci2ci5cRF+80Hu/psnfaPcEZr/LuCNRU32luJm7wMgfhTe+B/RNwAAAABJRU5ErkJggg=="


    Accounts.createUser({
        username: "test",
        email: "test@example.com",
        password: "password",
        profile: {
            online: false,
            lastLogin: Date.now(),
            idle: true,
            photo: userPhoto
        }
    });

    Factory.define('message', Messages, {
        text: function () {
            return "Greetings, welcome to the default channel"
        },
        user: Meteor.uuid(),
        timestamp: Date.now(),
        name: "chatbot",
        room: "Default",
        id: function () {
            return Meteor.uuid()
        },
        edited: false,
        photo: defaultChatbotPhoto
    });
    Factory.define('message2', Messages, {
        text: function () {
            return "Greetings, welcome to the random channel."
        },
        user: Meteor.uuid(),
        timestamp: Date.now(),
        name: "chatbot",
        room: "Random",
        id: function () {
            return Meteor.uuid()
        },
        edited: false,
        photo: defaultChatbotPhoto
    });
    Factory.define('room1', Rooms, {
        owner: Meteor.users.findOne()._id,
        ownerName: Meteor.users.findOne().username,
        timestamp: Date.now(),
        room: "Default",
        isPrivate: false
    });
    Factory.define('room2', Rooms, {
        owner: Meteor.users.findOne()._id,
        ownerName: Meteor.users.findOne().username,
        timestamp: Date.now(),
        room: "Random",
        isPrivate: false
    });
    // Add this if you want to remove all messages before seeding
    Messages.remove({});
    Rooms.remove({});
    if (Messages.find({}).count() === 0) {
        _(1).times(function (n) {
            Factory.create('message');
            Factory.create('message2');
        });
    }
    if (Rooms.find({}).count() === 0) {
        _(1).times(function (n) {
            Factory.create('room1');
            Factory.create('room2');
        });
    }
});