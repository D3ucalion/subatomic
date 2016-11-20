home = {
  controller: function(){
    var ctrl = this;
      //document.getElementById("nav").className = "transparent";
  },
  view: function(ctrl){
    return m('.section', [m(".row", [
        m(".col.s4", [
          m(".card.hoverable.grey.darken-4", [
            
            m(".card-content", [
              m("p.mono.light-blue-text.text-lighten-5", ["Games coming soon"

              ])
            ]),
            m(".card-action", [
              m("a.mono[href='#']", "Info")
            ])
          ])
        ]),
        m(".col.s4",[
              m(".card.hoverable.grey.darken-4", [
                
                m(".card-content", [
                  m("p.mono.light-blue-text.text-lighten-5", ["Chat coming soon"

                  ])
                ]),
                m(".card-action", [
                  m("a.mono[href='#']", "Info")
                ])
              ])
            ]),
        m(".col.s4",[
              m(".card.hoverable.grey.darken-4", [
               
                m(".card-content", [
                  m("p.mono.light-blue-text.text-lighten-5", ["Blog in progress"

                  ])
                ]),
                m(".card-action", [
                  m("a.mono.Pointer",{onclick: function(){m.route('/blog/1')}}, "Blog")
                ])
              ])
            ])
      ])

    ])
  }
}
