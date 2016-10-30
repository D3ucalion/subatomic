about = {
  controller: function(){
    var ctrl = this;
    document.getElementById("nav").className = "transparent";
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
  view: function(ctrl){ return m('div', {class: "gadgetsContainer"},
      [m('button', {class: "createBtn", id: "txt"}, "Drag"), m('button',{class: "createBtn", id: "txt"}, "and")],

      [m('button', {class: "createBtn", id: "txt"}, "Drop"), m('button', {class: "createBtn", id: "txt"}, "me")]
  ); }
}
$(function() {
  $('body').on('mousedown', '#txt', function() {
    $(this).addClass('draggable').parents().on('mousemove', function(e) {
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
