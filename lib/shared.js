/*******************************************************************
shared functions which can be called from the server or client,
for example the fade function could be called from any Mithril component via
Meteor.sharedFunctions.fade('in', 100, this, true)
********************************************************************/
Meteor.sharedFunctions = {
  fade: function(type, ms, el, full){
    full == null || full == undefined ? full = true : full;
    var isIn = type === 'in',
        opacity = isIn ? 0 : 1,
        interval = 50,
        duration = ms,
        gap = interval / duration;
    if(isIn) {
      full == true ? el.style.display = 'inline-block' : '';
      el.style.opacity = opacity;
    }
    function func() {
      opacity = isIn ? opacity + gap : opacity - gap;
      el.style.opacity = opacity;
      full == true && opacity <= 0 ? el.style.display = 'none' : '';
      if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
    }
    var fading = window.setInterval(func, interval);
  },
  blogNav: function (name, route){
    var isCurrent = (m.route() === route);
    var click = function(){
        m.route(route);
        
    };
    return m("li"+
        (isCurrent ? ".active.glow-font.mono.indexBtn.waves-effect" : ".mono.waves-effect"), (!isCurrent ? {
        onclick: click
    } :""),[
        m('a.mobile', name)
    ]);
      
  },
    blogPost0: function (ctrl) {
        return { view: function(ctrl){
            //Prism.highlightAll();
        setTimeout(function(){
        Prism.highlightAll();
        m.redraw(true);
      
        }, 0)
            index = 0;
            return m('.container', [
                m(".row", [
                    m(".col.s12.center", [
                        m("ul.pagination.flow-text", [
                            m("li.mono", {onclick: function () {

                                m.route('/blog/'+index)
                            }},  [m("a.mono", [m("i.material-icons", "chevron_left")])]),
                            Meteor.sharedFunctions.blogNav('0', '/blog/0'),
                            Meteor.sharedFunctions.blogNav('1', '/blog/1'),
                            Meteor.sharedFunctions.blogNav('2', '/blog/2'),
                            m("li.waves-effect", {onclick: function () {
                                index = index+1;
                                m.route('/blog/'+index)
                            }}, [m("a.mono", [m("i.material-icons", "chevron_right")])])
                        ])])]),
                m(".row#BlogContainer", [m(".col.s12.mono", [m('h4.white-text.mono.center', "A few posts"), m('hr'),
                    m("p.mono#blogContent", ["I'm creating this blog as a place to share information about random things i've learned from javascript libraries everyone should know about to just about anything else science and technology related."]),
                    m("p.mono#blogContent", "For the most part anything programming related will probably be in the form of a brief guide or tutorial, I might post screen-casts for anything more in depth. Anything non-programming related will likely be short articles."),
                    m("p.mono#blogContent", ["I will also eventually be adding a chat room and possibly some games."]),
                    m("p.mono#blogContent", "More content coming soon")
                ])])
            ])
        }}
    },
  blogPost1: function(ctrl) {
    return { view: function(ctrl){
        //Prism.highlightAll();
        setTimeout(function(){
        Prism.highlightAll();
        m.redraw(true);
      
        }, 0)
        index = 1;
        return m('.container', [
            m(".row", [
                m(".col.s12.center", [
                    m("ul.pagination.flow-text", [
                        m("li.mono",{onclick: function () {
                            index = index-1;
                            m.route('/blog/'+index)
                        }}, [m("a.mono", [m("i.material-icons", "chevron_left")])]),
                        Meteor.sharedFunctions.blogNav('0', '/blog/0'),
                        Meteor.sharedFunctions.blogNav('1', '/blog/1'),
                        Meteor.sharedFunctions.blogNav('2', '/blog/2'),
                        m("li.waves-effect",{onclick: function () {
                            index = index+1;
                            m.route('/blog/'+index)
                        }}, [m("a.mono", [m("i.material-icons", "chevron_right")])])
                    ])])]),
            m(".row#BlogContainer", [m(".col.s12.mono", [m('h4.white-text.mono.center', "Stronger and lighter than steel."), m('hr'),
                m("p.mono#blogContent", [""]),
                m("p.mono#blogContent", ["As expected Meteor has continued to increase in popularity as a viable server solution, however I continue to see articles comparing it to MVC's like Angular. Meteor isn't really marketing itself as a front end MVC solution anymore, they have placed their MVC Blaze in Maintenance only mode. No new features will be added as they seem to have adopted React as their recommended view layer. It was for the best, DDP is the silver bullet of Meteor, especially since the update that introduced oplog tailing, now DDP updates are pushed to clients without any need for polling or relying on events. Meteor can work with any front end view layer. Abandoning Blaze should give MDG the chance to focus on making DDP and the server side of Meteor even better, including their new DB connector Apollo."]),
                m("p.mono#blogContent", 'For over a year Meteor has been my first backend choice for side projects. It is faster to setup than Express and makes the SDLC fun, as it should be. Especially with Mithril my choice of view layer for Meteor (or everything really). Mithril is a bit more than just a view layer, it is an MVC with a built in router. Yet it is only about 10kb, or 2200 lines of cleanly written JS. Hence why its creator named it Mithril "Stronger and lighter than steel" (Side note, this site was created with Meteor and Mithril.). I will be focusing on practical applications and in depth use cases, for more general information you can visit ',
                    m('a[href="http://mithril.js.org/getting-started.html"][target="_blank"]', 'the getting started page.')),

                m("p.mono#blogContent", "It is often compared with React in the way you use view functions in javascript to define your views, however it takes it a step further by fully eliminating the need for any markup at all. You can instead use the m function syntax to define views in a unique way, which may seem strange at first but quickly grows on you. I've inlcuded a snippet below which shows what a basic controller view setup might look like.",
                    [m('pre',[m('code.lang-javascript',
                        "home = {\n     controller: function(){\n          var ctrl = this;\n     },\n     view: function(ctrl){\n          return m('div.container', 'Hello World')\n     }}")])]),
                m("p.mono#blogContent", "Each route is an object, the Model, View and Conroller are simply members of the object. Therefore you can add as many additional custom members as you would like, such as separate models for data from different sources. This also ties nicely into the way routing is setup and handled in Mithril, I have included an example below of what a basic routing setup would look like. Specific method descriptions can be found at ", m('a[href="http://mithril.js.org/mithril.route.html"][target="_blank"]', 'the routing details page.'),
                    [m('pre',[m('code.lang-javascript',
                        "Home = new Page(home);\nAbout = new Page(about);\nContact = new Page(contact);\nm.route.mode = 'pathname';\nm.route(document.body, '/', {\n     '/': Home,\n     '/about': About,\n     '/contact': Contact})")])]),
                m("p.mono#blogContent", "The routing details page includes descriptions of the various route modes, for this example I am using pathname which requires the route to be exactly as declared with no special characters. Those paths are then assigned to the route objects we have created and each route object is simply passed into a contructor which I have created and included below.",
                    [m('pre',[m('code.lang-javascript',
                        "function Page(content){\n     this.view = function(){\n          return [ Menu.view(), \n               m('div.container', content)]}\n}")])]),
                m("p.mono#blogContent", "This will place all route content inside the root container div. After that, routing to the newly created route is as simple as adding 'm.route('/path')' to the click function of any element you wish to use to route to the object associated with this path. This also makes setting the current route to active very simple, you can simply check if we are currently viewing the route associated with this nav item, if so add the appropriate class.",
                    [m('pre',[m('code.lang-javascript',
                        "let isCurrent = (m.route() === route);\nisCurrent ? '.active' : '.not-active'")])]),
                m("p.mono#blogContent", "However if you are building a nav with multiple routes, I suggest using a universal constructor to create them which sets up routing and active route declarations at the same time. Something like what I have included below.",
                    [m('pre',[m('code.lang-javascript',
                        "function nav(name, route){\n     var isCurrent = (m.route() === route);\n     var click = function(){ \n     m.route(route)};\nreturn m('li'+(isCurrent \n     ? '.active' \n     : ''), \n     (!isCurrent ? {\n     onclick: click\n} :''),[\n     m('a.mobile', name)\n])}")])]),
                m("p.mono#blogContent", "Then creating your list of nav items would look something like this.",
                    [m('pre',[m('code.lang-javascript',
                        "m('ul.right.hide-on-med-and-down#nav-mobile',\n [nav('Home',  '/'),\n  nav('About',  '/about'),\n  nav('Contact',  '/contact')\n ])")])]),

                m("p.mono#blogContent", "Then you can use a root object to mount your routes to. For this example I have called it App. Then you can declare your root controller and include all of routing logic inside of the App.controller function.",[m('pre',[m('code.lang-javascript',
                        "//App view model \nApp = {};\nApp.controller = function(){\nHome = new Page(home);\nAbout = new Page(about);\nContact = new Page(contact);\nm.route.mode = 'pathname';\nm.route(document.body, '/', {\n     '/': Home,\n     '/about': About,\n     '/contact': Contact})\n};")])])
            ])])
        ])
    }}
  },
    blogPost2: function (ctrl) {
        return { view: function(ctrl){

        setTimeout(function(){
        Prism.highlightAll();
        m.redraw(true);
      
        }, 0)
            index = 2;
            return m('.container', [
                m(".row", [
                    m(".col.s12.center", [
                        m("ul.pagination.flow-text", [
                            m("li.mono",{onclick: function () {
                                index = index-1;
                                m.route('/blog/'+index)
                            }}, [m("a.mono", [m("i.material-icons", "chevron_left")])]),
                            Meteor.sharedFunctions.blogNav('0', '/blog/0'),
                            Meteor.sharedFunctions.blogNav('1', '/blog/1'),
                            Meteor.sharedFunctions.blogNav('2', '/blog/2'),
                            m("li.waves-effect",{onclick: function () {
                                index = index+1;
                                m.route('/blog/'+index)
                            }}, [m("a.mono", [m("i.material-icons", "chevron_right")])])
                        ])])]),
                m(".row#BlogContainer", m(".col.s12.mono", [m('h4.white-text.mono.center', "DOT NET CORE ON LINUX"), m('hr'),
                    m("p.mono#blogContent", [".NET core 1.0 preview 2 was recently released which made me decide to finally take a look at building a simple .NET core app to run and test in a Linux environment. Although Microsoft has made some huge strides in their attempts to make dot net cross platform, they still have a ways to go."]),
                    m("p.mono#blogContent", ["There are still basic things it doesn't do, like runtime flags to set the port and ip address. Simply running the command 'dotnet run' will only run the application on the localhost network adapter making it inaccessible. This is something very basic that Rails has done for years, and so do newer technologies like Meteor. This issue combined with no native runtime flags to change the port and IP made it a little frustrating to run on Linux for the first time."]),
                    m("p.mono#blogContent", "I decided to just set the ENV_VAR to expose the api outside localhost. 'ASPNETCORE_URLS='https://0.0.0.0:5000' dotnet run' ",m('br'), "I've included the root of the application below.",
                        [m('pre',[m('code.lang-csharp',
                            "namespace WebApiCore\n{\n    public class Program\n    {\n        public static void Main(string[] args)\n        {\n            var host = new WebHostBuilder()\n                .UseKestrel()\n                .UseContentRoot(Directory.GetCurrentDirectory())\n                .UseIISIntegration()\n                .UseStartup()\n                .Build();\n            host.Run();\n        }\n    }\n}")])]),

                    m("p.mono#blogContent", "More examples coming soon")
                ]))
            ])
        }}
    }
}
