home = {
  controller: function(){
    var ctrl = this;
      //document.getElementById("nav").className = "transparent";
  },
  view: function(ctrl){
    return m('div', [
    m(".parallax-container[id='index-banner']", [
      m(".section.no-pad-bot", [
        m(".container.blue-text.text-lighten-5.mono", [
          m("br"),
          m("br"),
          m("h1.header.center", "SubAtomic"),
          m(".row.center", [
            m("h5.header.col.s12.light", "Welcome, this site is currently under construction.")
           ]),
          
          m("br"),
          m("br")
         ])
       ]),
      m(".parallax", [m("img[alt='Unsplashed background img 1'][src='/images/hubble-deep.jpg']")])
     ]),
    m(".container", [
      m(".section", [
        m(".row.blue-text.text-lighten-5", [
          m(".col.s12.m4", [
          m(".card.hoverable.grey.darken-4.icon-block", [
            
            m(".card-content.center", [
              m("p.mono.flow-text.light-blue-text.text-lighten-5", ["You will find a few useful utilities under the tools menu."

              ])
            ]),
            m(".card-action.center", [
              m("button.mono.createBtn",{onclick: ()=>{m.route('/tools')}}, "Tools")
            ])
          ])
        ]),
        m(".col.s12.m4",[
              m(".card.hoverable.grey.darken-4.icon-block", [
                
                m(".card-content.center", [
                  m("p.mono.flow-text.light-blue-text.text-lighten-5", ["Chat beta available now. Please sign in to use the chat room."

                  ])
                ]),
                m(".card-action.center", [
                  m("button.mono.createBtn",{onclick: ()=>{m.route('/chat')}}, "Chat")
                ])
              ])
            ]),
        m(".col.s12.m4",[
              m(".card.hoverable.grey.darken-4.icon-block", [
               
                m(".card-content.center", [
                  m("p.mono.flow-text.light-blue-text.text-lighten-5", ["The blog is currently in progress, more posts coming soon."

                  ])
                ]),
                m(".card-action.center", [
                  m("button.mono.createBtn",{onclick: ()=>{m.route('/blog/1')}}, "Blog")
                ])
              ])
            ])
         ])
       ])
     ]),
    m(".parallax-container", [
      m(".section.no-pad-bot", [
        m(".container",m("br"),
          m("br"), [
          m(".row.center.blue-text.text-lighten-5.mono", [
            m("h5.header.col.s12.light", "This site is being built with materialize CSS, Meteor and Mithril. ")
           ])
         ])
       ]),
      m(".parallax", [m("img[alt='Unsplashed background img 2'][src='/images/hubble-deep2.jpg']")])
     ]),
    m(".container", [
      m(".section", [
        m(".row.blue-text.text-lighten-5.mono", [
          m(".col.s12.center", [
            m("h3", [m("i.mdi-content-send.brown-text")]),
            m("h4", "Footer"),
            m("p.left-align.light", "Coming soon...")
           ])
         ])
       ])
     ])])
   
  }
}
