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
    
    
    return [setFavicon(),m("div.navbar-fixed", [
    m('nav.page-header.transparent#nav',{eventSet: false, config: function(){
        //if (window.pageYOffset > 165 || window.pageYOffset < 40) return;
        console.log(this.attrs.eventSet)
        if(this.attrs.eventSet == true) return;
        
        console.log('loaded')
        this.attrs.eventSet = scroll();
        
        
    }, role: "navigation"},[        
      m('div.nav-wrapper.container', [
          m('a.brand-logo.left.hide-on-med-and-down',[m('a.left.glow-font.mono', [
              "Sub-Atomic"
          ])], ''),
          [m("a.button-collapse.transparent.createBtn.Pointer#mobileBtn[data-activates='mobile']", {onclick: function (e) {
              document.getElementById('mobile').style = "transform: translateX(0%);"
              document.getElementById('pageRoot').addEventListener('click', mobileNavLostFocus)
              }},
              m("i.large.material-icons", "menu"))],
          m('ul.right.hide-on-med-and-down#nav-mobile', [
          		nav("Home",  "/"),
          		nav("About",  "/about"),
                nav("Blog",  "/blog/1"),
          		nav("Contact",  "/contact"),
          		Meteor.user() ? nav("Results",  "/results") : '',
                Meteor.user() ? logout('Logout', '/') : nav("Sign in",  "/auth")
          	]),
          m("ul.side-nav.page-header#mobile", [
              mobileNav("Home",  "/"),
              mobileNav("About",  "/about"),
              mobileNav("Blog",  "/blog/1"),
              mobileNav("Contact",  "/contact"),
              Meteor.user() ? mobileNav("Results",  "/results") : '',
              Meteor.user() ? logout('Logout', '/') : mobileNav("Sign in",  "/auth")
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
          m('a.nonMobile', name)
        ]);
	  }
      function mobileNav(name, route){
		  var isCurrent = (m.route() === route);
  		var click = function(){ 
        m.route(route); 
      };
		  return m("li"+
    		(isCurrent ? ".active.glow-font.mono" : ".mono"), (!isCurrent ? {
          onclick: click
        } :""),[m('a.mobile', name)
          
        ]);
	  }
      //custom nav function on scroll event.
      function scroll(){
	    
	    window.addEventListener("scroll", scrollFade, false);
	    return true;
	}
	
	function scrollFade(){
		
		//if (this.route.substring(1, 7) === "portal") return;
        if (window.pageYOffset > 175 || window.pageYOffset < 40) return;
        
		let e = document.getElementById('nav');
	    if(window.pageYOffset >= 100) {
            e.className = 'page-header-trans transparent';
            
        }else { e.className = 'page-header transparent';
            
        }
   		
	}
      //Fix to close mobile menu when user clicks away.
      function mobileNavLostFocus(){
          console.log('mobile nav hidden');
          document.getElementById('mobile').style = "transform: translateX(-100%);";
          document.getElementById('pageRoot').removeEventListener('click', mobileNavLostFocus);
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
      m(".container#pageRoot", content) 
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

    ctrl.chkPlace = function(p){
        switch (p) {
            case '0':
                return true;
                break;
            case '1':
                return true;
                break;
            case '2':
                return true;
                break;
            default:
                return false;
        }
    };

    //Add the pages to the parent App view object.
    Home = new Page(home);
    About = new Page(about);
    Contact = new Page(contact);
    Auth = new Page(auth);
    Results = new Page(results);
    Posts = new Page(posts);
    Posts = {
        view: function(){
            var p = m.route.param("place");
            return ctrl.chkPlace(p) ? {
                "0": new Page(Meteor.sharedFunctions.blogPost0()), "1": new Page(Meteor.sharedFunctions.blogPost1()), "2": new Page (Meteor.sharedFunctions.blogPost2())}[p].view() :
                [m.route('/blog/1'), Meteor.sharedFunctions.blogPost1().view()];
        }}

    //Setup Routing Mode - https://lhorie.github.io/mithril/mithril.route.html#mode
    m.route.mode = "pathname";
    //Setup the routing - https://lhorie.github.io/mithril/mithril.route.html#defining-routes
    m.route(document.body, "/", {
        "/": Home,
        "/about": About,
        "/contact": Contact,
        "/auth": Auth,
        "/results": Results,
        "/blog/:place": Posts
    });
});

$(document).ready(function () {
(function($){
  $(function(){

    //$('#mobileBtn').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space
})

//Tell Meteor to render the Mithril App
if (Meteor.isClient) {
  Meteor.startup(function() {
    m.module(document.body, App)
  });
}
