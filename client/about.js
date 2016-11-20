about = {
  controller: function(){
    var ctrl = this;
    
  },
  view: function(ctrl){ return m('.section', [
      m(".row", [
        m(".col.s12", [
          m(".card.hoverable.grey.darken-4", [
            
            m(".card-content", [
              m("p.mono.light-blue-text.text-lighten-5", [
                  "I am a software engineer, my primary languages are Javascript, C# and Java. I spend a lot of time experimenting with new technologies and contibuting to open source projects."
              ])
            ])
          ])
        ])
      ])
    ])}
}

