about = {
    controller: function () {
        var ctrl = this;

    },
    view: function (ctrl) {
        return m('.section', [
      m(".row", [
          m(".col.s2", m(".card.hoverable.grey.darken-4", [m(".card-content", [

          ])])),
        m(".col.s10.center", [
          m(".card.hoverable.grey.darken-4", [

            m(".card-content", [
              m("p.mono.light-blue-text.text-lighten-5", [
                  "I am a software engineer, my primary languages are Javascript, C# and Java, although I have dabbled in many others. I like to spend time experimenting with new technologies and contibuting to open source projects."
              ])
            ])
          ])
        ])
      ])
    ])
    }
}