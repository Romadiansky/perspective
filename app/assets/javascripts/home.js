$(document).ready(function() {
  let answer = document.querySelector("#answer-template");
  let textbox = document.querySelector("#textbox-template");
  let container = document.querySelector("#answer-container");
  let button = document.querySelector("#button-template");
  let input_container = document.querySelector("#input-container");
  let prompts_list = [
    {
      id: 1,
      title: "How are you feeling right now?",
      subtitle: "Pick the closest one",
      interface_name: "text_list"
      // interface_name: "moodpicker"
    },
    {
      id: 2,
      title: "What did you do today?",
      subtitle: "Tell the all-seeing eye",
      interface_name: "text_list"
    },
    {
      id: 3,
      title: "What did you do today blob?",
      subtitle: "Tell the all-seeing eye now",
      interface_name: "textarea"
    }
  ];
  let llama_entry = {
    answers: []
  };
  let current_prompt_handler;
  let current_prompt_index = 0;

  class Prompt_handler_text_lines {
    constructor(question_id) {

      this.question_id = question_id
      this.add_line();

      this.keypress_handler = (e) => {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode === 13) {
          this.add_line();
        }
      }
      $(document).on('keypress', this.keypress_handler);
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
      $(document).off('keypress', this.keypress_handler);
      $("#input-container").empty();
    }
  };

  class Prompt_handler_textarea {
    constructor(question_id) {

      this.question_id = question_id
      let new_textbox = textbox.content.cloneNode(true);
      input_container.appendChild(new_textbox);
    }

    collect_answers() {
      let body = $('.textbox-input');
      return [ body.val() ]
    }

    cleanup() {
      $("#input-container").empty();
    }
  };

  function load_prompt(index) {
    let prompt_info = prompts_list[index];
    if (prompt_info.interface_name === "text_list") {
      current_prompt_handler = new Prompt_handler_text_lines(prompt_info.id)
    }
    if (prompt_info.interface_name === "textarea") {
      current_prompt_handler = new Prompt_handler_textarea(prompt_info.id)
    }
  }

  function finish_prompt() {
    llama_entry.answers = llama_entry.answers.concat(current_prompt_handler.collect_answers());
    current_prompt_handler.cleanup();
    current_prompt_index ++;

    if (current_prompt_index < prompts_list.length) {
      load_prompt(current_prompt_index);
    } else {
      // Submit!!
    }
    console.log(llama_entry);
  }

  load_prompt(current_prompt_index);

  $('.submit-button').on('click', function() {
    finish_prompt();
  })

// function onSubmit( form ){
//   var data = JSON.stringify( $(form).serializeArray() ); //  <-----------

//   console.log( data );
//   return false; //don't submit
// }

});

