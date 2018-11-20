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

  //adds extra input line after a user hits 'enter' and focuses on the new line
  function add_line() {
    // container.appendChild(answer.content.cloneNode(true));
    $('#superbutton').before(answer.content.cloneNode(true));
    // line = $(container).last();
    let lines = $('.answer-input');
    lines[lines.length-1].focus();
  }

  //collects data from question and returns JSON
  function collect_answers() {

    let collected_entry = {
      answers: []
    };

    let lines = $('.answer-input');
    for (let line of lines) {
      let answer_object = {};
      answer_object.question = 5;
      answer_object.body = line.value;
      collected_entry.answers.push(answer_object);
    }
    entry_json = JSON.stringify(collected_entry);
    console.log(entry_json);
  }

  $('.submit-button').on('click', function() {
    collect_answers();
  })

  function show_next() {

  }
  //collect_answers();

// talk about how mobile works
// convert from templates to interpolated string functions


// function onSubmit( form ){
//   var data = JSON.stringify( $(form).serializeArray() ); //  <-----------

//   console.log( data );
//   return false; //don't submit
// }

});

