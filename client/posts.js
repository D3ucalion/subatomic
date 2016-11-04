posts = {
controller: function(){
    var ctrl = this;
    
    ctrl.month = "nov";
    ctrl.year = "2016";
    ctrl.changeYear = function(e){
        console.log(e);
        let siblings = e.target.parentNode.parentNode.children; 
        console.log(siblings);
        for (let i = 0; i<siblings.length; i++){
            siblings[i].className = "waves-effect";
        }
        
        e.target.className = "mono glow-font";
        e.target.parentNode.className = "indexBtn";
        ctrl.year = e.target.textContent;
    }
    ctrl.changeMonth = function(e){
        console.log(e);
        let siblings = e.target.parentNode.parentNode.children; 
        console.log(siblings);
        for (let i = 0; i<siblings.length; i++){
            siblings[i].className = "waves-effect";
        }
        
        e.target.className = "mono glow-font";
        e.target.parentNode.className = "indexBtn";
        ctrl.month = e.target.textContent;
    }
    
    //document.getElementById("nav").className = "transparent";
  },
  view: function(ctrl){
      Prism.highlightAll();
    return m('.container', [
        m(".row", [
        m(".col.s12.center", [
            m("ul.pagination", [
              m("li.disabled.mono", [m("a.mono", [m("i.material-icons", "chevron_left")])]),
              m("li.waves-effect", {onclick: ctrl.changeYear}, [m("a.mono", "2015")]),
              m("li.indexBtn", {onclick: ctrl.changeYear}, [m("a.mono.glow-font", "2016")]),
              m("li.waves-effect", {onclick: ctrl.changeYear}, [m("a.mono", "2017")]),
              m("li.waves-effect", [m("a.mono", [m("i.material-icons", "chevron_right")])])
             ])])]),
              m(".row", Meteor.sharedFunctions.blogPost1())
    ])
  }
}