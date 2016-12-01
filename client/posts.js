posts = {
    controller: function () {
        var ctrl = this;
        let blog = document.getElementById('BlogContainer');
        ctrl.blogSwitch = Meteor.sharedFunctions.blogPost1();
        ctrl.blog = "1";
        ctrl.changeBlog = function (e) {
            console.log(e);
            let siblings = e.target.parentNode.parentNode.children;
            console.log(siblings);
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].className = "waves-effect";
            }

            e.target.className = "mono glow-font";
            e.target.parentNode.className = "indexBtn";
            ctrl.Blog = e.target.textContent;

            switch (ctrl.blog) {
                case "0":
                    ctrl.blogSwitch = Meteor.sharedFunctions.blogPost0(ctrl);
                case "2":
                    ctrl.blogSwitch = Meteor.sharedFunctions.blogPost2(ctrl);

                    break;
                default:
                    ctrl.blogSwitch = Meteor.sharedFunctions.blogPost1(ctrl);
                    break;

            }
            setTimeout(function () {

                    m.redraw(true);

                }, 0)
                //Prism.highlightAll();
        }

        //document.getElementById("nav").className = "transparent";
    },
    view: function (ctrl) {

        return m(".container", [ m('.section', [
        m(".row", [
        m(".col.s12.center", [
            m("ul.pagination", [
              m("li.disabled.mono", [m("a.mono", [m("i.material-icons", "chevron_left")])]),
              m("li.waves-effect", {
                            onclick: ctrl.changeBlog
                        }, [m("a.mono", "0")]),
              m("li.indexBtn", {
                            onclick: ctrl.changeBlog
                        }, [m("a.mono.glow-font", "1")]),
              m("li.waves-effect", {
                            onclick: ctrl.changeBlog
                        }, [m("a.mono", "2")]),
              m("li.waves-effect", [m("a.mono", [m("i.material-icons", "chevron_right")])])
             ])])]),
              m(".row#BlogContainer", ctrl.blogSwitch)
    ])])
    }
}