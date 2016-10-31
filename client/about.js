about = {
  controller: function(){
    var ctrl = this;
    //document.getElementById("nav").className = "transparent";
    ctrl.startTime = function() {

      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      m = ctrl.checkTime(m);
      s = ctrl.checkTime(s);
      document.getElementById('txt').innerHTML =
          h + ":" + m + ":" + s;
      var t = setTimeout(ctrl.startTime, 500);
    }
  },
  view: function(ctrl){ return m('div.row.gadgetsContainer', [m("div.toast.mono#coords", "")], [m(".col.s12",
      [m('button', {class: "createBtn", id: "txt"}, ">>>>>"),m("br"), m('button', {class: "createBtn", id: "txt"}, ">>>>>"),
          m("br"), m('button', {class: "createBtn", id: "txt"}, "^^^"), m("br"), m('button',{class: "createBtn", id: "txt"}, "^^^"), m("br")],

      [m('button', {class: "createBtn", id: "txt"}, ">>>>>"),m("br"), m('button', {class: "createBtn", id: "txt"}, ">>>>>"),
          m("br"), m('button', {class: "createBtn", id: "txt"}, "^^^"), m("br"), m('button', {class: "createBtn", id: "txt"}, "^^^")]
  )])}
}
$(function() {
  $('body').on('mousedown', '#txt', function() {
      let debugFrame = {
        coords: document.getElementById("coords")
    }
    $(this).addClass('draggable').parents().on('mousemove', function(e) {
        if((e != null || e != undefined) && m.route() == "/about"){

        debugFrame.coords.textContent = "X: "+e.pageX +" | Y: "+e.pageY+" Type: "+e.type;}
      $('.draggable').offset({
        top: e.pageY - $('.draggable').outerHeight() / 2,
        left: e.pageX - $('.draggable').outerWidth() / 2
      }).on('mouseup', function() {
        $(this).removeClass('draggable');
      });
    });
    //e.preventDefault();
  }).on('mouseup', function() {
    $('.draggable').removeClass('draggable');
  });
});
