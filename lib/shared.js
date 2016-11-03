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

  blogPost1: function() {
    return [m(".col.s12.flow-text", [m('h4.white-text.mono.center', "Stronger and lighter than steel."), m('hr'),
                  m("p.mono#blogContent", ["Javascript in 2016 has become complicated, trying to decide the best framework for your next project can be quite difficult. Of course most people seem to choose one of the big 3, Angular, React or Ember. These are the most popular and trendy frameworks which also have a vast amount of tutorials and plugins available."]),
                 m("p.mono#blogContent", ["Another framework that has really been gaining some traction is Meteor, however Meteor isn't really marketing itself as a front end MVC solution, they have placed their MVC Blaze in Maintenence only mode. No new features will be added as they have now adopted React as their recommended view layer. It was for the best, DDP is the silver bullet of Meteor and it can work with any front end view layer. Abondoning Blaze should give MDG the chance to focus on making DDP and the server side of Meteor even better, including their new DB connector Apollo."]),
                    m("p.mono#blogContent", 'For over a year Meteor has been my first choice for side projects. It is faster to setup than Express and makes the SDLC fun, as it should be. However today I would like to write about Mithril my choice of view layer for Meteor (or everything really). Mithril is a bit more than just a view layer, it is an MVC with a built in router. Yet it is only about 10kb, or 2200 lines of cleanly written JS. Hence why its creator named it Mithril "Stronger and lighter than steel" (Side note, this site was created with Meteor and Mithril.). I will be focusing on practical applications and in depth use cases, for more general information you can visit ', 
                      m('a[href="http://mithril.js.org/getting-started.html"][target="_blank"]', 'the getting started page.')),
                                     
                    m("p.mono#blogContent", "It is often compared with React in the way you use view functions in javascript to define your views, however it takes it a step further by fully eliminating the need for any markup at all. You can instead use the m function syntax to define views in a unique way, which may seem strange at first but quickly grows on you. I've inlcuded a snippet below which shows what a basic controller view setup might look like.", 
                        [m('pre',[m('code.lang-javascript',
                        "home = {\ncontroller: function(){\nvar ctrl = this;\n},\nview: function(ctrl){\nreturn m('div.container', 'Hello World')\n}}")])]),              
                    m("p.mono#blogContent", "Each route is an object, the Model, View and Conroller are simply members of the object. Therefore you can add as many additional custom members as you would like, such as separate models for data from different sources. This also ties nicely into the way routing is setup and handled in Mithril, I have included an example below of what a basic routing setup would look like. Specific method descriptions can be found at ", m('a[href="http://mithril.js.org/mithril.route.html"][target="_blank"]', 'the routing details page.'),
                        [m('pre',[m('code.lang-javascript',
                        "Home = new Page(home);\nAbout = new Page(about);\nContact = new Page(contact);\nm.route.mode = 'pathname';\nm.route(document.body, '/', {\n'/': Home,\n'/about': About,\n'/contact': Contact})\n")])]),    
                    m("p.mono#blogContent", "The routing details page includes descriptions of the various route modes, for this example I am using pathname which requires the route to be exactly as declared with no special characters. Those paths are then assigned to the route objects we have created and each route object is simply passed into a contructor which I have created and included below.",
                        [m('pre',[m('code.lang-javascript',
                        "function Page(content){\n this.view = function(){\nreturn [ Menu.view(), \nm('div.container', content)]}}")])]),
                    m("p.mono#blogContent", "This will place all route content inside the root container div. After that, routing to the newly created route is as simple as adding 'm.route('/path')' to the click function of any element you wish to use to route to the object associated with this path. This also makes setting the current route to active very simple, you can simply check if we are currently viewing the route associated with this nav item, if so add the appropriate class.",
                        [m('pre',[m('code.lang-javascript',
                        "let isCurrent = (m.route() === route);\nisCurrent ? '.active' : '.not-active'")])]),
                    m("p.mono#blogContent", "However if you are building a nav with multiple routes, I suggest using a universal contructor to create them which sets up routing and active route declarations at the same time. Something like what I have included below.",
                        [m('pre',[m('code.lang-javascript',
                        "function nav(name, route){\nvar isCurrent = (m.route() === route);\nvar click = function(){ \nm.route(route)};\nreturn m('li'+\n(isCurrent ? '.active' : ''), (!isCurrent ? {\nonclick: click\n} :''),[\nm('a.mobile', name)\n])}")])]),                 
                                     
                    m("p.mono#blogContent", "Conclusion")
                ])]
  }
}
