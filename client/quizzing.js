quizzing = {
    controller: function(){
        var ctrl = this;
    },
    view: function(ctrl){
        return m(".container", [ m('.section', [
      m(".row", [
        m(".col.s12", [
          m(".card.hoverable.grey.darken-4", [
            
            m(".card-content", [
              m("p.mono.light-blue-text.text-lighten-5", [m("a[href='https://github.com/D3ucalion'][target='_blank']", "Quizzing coming soon.")
                  
              ])
            ]),
               m(".card-action", [
              //m("button.createBtn[type='button']", "Save")
                         
            ])
          ])
        ])
      ])
    ])])
    }
}