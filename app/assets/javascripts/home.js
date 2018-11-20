$(document).ready(function() {


  let answer = document.querySelector("#answer-template");
  let container = document.querySelector("#answer-container");
  let button = document.querySelector("#button-template");
  let input_container = document.querySelector("#input-container");

  class Prompt_handler_text_lines {
    constructor(question_id) {

      this.question_id = question_id
      this.add_line();

      $(document).on('keypress', (e) => {
        // TODO: THIS WILL PROBABLY BREAK BECAUSE THE
        // EVENT HANDLER WILL PERSIST AFTER THIS PROMPT
        // HANDLER HAS BEEN REPLACED.  Need to find a way
        // to remove this handler
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode === 13) {
          this.add_line();
        }

      });
    }

    //adds extra input line after a user hits 'enter' and focuses on the new line
    add_line() {
      let new_line = answer.content.cloneNode(true);
      input_container.appendChild(new_line);
      let lines = $('.answer-input');
      lines[lines.length-1].focus();
    }

    collect_answers() {

      let answers = [];

      let lines = $('.answer-input');
      for (let line of lines) {
        let answer_object = {};
        answer_object.question = this.question_id;
        answer_object.body = line.value;
        answers.push(answer_object);
      }
      return answers
    }

    cleanup() {
      $("#input-container").empty();
    }
  };

  //prompts_arr is filled with placeholder data; to be filled with db data
  let prompts_list = [
    {
      title: "How are you feeling right now?",
      subtitle: "Pick the closest one",
      interface_name: "text_list"
      // interface_name: "moodpicker"
    },
    {
      title: "What did you do today?",
      subtitle: "Tell the all-seeing eye",
      interface_name: "text_list"
    }
  ];

  container.appendChild(button.content.cloneNode(true));

  // TEMPORARY - REMOVE ME
  temp1 = new Prompt_handler_text_lines(5)


  //collects data from question and returns JSON
  // function collect_answers() {

  //   let collected_entry = {
  //     answers: []
  //   };

  //   let lines = $('.answer-input');
  //   for (let line of lines) {
  //     let answer_object = {};
  //     answer_object.question = 5;
  //     answer_object.body = line.value;
  //     collected_entry.answers.push(answer_object);
  //   }
  //   entry_json = JSON.stringify(collected_entry);
  //   console.log(entry_json);
  // }

  $('.submit-button').on('click', function() {
    temp1.cleanup();
    // collect_answers();
  })

  function show_next() {

    // if prompts_list

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

