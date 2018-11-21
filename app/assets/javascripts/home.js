$(document).ready(function() {
  let answer = document.querySelector("#answer-template");
  let textbox = document.querySelector("#textbox-template");
  let container = document.querySelector("#answer-container");
  let button = document.querySelector("#button-template");
  let input_container = document.querySelector("#input-container");
  let prompts_list = [
    {
      id: 1,
      title: "Tell me 3 things you're grateful for right now",
      subtitle: "You don't have to think big. It's the little things...",
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
      title: "Write Stuff!",
      subtitle: "Anything goes",
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
        let lines = $('.answer-input');
        if ((keycode === 13) && ($(lines[lines.length-1]).val() != "")) {
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
        if (line.value.length > 0){
          answers.push(answer_object);
        }
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
      $('.textbox-input').focus();
    }

    collect_answers() {
      let body = $('.textbox-input');
      return [{question: this.question_id, body: body.val()}]
    }

    cleanup() {
      $("#input-container").empty();
    }
  };

  function load_prompt(index) {
    let prompt_info = prompts_list[index];
    $('.question').html(prompt_info.title);
    $('.advice').html(prompt_info.subtitle);
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
    }
    if (current_prompt_index === prompts_list.length) {
      console.log(llama_entry);
      // $.post('/entry', {entries: llama_entry});
    }
  }

  load_prompt(current_prompt_index);

  $('.submit-button').click(finish_prompt);

// function onSubmit( form ){
//   var data = JSON.stringify( $(form).serializeArray() ); //  <-----------

//   console.log( data );
//   return false; //don't submit
// }

// to delete text_lines that are added
// not add empty lines
// not submit empty entries
// TODO don't allow skipping by pressing enter
// format the textarea json properly
// textarea needs to be bigger
// update the questions

});

