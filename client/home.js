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
              m("p.mono.flow-text.light-blue-text.text-lighten-5", ["You will find a few useful utilities on the tools page."

              ])
            ]),
            m(".card-action", [
              m("button.mono.createBtn",{onclick: ()=>{m.route('/tools')}}, "Tools")
            ])
          ])
        ]),
        m(".col.s4",[
              m(".card.hoverable.grey.darken-4", [
                
                m(".card-content", [
                  m("p.mono.flow-text.light-blue-text.text-lighten-5", ["Chat beta available now. Please sign in to use the chat room."

                  ])
                ]),
                m(".card-action", [
                  m("button.mono.createBtn",{onclick: ()=>{m.route('/chat')}}, "Chat")
                ])
              ])
            ]),
        m(".col.s4",[
              m(".card.hoverable.grey.darken-4", [
               
                m(".card-content", [
                  m("p.mono.flow-text.light-blue-text.text-lighten-5", ["Blog in progress, more posts coming soon."

                  ])
                ]),
                m(".card-action", [
                  m("button.mono.createBtn",{onclick: ()=>{m.route('/blog/1')}}, "Blog")
                ])
              ])
            ])
      ])

    ])
  }
}
