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
    return [setFavicon(),
      m('div.navbar.navbar-default.navbar-static-top', [
        m('.container',[
          m('.navbar-collapse.collapse#navbar-main', [
            m('ul.nav.navbar-nav', {
              role: "navigation"
            }, [
              m('a.navbar-brand',[m('span.img-thumbnail', [
                  [m('img[src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AoVAjoWJR6xaAAAAFlpVFh0Q29tbWVudAAAAAAARmlsZSBzb3VyY2U6IGh0dHA6Ly9jb21tb25zLndpa2ltZWRpYS5vcmcvd2lraS9GaWxlOjIwMDRHcmF2aXRhdGlvbmFsTGVucy5qcGdxSosyAAAJdklEQVRYw6WXS6wcx3WGv1NV3T3Pezkz982nJJOURItEBCdGFC0C2EG8M+BdQC8SL0Rvs8jeibcGtHNM72JYMGB44cBxFgkSCQpiBAkigIxFiKIsUrz36j7nPdPd091VJ4uhBMdWFCepZaGqzl/nnKr//4X/xTjbqL1yviPXeyvJjSSJrr59WPSKvMRAvxmb+1b0jsTl3bd2i+/+pmfK/7Tg23/xtfW//O6PXx0M0puIEovgIgECzVadLF8gCA2jGAMuisF6gvLaolb70zvvnJ78nwFsJM3vNJvmFt5Tlh9t8Diz3JYkQmQFZwx/+IWreF9y985DrAXnLM5ZWi25/b03Tr/+38UwvzrRqyeylax0N5LaIcKtNCspq/BfMIuACCggIhgjJImjljiMUYyANRA78D6/9Wd/8vnDk8NJ9xt/fFE+NQNrtYYYu9gMIToIATprdWKXMDgdI7pcHFvFuSWIOIIkNlgrdOsBUKJazEpLMAZWWhG1xGKto1GvE7U3tv3s6Ogbf/WefhTT/TKAuoTOQqIDYy0igeCBxGCsIRIFhfMrMTPvKdQSiycyirNKFFkEaDYtqysWEei2E5LEYYzFGEUXRwdiqx4w+EQApbX3nH1SGRGqhWchC2rO0IgEBboJFJlQYjASsEaJrBBHiojQqgutRoQINBs1klqMGIOG5aWLQu4BW79Wgs1m6zuov9XuNBERykWJ9SWbGzG/+zuXKMuU+Tzj5/dGTOYeK9CKLY0aNGqWs1sWa4WdnRUunb+EtY6dnfOoCnlecPjhY3yo6A9Omc5mt7/5/d2vf9yEa0m8HsV6K44M5aKgyAuCD4gRarHQWW1z8dwFdra3qMWW2BicESIHSQRJpNQSQz2xtFfOsL1zge2di+ycu0xvbYtubwMXxVjrwAiLsrr15187u/5xCWzEq2e3WnivHB5PESwGQ5QIzgayyYCa6eK8EhlltakYKzQSYaVhaDYMvU6dKHI89dRnuP5bL2NdjTM7LzDZ/w8ODz7AWIdRj/eeslLG4+pV4KtLABLdHA5LVMHZCGcFVUOnIVx7dpuz22d4859/zqIM9DqWF567hLWGo8N9gg/EsWNjY504rnPu7FM0kwiMkM8OGJw85sO9B+T5GO89k/Gck9OcEOQm8FV3rh6/ElDSrAAgigR1QgjLzt7srfL0xQv87F8fUPqCZj3imSvPEkcx09EJeZ5jreKcwzmHqpJmUxCDzzImkwFpNsNFEWIsQYWi9AQVvvJS9xV34w8+f33v3ceUoxFYaD99nq1nX0SM4/E//jW7H4yoJX2m0xIN8Ny1TV566ffBxhy8f5dgDOl8Spy0SWp1vFge7e1TViW779/j9OSY6XTCxed/m2a7S/u4ZHznBKXGIF1cd+nx6Q0tCrLCgxHiXNFZjhHDbFLw8GDOwfgdBpMCFxlO+2Pe/Mn3Kb2S55A0LBo8oSypxBDVz0AIFGHKwf4uJ6cj0rzEvf8LGo1D+idD0oUFDRSF3HD7e0dXfeURI4BQjmYc3L8L6kGF4TjFTkq8CqGE3aMpEQ9RlNIK0dhgrTKdT3GLjOHgBF+VLOYz+v0Rp8OULAsU+R7WGfYPM/ISlIoQ5Kpc6LV8u27MxYsdZtOcvd0ZruYwFrSA1aahKD0uEoxAMzZc3YDEgTYtzjqiSLDOIEZor3YIlbDIcx49PGaaegxCWSp5oSy8Y5p5ysrjPcGZoHQ7Ta5cucju42P292Z4r6ga1Hsqb4FlUyJQeaUKFqfwmbUOJ4sSY5QszwhByRdDQogpFgXpHIIPdLpNjI3pDzJCHogqQ/BK4SucNdpfXa2tFwtPnpaYYKhKjxePqCVNK8QEonhJQIkNjCthop4vbG+z4pXUV/SHI4qiZG+3z3g0RVXJU+isGb705S+y+/4B7z34gHS3T2QhWBgV2ndx5O7v7Q/Xd/f7+BJwQrOeYKxhOs4JACJEYUm/1gpPX+rhnGHY6PL85Wtc+Ozv8ZMffIssy9jdHTOc5ijCdBaQJOZfXn+L3f0Jk9mCwUR58cWzdLsN3njjwX1nxNwpC3lZrCEoWKckiUGsBQVlSfyiigBGlHPnLtBoNuh0egQ8rVYb5ywiBoxQhSVzll4ZjkruvXPIPFey0jNLK2aTBbXYMTid3XFodTdUoN4hQPCeyWgZrAwBCQ6LwkoD4yytdcssHZJmIza3dhiXEX//0x9BnmPKgsFoQZoFBPABMh+YFcL6Zp16q8Hxac7P/n2PyFkKcXcF4NpWS6NaRKUwnZb4akmTKuCMwZhAZ3uNpNGgHmX07BAjcPXSUzQ2LjAeDMhP9lkUnrfu9xmPAyIQMOzsOJ4512Bnex0R4d/u9nn73jGRtbw7ScUBBG9e63aSm4sKpmmAsMxACAFVxXulyBegkFUzQqzELuLtBx9ifnFEKD2jcUrllelcKTxPvnXDSkO5fHmHZ577HIePHzIbPGKz3WK9VXvt3UnKkwy014PKsUcovVD5ABpoNy353KPGEEXVMitBEF1KLlWPisXFBiHgvVLmSl54EHAWzveE69e2uXB2ncOjEa//0x6TcUFWVhsHcGIBTmZFutpMthU+5ysFDYgq7WbCIq8wBrpnEuq1CF96qiciVYMi1hDXlo2qQSnK5QUUQRUSA7FT0vmUk9Mpe8clWRVuf+jDD39NlD6z1jqsgmyGJ/JJ1WPEUYsqbv7RyywWBT/927eYz0pEhBAMxoIVSyUVIShZvixZ8IErl9vUay329vo0aoZ5VjGa+KPjRbH1iar40ma7S6n9cvn4CZVHjMEY2OwmBCCtSja7K7g45vF7J1jx9HqGl16+zmg84/U3HzEeL7BWWO80mKYZs8yDQgBC5Xvj4Aef6AuqkiFGt2EpQAOCquADDEcZo3FG8J71tRbb212ssRgB54TVVkI9cR9/2dYZxEZM5sXyLFWM8dtiZPipzmh7tS0h0DGGez6ETbN8Dnz2yirr6ytsrjX4h7+7h4plMAcPGBFazhMCTBdQ6PJmVagQY0A5qkr/vHMyHFdeP9UZHYynejSdDg7G0y1EbldeKTWg6gilY+/xjJO50k8DFYpXpdKK1BvmJZRBMSKICCKWgNwel+XWnDD41eAA9tO84XxR/E3dmG8ruhN8uD6ZLjjpz5mk5bI8S5qg22vT651Z9khafJTc19RXX5xU1Q//X+74l8eZevyKwV5X5IaiV62lV6vFvHB1s5/Oi/vDSXbn0e7w7rT8ze35fwLfiO8j2qIxGwAAAABJRU5ErkJggg=="]')],
              ])], 'SUBATOMIC'),
          		nav("Home",  "/"),
          		nav("About",  "/about"),
          		nav("Contact",  "/contact"),
          		Meteor.user() ? nav("Results",  "/results") : ''
          	]),
            [
              m("ul.nav.navbar-nav.navbar-right[id='login-buttons']", [
          			Meteor.user() ? logout('Logout', '/') : nav("Sign in",  "/auth")
	            ])
            ]
          ])
        ])
      ])
    ]
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
    		(isCurrent ? ".active" : ""), {
          onclick: click
        },[ 
          m('a.Pointer', name)
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
        window.location.reload()
      };
	    return m('li', [
        m("a.Pointer", {
          onclick: () => {
            Meteor.logout();
            window.location.reload();
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

//Tell Meteor to render the Mithril App
if (Meteor.isClient) {
  Meteor.startup(function() {
    m.module(document.body, App)
  });
}
