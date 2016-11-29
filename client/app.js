//meteor helper which replaces Blaze with Mithril
var reactive = function (controller) {
    return function () {
        var computation, instance;
        instance = {};
        computation = Tracker.autorun(function () {
            m.startComputation();
            controller.call(instance);
            return m.endComputation();
        });
        instance.onunload = function () {
            return computation.stop();
        };
        return instance;
    };
};

//App view model
App = {};

//application actions
App.Action = function () {
    return this.someAction;
};
var Menu = {
    controller: function () {
        var ctrl = this;

    },

    view: function (ctrl) {


        return [setFavicon(), m("div.navbar-fixed", [
    m('nav.page-header.transparent#nav', {
                config: function () {
                    //if (window.pageYOffset > 165 || window.pageYOffset < 40) return;

                    this.eventSet = Meteor.sharedFunctions.debounce(function () {
                        scroll();
                    }, 250)();


                },
                role: "navigation"
            }, [
      m('div.nav-wrapper.container', [
          m('a', {class: (Session.get('user') != null || undefined)&& window.innerWidth > 992 ? 'brand-logo left' : 'brand-logo center'}, [m('a.left.glow-font.mono', [
              m('img.responsive-img.circle#logo[src="/images/sci-atom.png"]')
          ])], ''),
          [m("a.button-collapse.transparent.createBtn.Pointer#mobileBtn[data-activates='mobile']", {
                            onclick: function (e) {
                                document.getElementById('mobile').style = "transform: translateX(0%);"
                                document.getElementById('pageRoot').addEventListener('click', mobileNavLostFocus)
                            }
                        },
                        m("i.large.material-icons", "menu"))],
          m('ul.right.hide-on-med-and-down#nav-mobile', [
          		nav("Home", "/"),
          		nav("About", "/about"),
                nav("Blog", "/blog/1"),
          		nav("Contact", "/contact"),
                nav("Tools", "/tools"),
                Session.get('user') != null || undefined ? nav("Chat", "/chat") : '',
          		//Session.get('user') != null || undefined ? nav("Account", "/account") : '',
                Session.get('user') != null || undefined ? logout('Logout', '/') : nav("Sign in", "/auth"),
                Session.get('user') != null || undefined ? m('li', {
                            onclick: () => {
                                m.route('/account')
                            }
                        }, m('a', m('img.circle.responsive-img', {
                            src: Session.get('photo')
                        }))) : '',
                Session.get('user') != null || undefined ? m('li', m('a', 'Hello, ' + Session.get('user'))) : ''
          	]),
          m("ul.side-nav.page-header#mobile", [
              mobileNav("Home", "/"),
              mobileNav("About", "/about"),
              mobileNav("Blog", "/blog/1"),
              mobileNav("Contact", "/contact"),
              mobileNav("Tools", "/tools"),
              Session.get('user') != null || undefined ? mobileNav("Chat", "/chat") : '',
              Session.get('user') != null || undefined ? mobileNav("Account", "/account") : '',
              Session.get('user') != null || undefined ? logout('Logout', '/') : mobileNav("Sign in", "/auth")
          ]),
          m('ul.right', m('li', ''))
      ])])])]

        function btn(name, route) {
            var isCurrent = (m.route() === route);
            var click = function () {
                m.route(route);
            };
            return m("button" +
                (isCurrent ? ".btn.btn-default.navbar-btn.active" : ".btn.btn-default.navbar-btn"), {
                    onclick: click,
                    type: 'button'
                }, name);
        }

        function nav(name, route) {
            var isCurrent = (m.route() === route);
            var click = function () {
                m.route(route);
            };
            return m("li" +
                (isCurrent ? ".active.glow-font.mono" : ".mono"), (!isCurrent ? {
                    onclick: click
                } : ""), [
          m('a.nonMobile', name)
        ]);
        }

        function mobileNav(name, route) {
            var isCurrent = (m.route() === route);
            var click = function () {
                m.route(route);
            };
            return m("li" +
                (isCurrent ? ".active.glow-font.mono" : ".mono"), (!isCurrent ? {
                    onclick: click
                } : ""), [m('a.mobile', name)

        ]);
        }

        //custom nav function on scroll event.
        function scroll() {

            window.addEventListener("scroll", scrollFade, false);
            return true;
        }

        function scrollFade() {

            //if (this.route.substring(1, 7) === "portal") return;
            if (window.pageYOffset > 175 || window.pageYOffset < 40) return;

            let e = document.getElementById('nav');
            if (window.pageYOffset >= 100) {
                e.className = 'page-header-trans transparent';

            } else {
                e.className = 'page-header transparent';

            }

        }
        //Fix to close mobile menu when user clicks away.
        function mobileNavLostFocus() {
            console.log('mobile nav hidden');
            document.getElementById('mobile').style = "transform: translateX(-100%);";
            document.getElementById('pageRoot').removeEventListener('click', mobileNavLostFocus);
        }

        function setFavicon() {
            if (document.getElementById('Favi') == null || undefined) {
                let head = document.head || (document.head = document.getElementsByTagName('head')[0]);
                let favicon = document.createElement('link');
                let title = document.createElement('title');
                title.textContent = "SUBATOMIC";
                favicon.rel = 'shortcut icon';
                favicon.type = 'image/x-icon';
                favicon.href = 'images/icons/Favicon.ico';
                favicon.id = 'Favi';
                head.appendChild(title);
                head.appendChild(favicon)
            }
        }

        function chkRoute(interval) {

            switch (m.route()) {
                case "/":
                    console.log("works")
                        //clearInterval(interval);
                    break;
                case "/experimental":
                    //interval = setInterval(redrawTimer, 6500);
                    break;
                default:
                    break;
            }

            function redrawTimer() {
                m.redraw(true);
            }

        }

        function logout(name, route) {
            var x1 = function () {
                Meteor.logout();
                m.route('/');
                //window.location.reload()
            };
            return m('li', [
        m("a.Pointer", {
                    onclick: () => {
                        Meteor.logout();
                        Session.clearAuth();
                        Session.setAuth('user', null);
                        m.route('/');
                        //window.location.reload();
                    }
                }, name)
      ]);
        }
    }
}

function Page(content, placePlugin) {
    this.view = function () {
        return [Menu.view(),
      m(".container#pageRoot", content)
    ];
    }
}

//controller as well as global routing declarations.
App.controller = reactive(() => {
    //Re-scope this to a local variable
    var ctrl = this;


    Meteor.users.find().observeChanges({
        changed: (id, e) => {
            console.log('changed')
            console.log(e)
        },
        added: function (id, e) {
            console.log("added ");
            console.log(e)
        },
        removed: function (id) {
            // id just went offline
            console.log('removed')
        }
    });

    ctrl.chkPlace = function (p) {
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
    TemplateConverter = new Page(templateConverter);
    Base64 = new Page(base64);
    Account = Session.get('user') != null || undefined ? new Page(accountSettings) : new Page(auth);
    Chat = Session.get('user') != null || undefined ? new Page(chat) : new Page(auth);
    Tools = new Page(tools);
    Quizzing = new Page(quizzing);
    Posts = new Page(posts);
    Posts = {
        view: function () {
            var p = m.route.param("place");
            return ctrl.chkPlace(p) ? {
                "0": new Page(Meteor.sharedFunctions.blogPost0()),
                "1": new Page(Meteor.sharedFunctions.blogPost1()),
                "2": new Page(Meteor.sharedFunctions.blogPost2())
            }[p].view() : [m.route('/blog/1'), Meteor.sharedFunctions.blogPost1().view()];
        }
    }


    //Setup Routing Mode - https://lhorie.github.io/mithril/mithril.route.html#mode
    m.route.mode = "pathname";
    //Setup the routing - https://lhorie.github.io/mithril/mithril.route.html#defining-routes
    m.route(document.body, "/", {
        "/": Home,
        "/about": About,
        "/contact": Contact,
        "/auth": Auth,
        "/tools": Tools,
        "/template-converter": TemplateConverter,
        "/base64": Base64,
        "/account": Account,
        "/quizzing": Quizzing,
        "/chat": Chat,
        "/blog/:place": Posts
    });
    if (Session.get('user') == null || undefined) return;
    ctrl.active = true;
    ctrl.sessionTimer = setTimeout(ctrl.endSession, 60000 * 60);
    ctrl.endSession = () => {
        if (!ctrl.active) {
            clearTimeout(ctrl.sessionTimer);
            Meteor.logout();
            Session.clearAuth();
            Session.setAuth('user', null);
            m.route('/auth');
        } else {
            //resend login request? 
        }

    }
    var idleTimer = setTimeout(ctrl.idleSession, 60000);
    ctrl.idleSession = () => {
        ctrl.active = false;
        console.log('user idle');
        document.getElementById('Favi').href = '/images/icons/Favicon_idle.ico';
        clearTimeout(idleTimer);
        idleTimer = setTimeout(ctrl.endSession, 60000 * 10);
    }

    ctrl.monitor = () => {

        clearTimeout(idleTimer);
        ctrl.active = true;
        document.getElementById('Favi').href = '/images/icons/Favicon_active.ico';
        idleTimer = setTimeout(ctrl.idleSession, 60000);
    }
    $(window).on("click keydown", () => {
        return ctrl.monitor();
    });
    //$(window).blur(ctrl.monitor(false));
    $(window).focus(ctrl.monitor);
    $(window).mousemove(ctrl.monitor);

    //First check initial state if window loaded while blurred
    //Some browsers don't fire focus on load: http://stackoverflow.com/a/10325169/586086
    focused = document.hasFocus()
});

$(document).ready(function () {
    (function ($) {
        $(function () {
            $(".dropdown-button").dropdown();
            $('#mobileBtn').sideNav();

        }); // end of document ready
    }); // end of jQuery name space
})

//Tell Meteor to render the Mithril App
if (Meteor.isClient) {
    Meteor.startup(function () {
        m.module(document.body, App)
    });
}