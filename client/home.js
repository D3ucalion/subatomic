home = {
  controller: function(){
    var ctrl = this;
      document.getElementById("nav").className = "transparent";
  },
  view: function(ctrl){
    return m('.container', [ m(".row",
        [m(".col.s12",
            [m("h3.mono.center", "Welcome, this site is under construction, please check back later.")])])

    ])
  }
}
