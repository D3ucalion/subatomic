/*******************************************************************
shared functions which can be called from the server or client,
for example the fade function could be called from any Mithril component via
Meteor.sharedFunctions.fade('in', 100, this, true)
********************************************************************/
Meteor.sharedFunctions = {
    fade: function (type, ms, el, full) {
        full == null || full == undefined ? full = true : full;
        var isIn = type === 'in',
            opacity = isIn ? 0 : 1,
            interval = 50,
            duration = ms,
            gap = interval / duration;
        if (isIn) {
            full == true ? el.style.display = 'inline-block' : '';
            el.style.opacity = opacity;
        }

        function func() {
            opacity = isIn ? opacity + gap : opacity - gap;
            el.style.opacity = opacity;
            full == true && opacity <= 0 ? el.style.display = 'none' : '';
            if (opacity <= 0 || opacity >= 1) window.clearInterval(fading);
        }
        var fading = window.setInterval(func, interval);
    },
    debounce: function (func, wait, immediate) {
        var timeout;

        // Calling debounce returns a new anonymous function
        return () => {
            // reference the context and args for the setTimeout function
            var context = this,
                args = arguments;

            // Should the function be called now? If immediate is true
            //   and not already in a timeout then the answer is: Yes
            var callNow = immediate && !timeout;

            clearTimeout(timeout);

            // Set the new timeout
            timeout = setTimeout(() => {

                // Inside the timeout function, clear the timeout variable
                // which will let the next execution run when in 'immediate' mode
                timeout = null;

                // Check if the function already ran with the immediate flag
                if (!immediate) {
                    // Call the original function with apply
                    // apply lets you define the 'this' object as well as the arguments 
                    //    (both captured before setTimeout)
                    func.apply(context, args);
                }
            }, wait);

            // Immediate mode and no wait timer? Execute the function..
            if (callNow) func.apply(context, args);
        }

    }, //Returns a function wrapper with an executed flag. 
    debounceLimiter: function (x) {
        var executed = false;
        return () => {
            if (!executed) {
                executed = true;
                x();
            }
        };
    },
    blogNav: function (name, route) {
        var isCurrent = (m.route() === route);
        var click = function () {
            m.route(route);

        };
        return m("li" +
            (isCurrent ? ".active.glow-font.mono.indexBtn.waves-effect" : ".mono.waves-effect"), (!isCurrent ? {
                onclick: click
            } : ""), [
        m('a.mobile', name)
    ]);

    },
    defaultProfilePhoto: () => {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AsYBC0rs3L0MAAABQpJREFUSMd9lltslMcVx39nZj5/uxjfgoWxTRJHEIJQ1GBBRKK2wUIEx8Rc4jy0VZSklKsQ1I+VolZqlDTKUyvqCOEohEsUIRJxCaWWSYIVp60EgrA8JAoKbbkIY2FjBy/ry+5+M9MHew2svT1PI835/3X+58w5Z4Q8a25v4+TWnSzduklVP10/y0dRozK6RbSpF5FqAO99r7dRwkX2qBhzqvdcYuB8+wcuh73fhGls9e5d9SbQ20TrDaJVgM95T7h7P4n21mW9tfuirN3Tsb01kc+lcofGP78LwJr339sYxMMuFQRbRI2TizaoMETSI0h6ZPysDXgQpQIVBFuCeNi15v33Nt7PNUVBc/tfXzVheDBf451/nubWlx24KBqPShuqnm+i/GcrmVQ3YVE6/drJrb/9aFJBc3vbZOQT5JMQFYYMfHGCa387TlgSp3JuJZVzKymeVczl48cY+OIEKgzv5/cmDA/mlDS3t40rWL17V30QD7tEpPyBcDKjJN79E6+sXMTvliwmgwZAC3T/51u2Hf6GZ9/4AxTFH4B57+9kR9MrOra3JvTSbZtU2dyaPyqtf/pgaoS7N29QefsH9v9yHQbFDGOIG0NoDIsenseZ3qsMldcSlj+UB5WY4KWktqZDVS+tnyVab8ivviAkBwb5+ZPzwQtaa5RSKKXQWoN3LH7sEe4O/ojI1McoWm+oXlo/y/goapRYLMh38DgWzNTU2WJ2nUuA0ayfXQbA8dtJJGOZVxpngdKknJvy3kWpwGcyjUpp3TJdLyjraF04h38nB3jR1dH6VAtv/+MS7/zrB1p/0kKTfZRLd/ppXTQH7R3TcmjdIuv27bkiInX5l857Nka3WBsm+epSL5UzZ1BcHCBAajjL7dQIDQurOZEuZa+pQk2TJu/9VZNr/6k1gMO2lGeJaFhYh0dAJvqywiF4+lEctmWImVYAIlKtoOAlgyZG23AcvMNn72L7E9j+i/hMCryjbXgGgyactsiTafLe9xa6jBvF16aCj1MBLixDVTyBqliAi5XycSrga1NB3BSMEe99r/JRlCjoAFQEik+KqjidHEE5i3KW08kRPimqoiJQ+ZPiQXwUJZSz9miBHIFSOGuRrCUtGlL9kOonLRrJWpy1oNS9KZv/UKw9qsSYU9657CSvMeA96Rs3GLpwgZnX+3irbjlrwyocgkNYG6virbrllFzvY+hCgnRPzz1sLnrnsmLMKV1aUzNWMqeqVrReAjD63ysku7qwPTdJXr/GK48vZ9WTy0hbjx68CB4yNY3UzH6C1LUeus90ovtuM/zd9xCLEZSX59Kzt/ebi5/qm+cv+HlNjT3a6F/YkZHYUGcnRWGIAPFYnL+f+5xhU8SSxxvQA+fxOk5m7sv85avDtH22m6rK2QigRRi9fJnY/PmoILiTTWd3dr/5Tq/k1tzaD/dszFy98sHombNex2JyX8tzNzmECUv5/apmAN7+/CRROklJaRne3etiOzbm488sk6K6xzad+M22vZPjOmcrfvXy6wwP75+uYDaKCIvHZ1F6eAhtCnRXcfGvuw4dOTBlZT73wgq6Dh054ER2AMl8nDaG7FiK7FiqEHnSiezoOnTkwHMvrPj/S3/5S6uXibVbBXlNmNgyhXvFevxBr3V797GOswWXfs4a1jfRfazj7IBNb87iap1SWxx0ItLnx/8THpE+B51OqS1ZXO2ATW/uPtZxtmF905QA/gcdgQI0HzOS/wAAAABJRU5ErkJggg=="
    },
    defaultChatbotPhoto: () => {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABzlBMVEVEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREBEREAgIB4ICAcFBQUBAQEAAAAVFRQBAQEAAAAAAAAAAAAKCgoEBAQAAAAAAAAICAcJCQgGBgUAAAAAAAABAQEFBQUBAQELCwsODg0FBQQAAAAAAAAAAAABAQEAAAAAAAACAgIQEA8FBQUCAgIKCgkiIiAEBAQXFxYGBgYBAQEICAgAAAAGBgYAAAADAwMEBAQCAgENDQwBAQEFBQURERAEBAQEBAQHBwYJCQgBAQEHBwcAAAABAQEGBgYYGBYFBQUJCQgEBAQBAQEGBgUJCQgBAQEEBAQBAQENDQwMDAsDAwMGBgYGBgUWFhUCAgIFBQUAAAAFBQQCAgICAgIFBQUSEhEDAwIAAAAEBAQCAgIPDw4FBQQBAQEAAAAODg0BAQECAgIGBgYBAQEAAAAAAAABAQEBAQEAAAABAQECAgIAAAACAgICAgIAAAACAgICAgIAAAADAwIDAwMAAAADAwMDAwMBAQADAwMEBAMBAQEEBAMEBAQAAAABAQEBAQEUFZ3uAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfgCxsRLBb6WUcVAAAAwUlEQVQ4y6VTORKDMAzUW1KlIh3kART51VYZPuDhvYkFsq0VDsPEhbAOr1crI+IXIL8X0klB6iEACaszAZryCNCUXxmB8zg5DzyakjkHvt/7lrrtnF4evyKVXSnI0aEycWeqCFbZ7EgEmYzfc6ROj5rwnVrUa3KgRFsu0xUl6yXVXB33X8suJPzBmO76hyZ0Nyv/vpI2Dh2C63RU40TwnVrMPRci2ci5cRF+80Hu/psnfaPcEZr/LuCNRU32luJm7wMgfhTe+B/RNwAAAABJRU5ErkJggg=="
    },
    // Helper to build human readible file size strings.
    humanReadableFileSize: function (size) {
        var label = "";
        if (size === 0) {
            label = "0 KB";
        } else if (size && !isNaN(size)) {
            var fileSizeInBytes = size;
            var i = -1;
            do {
                fileSizeInBytes = fileSizeInBytes / 1024;
                i++;
            } while (fileSizeInBytes > 1024);

            var byteUnits = [' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
            label += Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
        }
        return label;
    },
    blogPost0: function (ctrl) {
        return {
            view: function (ctrl) {
                //Prism.highlightAll();
                setTimeout(function () {
                    Prism.highlightAll();


                }, 0)
                index = 0;
                return m('.container', [
                m(".row", [
                    m(".col.s12.center", [
                        m("ul.pagination.flow-text", [
                            m("li.mono", {
                                    onclick: function () {

                                        m.route('/blog/' + index)
                                    }
                                }, [m("a.mono", [m("i.material-icons", "chevron_left")])]),
                            Meteor.sharedFunctions.blogNav('0', '/blog/0'),
                            Meteor.sharedFunctions.blogNav('1', '/blog/1'),
                            Meteor.sharedFunctions.blogNav('2', '/blog/2'),
                            m("li.waves-effect", {
                                    onclick: function () {
                                        index = index + 1;
                                        m.route('/blog/' + index)
                                    }
                                }, [m("a.mono", [m("i.material-icons", "chevron_right")])])
                        ])])]),
                m(".row#BlogContainer", [m(".col.s12.mono", [m('h4.white-text.mono.center', "A few posts"), m('hr'),
                    m("p.mono#blogContent", ["I'm creating this blog as a place to share information about random things i've discovered, from javascript libraries everyone should know about to just about anything else science and technology related."]),
                    m("p.mono#blogContent", "For the most part anything programming related will probably be in the form of a brief guide or tutorial, I might post screen-casts for anything more in depth. Anything non-programming related will likely be short articles."),
                    m("p.mono#blogContent", ["I will also eventually be adding a chat room and possibly some games."]),
                    m("p.mono#blogContent", "More content coming soon")
                ])])
            ])
            }
        }
    },
    blogPost1: function (ctrl) {
        return {
            view: function (ctrl) {
                //Prism.highlightAll();
                setTimeout(function () {
                    Prism.highlightAll();


                }, 0)
                index = 1;
                return m('.container', [
            m(".row", [
                m(".col.s12.center", [
                    m("ul.pagination.flow-text", [
                        m("li.mono", {
                                    onclick: function () {
                                        index = index - 1;
                                        m.route('/blog/' + index)
                                    }
                                }, [m("a.mono", [m("i.material-icons", "chevron_left")])]),
                        Meteor.sharedFunctions.blogNav('0', '/blog/0'),
                        Meteor.sharedFunctions.blogNav('1', '/blog/1'),
                        Meteor.sharedFunctions.blogNav('2', '/blog/2'),
                        m("li.waves-effect", {
                                    onclick: function () {
                                        index = index + 1;
                                        m.route('/blog/' + index)
                                    }
                                }, [m("a.mono", [m("i.material-icons", "chevron_right")])])
                    ])])]),
            m(".row#BlogContainer", [m(".col.s12.mono", [m('h4.white-text.mono.center', "Mithril routing basics."), m('hr'),
                m("p.mono#blogContent", [""]),
                m("p.mono#blogContent", ["As expected Meteor has continued to increase in popularity as a viable server solution, however I continue to see articles comparing it to MVC's like Angular. Meteor isn't really marketing itself as a front end MVC solution anymore, they have placed their MVC Blaze in Maintenance only mode. No new features will be added as they seem to have adopted React as their recommended view layer. It was for the best, DDP is the silver bullet of Meteor, especially since the update that introduced oplog tailing, now DDP updates are pushed to clients without any need for polling or relying on events. Meteor can work with any front end view layer. Abandoning Blaze should give MDG the chance to focus on making DDP and the server side of Meteor even better, including their new DB connector Apollo."]),
                m("p.mono#blogContent", 'For over a year Meteor has been my first backend choice for side projects. It is faster to setup than Express and makes the SDLC fun, as it should be. Especially with Mithril my choice of view layer for Meteor (or everything really). Mithril is a bit more than just a view layer, it is an MVC with a built in router. Yet it is only about 10kb and 2200 lines of JS. Hence why its creator named it Mithril "Stronger and lighter than steel" (Side note, this site was created with Meteor and Mithril.). I will be focusing on practical applications and in depth use cases, for more general information you can visit ',
                            m('a[href="http://mithril.js.org/getting-started.html"][target="_blank"]', 'the getting started page.')),

                m("p.mono#blogContent", "It is often compared with React in the way you use view functions in javascript to define your views, however it takes it a step further by fully eliminating the need for any markup at all. You can instead use the m function syntax to define views in a unique way, which may seem strange at first but quickly grows on you. I've inlcuded a snippet below which shows what a basic controller view setup might look like.", [m('pre', [m('code.lang-javascript',
                            "home = {\n     controller: function(){\n          var ctrl = this;\n     },\n     view: function(ctrl){\n          return m('div.container', 'Hello World')\n     }}")])]),
                m("p.mono#blogContent", "Each route is an object, the Model, View and Conroller are simply members of the object. Therefore you can add as many additional custom members as you would like, such as separate models for data from different sources. This also ties nicely into the way routing is setup and handled in Mithril, I have included an example below of what a basic routing setup would look like. Specific method descriptions can be found at ", m('a[href="http://mithril.js.org/mithril.route.html"][target="_blank"]', 'the routing details page.'), [m('pre', [m('code.lang-javascript',
                            "Home = new Page(home);\nAbout = new Page(about);\nContact = new Page(contact);\nm.route.mode = 'pathname';\nm.route(document.body, '/', {\n     '/': Home,\n     '/about': About,\n     '/contact': Contact})")])]),
                m("p.mono#blogContent", "The routing details page includes descriptions of the various route modes, for this example I am using pathname which requires the route to be exactly as declared with no special characters. Those paths are then assigned to the route objects we have created and each route object is simply passed into a contructor which I have created and included below.", [m('pre', [m('code.lang-javascript',
                            " Page(content){\n     this.view = function(){\n          return [ Menu.view(), \n               m('div.container', content)]}\n}")])]),
                m("p.mono#blogContent", "This will place all route content inside the root container div. After that, routing to the newly created route is as simple as adding 'm.route('/path')' to the click function of any element you wish to use to route to the object associated with this path. This also makes setting the current route to active very simple, you can simply check if we are currently viewing the route associated with this nav item, if so add the appropriate class.", [m('pre', [m('code.lang-javascript',
                            "let isCurrent = (m.route() === route);\nisCurrent ? '.active' : '.not-active'")])]),
                m("p.mono#blogContent", "However if you are building a nav with multiple routes, I suggest using a universal constructor to create them which sets up routing and active route declarations at the same time. Something like what I have included below.", [m('pre', [m('code.lang-javascript',
                            "function nav(name, route){\n     var isCurrent = (m.route() === route);\n     var click = function(){ \n     m.route(route)};\nreturn m('li'+(isCurrent \n     ? '.active' \n     : ''), \n     (!isCurrent ? {\n     onclick: click\n} :''),[\n     m('a.mobile', name)\n])}")])]),
                m("p.mono#blogContent", "Such that creating your list of nav items would look something like this.", [m('pre', [m('code.lang-javascript',
                            "m('ul.right.hide-on-med-and-down#nav-mobile',\n [nav('Home',  '/'),\n  nav('About',  '/about'),\n  nav('Contact',  '/contact')\n ])")])]),

                m("p.mono#blogContent", "Then you can use a root object to mount your routes to. For this example I have called it App. Then you can declare your root controller and include all of routing logic inside of the App.controller function.", [m('pre', [m('code.lang-javascript',
                            "//App view model \nApp = {};\nApp.controller = function(){\nHome = new Page(home);\nAbout = new Page(about);\nContact = new Page(contact);\nm.route.mode = 'pathname';\nm.route(document.body, '/', {\n     '/': Home,\n     '/about': About,\n     '/contact': Contact})\n};")])]),
                m("p.mono#blogContent", "And that is the basics of routing with Mithri. It's one of my favorite features of Mithril, and makes it easy to quickly setup all your route definitions without sacrificing any of the features you would expect from a router.\nI will cover more on Mithril in future posts.", [m('pre', [m('code.lang-javascript',
                            "")])])
            ])])
        ])
            }
        }
    },
    blogPost2: function (ctrl) {
        return {
            view: function (ctrl) {

                setTimeout(function () {
                    Prism.highlightAll();


                }, 0)
                index = 2;
                return m('.container', [
                m(".row", [
                    m(".col.s12.center", [
                        m("ul.pagination.flow-text", [
                            m("li.mono", {
                                    onclick: function () {
                                        index = index - 1;
                                        m.route('/blog/' + index)
                                    }
                                }, [m("a.mono", [m("i.material-icons", "chevron_left")])]),
                            Meteor.sharedFunctions.blogNav('0', '/blog/0'),
                            Meteor.sharedFunctions.blogNav('1', '/blog/1'),
                            Meteor.sharedFunctions.blogNav('2', '/blog/2'),
                            m("li.waves-effect", {
                                    onclick: function () {
                                        index = index + 1;
                                        m.route('/blog/' + index)
                                    }
                                }, [m("a.mono", [m("i.material-icons", "chevron_right")])])
                        ])])]),
                m(".row#BlogContainer", m(".col.s12.mono", [m('h4.white-text.mono.center', "DOT NET CORE ON LINUX"), m('hr'),
                    m("p.mono#blogContent", [".NET core 1.0 preview 2 was recently released which made me decide to finally take a look at building a simple .NET core app to run and test in a Linux environment. Although Microsoft has made some huge strides in their attempts to make dot net cross platform, they still have a ways to go."]),
                    m("p.mono#blogContent", ["There are still basic things it doesn't do, like runtime flags to set the port and ip address. Simply running the command 'dotnet run' will only run the application on the localhost network adapter making it inaccessible. This issue combined with no native runtime flags to change the port and IP made it a little frustrating to run on Linux for the first time."]),
                    m("p.mono#blogContent", "I decided to just set the ENV_VAR to expose the api outside localhost. 'ASPNETCORE_URLS='https://0.0.0.0:5000' dotnet run' ", m('br'), "I've included the root of the application below.", [m('pre', [m('code.lang-csharp',
                            "namespace WebApiCore\n{\n    public class Program\n    {\n        public static void Main(string[] args)\n        {\n            var host = new WebHostBuilder()\n                .UseKestrel()\n                .UseContentRoot(Directory.GetCurrentDirectory())\n                .UseIISIntegration()\n                .UseStartup()\n                .Build();\n            host.Run();\n        }\n    }\n}")])]),

                    m("p.mono#blogContent", "Then create your model.", [m('pre', [m('code.lang-csharp',
                            "namespace WebApiCore.Models\n{\n namespace TodoApi.Models\n {\n   public class TodoItem\n  {\n    public ObjectId Id { get; set; }\n    [BsonElement('Key')]\n    public string Key { get; set; }\n    [BsonElement('Name')]\n    public string Name { get; set; }\n    [BsonElement('IsComplete')]\n    public bool IsComplete { get; set;  }\n   }\n }\n}")])]),
                    m("p.mono#blogContent", "and the interface.", [m('pre', [m('code.lang-csharp',
                            "namespace WebApiCore.Models\n{\n   public interface ITodoRepository\n   {\n     void Add(TodoItem item);\n     Task<List<TodoItem>> GetAll();\n     Task<TodoItem> Find(string key);\n     void Remove(string key);\n     void Update(TodoItem item);\n    }\n}")])])
                ]))
            ])
            }
        }
    }
}
