hygro = {
  controller: function(){
    var ctrl = this;
    ctrl.Readings = [];
    ctrl.loadResults = false;  
    ctrl.fetchReadings = () =>{
        Meteor.call('HygroItems', (error, response) => {
                if (error) {
                    //TODO Add Error Logging 
                } else if (response) {

                    console.log(response);
                    ctrl.Readings = response.data.reverse();
                    ctrl.loadResults = true;
                    m.redraw(true);
                    return response;
                }
            })
    } 
    ctrl.fetchReadings();
    //document.getElementById("nav").className = "transparent";
  },
  view: function(ctrl){
    return m(".container", [ m('.section', [
      m(".row", [
        m(".col.s12", [
          m(".card.hoverable.grey.darken-4", [
            
            m(".card-content", [
              m("p.mono.light-blue-text.text-lighten-5", [m("span", "Readings")
                  
              ]),
            ctrl.loadResults ? ctrl.Readings.map((res) => {
                                return [
              m("tr.mono.light-blue-text.text-lighten-5", [m('td', [m('span', {
                                        id: res.key,
                                        onclick: ctrl.selectRoom
                                    }, res.name + " "+moment(res.id.creationTime).fromNow())], 
            m("p.mono.light-blue-text.text-lighten-5", [m("span",{class: res.temp < 18 ? "red-text" : "green-text"}, "Temp: " +res.temp +"°C")
                  
              ]),
            m("p.mono.light-blue-text.text-lighten-5", [m("span",{class: res.humidity < 30 ? "red-text" : "green-text"}, "Humidity: " +res.humidity+"%")
                  
              ]))])

            ]
                            }) : [m('span.mono', ' Loading...')]
            ])
          ])
        ])
      ])
    ])])
  }
}