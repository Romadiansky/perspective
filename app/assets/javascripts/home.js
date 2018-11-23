$(document).ready(function() {
  let answer = document.querySelector("#answer-template");
  let textbox = document.querySelector("#textbox-template");
  let mood = document.querySelector("#mood-template");
  let container = document.querySelector("#answer-container");
  let input_container = document.querySelector("#input-container");
  let prompts_list = [
    {
      id: 1,
      title: "What's your current mood?",
      subtitle: "Take a moment to really think about you how feel.",
      interface_name: "mood"
    },
    {
      id: 2,
      title: "What did you do today?",
      subtitle: "I like lists. A short list will do.",
      interface_name: "text_list"
    },
    {
      id: 3,
      title: "Who were the people in your life today?",
      subtitle: "Remember: I love lists. ;)",
      interface_name: "text_list"
    },
    {
      id: 4,
      title: "Give me three words to describe your day.",
      subtitle: "For example, my day was: chilly, hopeful, and analytical.",
      interface_name: "text_list"
    },
    {
      id: 5,
      title: "Tell me three things you're grateful for right now",
      subtitle: "You don't have to think big. It's the little things...",
      interface_name: "text_list"
    },
    {
      id: 6,
      title: "Want to say more?",
      subtitle: "I want to hear it.",
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

  class Prompt_handler_mood {
    constructor(question_id) {
      this.question_id = question_id
      input_container.appendChild(mood.content.cloneNode(true));
    }

    collect_answers() {
      let option = $('.mood-input');
      return [{question: this.question_id, body: option.val()}]
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
    if (prompt_info.interface_name === "mood") {
      current_prompt_handler = new Prompt_handler_mood(prompt_info.id)
    }
  }

  function finish_prompt() {
    llama_entry.answers = llama_entry.answers.concat(current_prompt_handler.collect_answers());
    current_prompt_handler.cleanup();
    current_prompt_index ++;

    if (current_prompt_index < prompts_list.length) {
      $('.container').animateCss('slideOutUpBig', function(e) {
        load_prompt(current_prompt_index);
        $('.container').animateCss('slideInUpBig');
      });
    }
    if (current_prompt_index === prompts_list.length) {
      console.log(llama_entry);
      $.post('/entries', llama_entry);
    }
  }

  function changeBackground(){
    let options = ['penguins', 'butterfly', 'doggo'];
    let newPhoto = options[Math.floor(Math.random() * options.length)];
    let fullScreen = $('.full-screen');
    fullScreen.removeClass(fullScreen.data('photo')).addClass(newPhoto).data('photo', newPhoto);
  }

  $('.container').animateCss('fadeInDown', function(e) {
    // opacity has to be set to 0 in HTML for the illusion to work
    $('.container').css('opacity', '1');
  });

  load_prompt(current_prompt_index);

  $('.submit-button').click(finish_prompt);

  let slideshow = setInterval(changeBackground, 30000);

// function onSubmit( form ){
//   var data = JSON.stringify( $(form).serializeArray() ); //  <-----------

//   console.log( data );
//   return false; //don't submit
// }


// TODO //
// - intro
// - outtro
// - "successfull "
//
//
// to delete text_lines that are added
// TODO don't allow skipping by pressing enter

});

$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };
      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
      if (typeof callback === 'function') callback();
    });
    return this;
  },
});