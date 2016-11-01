//meteor helper which replaces Blaze with Mithril
var reactive = function(controller) {
  return function() {
    var instance = {};
    var computation = Deps.autorun(function() {
      m.startComputation()
      controller.call(instance)
      m.endComputation()
    });
    instance.onunload = function() {
      computation.stop();
    };
    return instance;
  };
};

//App view model
App = {};

//application actions
App.Action = function() {
    return this.someAction;
};
var Menu = {
  controller: function(){
    var ctrl = this;
	},
  view: function(ctrl){
    setTimeout(function(){
      m.redraw(true);
    }, 0)
    return [setFavicon(),m("div.navbar-fixed", [
    m('nav.page-header.transparent#nav', {
              role: "navigation"
            }, [        
      m('div.nav-wrapper.container', [
          m('a.brand-logo.left',[m('a.left.glow-font.mono', [
              "SubAtomic"
          ])], ''),
          [m("a.createBtn.Pointer.navicon[data-activates='mobile']", {onclick: function (e) {
              document.getElementById('mobile').style = "transform: translateX(0px);"
              }},
              "Menu")],
          m('ul.right.hide-on-med-and-down#nav-mobile', [
          		nav("Home",  "/"),
          		nav("About",  "/about"),
          		nav("Contact",  "/contact"),
          		Meteor.user() ? nav("Results",  "/results") : '',
                Meteor.user() ? logout('Logout', '/') : nav("Sign in",  "/auth")
          	]),
          m("ul.side-nav.page-header#mobile", [
              nav("Home",  "/"),
              nav("About",  "/about"),
              nav("Contact",  "/contact"),
              Meteor.user() ? nav("Results",  "/results") : '',
              Meteor.user() ? logout('Logout', '/') : nav("Sign in",  "/auth")
          ])
      ])])])]
  	function btn(name, route){
	  	var isCurrent = (m.route() === route);
		  var click = function(){ m.route(route); };
  		return m("button"+
    		(isCurrent ? ".btn.btn-default.navbar-btn.active" : ".btn.btn-default.navbar-btn"),{
          onclick: click, type: 'button'
        }, name);
	  }
	  function nav(name, route){
		  var isCurrent = (m.route() === route);
  		var click = function(){ 
        m.route(route); 
      };
		  return m("li"+
    		(isCurrent ? ".active.glow-font.mono" : ".mono"), (!isCurrent ? {
          onclick: click
        } :""),[
          m('a.mobile', name)
        ]);
	  }
      function setFavicon(){
          if(document.getElementById('Favi') == null || undefined){
                  let head = document.head || (document.head = document.getElementsByTagName('head')[0]);
                  let favicon = document.createElement('link');
                  let title = document.createElement('title');
                  title.textContent = "SUBATOMIC";
                  favicon.rel = 'shortcut icon';
                  favicon.type = 'image/x-icon';
                  favicon.href = 'images/icons/Favicon.ico';
                  favicon.id = 'Favi';
                  head.appendChild(title);
                  head.appendChild(favicon) }
      }
  	function logout(name, route){
	    var x1 = function(){
        Meteor.logout();
        m.route('/');
        //window.location.reload()
      };
	    return m('li', [
        m("a.Pointer", {
          onclick: () => {
            Meteor.logout();
              m.route('/');
            //window.location.reload();
          }
        }, name)
      ]);
    }
  }   
}

function Page(content, placePlugin){
  this.view = function(){
		return [ Menu.view(), 
      m(".container", content) 
    ];
	}
}

//controller as well as global routing declarations.
App.controller = reactive(function() {
  //Re-scope this to a local variable
  var ctrl = this;

    import 'materialize-css/dist/css/materialize.min.css';

    import 'materialize-css/dist/js/materialize.min.js';

    switch (m.route()){
        case "/":
            console.log("works")

            break;
        default:
            break;
    }

    //Add the pages to the parent App view object.
  Home = new Page(home);
  About = new Page(about);
  Contact = new Page(contact);
  Auth = new Page(auth);
  Results = new Page(results);
  //Setup Routing Mode - https://lhorie.github.io/mithril/mithril.route.html#mode
  m.route.mode = "pathname";
  //Setup the routing - https://lhorie.github.io/mithril/mithril.route.html#defining-routes
  m.route(document.body, "/", {
    "/": Home,
    "/about": About,
    "/contact": Contact,
    "/auth": Auth,
    "/results": Results
  });  
});

$(document).ready(function () {

})

//Tell Meteor to render the Mithril App
if (Meteor.isClient) {
  Meteor.startup(function() {
    m.module(document.body, App)
  });
}
