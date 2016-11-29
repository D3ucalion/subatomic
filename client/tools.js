tools = {
    controller: function () {
        var ctrl = this;


    },
    view: function (ctrl) {

        return m('.section', [
      m(".row", [

        m(".col.s4", [
          m(".card.hoverable.grey.darken-4", [m(".card-content", [m('span.card-title.mono', "")], [
              m("p.mono.light-blue-text.text-lighten-5.Pointer", "Coming soon")
          ])
        ]),
            m(".card.hoverable.grey.darken-4", [m(".card-content", [m('span.card-title.mono', "")], [
              m("p.mono.light-blue-text.text-lighten-5.Pointer", "Coming soon")
          ])
        ])
      ]),
          m(".col.s4", [
          m(".card.hoverable.grey.darken-4", [m(".card-content", [m('span.card-title.mono', "")], [
              m("p.mono.light-blue-text.text-lighten-4.Pointer", {
                                onclick: function () {
                                    m.route('/template-converter')
                                }
                            }, "Mithril template converter V2 beta")
          ])
        ]),
            m(".card.hoverable.grey.darken-4", [m(".card-content", [m('span.card-title.mono', "")], [
              m("p.mono.light-blue-text.text-lighten-5.Pointer", "Coming soon")
          ])
        ])
      ]),
        m(".col.s4", [

        m(".card.hoverable.grey.darken-4", [m(".card-content", [m('span.card-title.mono', "")], [
              m("p.mono.light-blue-text.text-lighten-4.Pointer", {
                                onclick: function () {
                                    m.route('/base64')
                                }
                            }, "Image to base64 converter.")
          ])
        ]),
          m(".card.hoverable.grey.darken-4", [m(".card-content", [m('span.card-title.mono', "")], [
              m("p.mono.light-blue-text.text-lighten-5.Pointer", {
                                onclick: function () {
                                    m.route('/quizzing')
                                }
                            }, "Quiz challenges")
          ])
        ])

      ])])])
    }
}