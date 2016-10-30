contact = {
  controller: function(){
    var ctrl = this;
    document.getElementById("nav").className = "transparent";
  },
  view: function(ctrl){
    return m('.container', [
      m(".row", [
        m(".col.s6", [
          m(".card.hoverable", [
            m(".card-image", [
              m("img[src='images/atomMan.jpg']"),
              m("span.card-title", "")
            ]),
            m(".card-content", [
              m("p", [

              ])
            ]),
            m(".card-action", [
              m("a.mono[href='#']", "Info")
            ])
          ])
        ]),
        m(".col.s6",[
              m(".card.hoverable", [
                m(".card-image", [
                  m("img[src='images/alien.jpg']"),
                  m("span.card-title", "")
                ]),
                m(".card-content", [
                  m("p", [

                  ])
                ]),
                m(".card-action", [
                  m("a.mono[href='#']", "Info")
                ])
              ])
            ]

        )
      ])
    ])
  }
}
