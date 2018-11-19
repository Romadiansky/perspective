$(document).ready(function() {

  let answer = document.querySelector("#answer-template");
  let container = document.querySelector("#answer-container");
  let button = document.querySelector("#button-template");

  container.appendChild(button.content.cloneNode(true));

  add_line();

  $(document).on('keypress', function(e){
    keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode === 13) {
      add_line();
    };
  });

  function add_line() {
    // container.appendChild(answer.content.cloneNode(true));
    $('#superbutton').before(answer.content.cloneNode(true));
    // line = $(container).last();
    let lines = $('.grateful-input');
    lines[lines.length-1].focus();
  }

// get focus working
// button always on the bottom row
// talk about how mobile works
// convert from templates to interpolated string functions
//

});

