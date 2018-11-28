$(document).ready(function() {

  let dissonance_template = document.querySelector("#dissonance-template");

  class Card_handler_dissonance_chart {
    constructor() {
      let new_content = dissonance_template.content.cloneNode(true);
      content_container.appendChild(new_content);
    }

    cleanup() {
      $(content_container).empty();
    }
  };

  let moodcalendar_template = document.querySelector("#moodcalendar-template");
  class Card_handler_moodcalendar {
    constructor() {
      let new_content = moodcalendar_template.content.cloneNode(true);
      content_container.appendChild(new_content);
      // Specify the canvas to draw the calendar on
      let moodCanvas = document.querySelector("#moodchart");
       drawMoods(moodCanvas, {
        data: data,
        themeName: "standard",
      });
    }
     cleanup() {
      $(content_container).empty();
    }
  };

  let wordcloud2_template = document.querySelector("#wordcloud2-template");
  class Card_handler_wordcount2 {
    constructor() {
      let new_content = wordcloud2_template.content.cloneNode(true);
      content_container.appendChild(new_content);
    }

    cleanup() {
      $(content_container).empty();
    }
  };


  let wordcloud3_template = document.querySelector("#wordcloud3-template");
  class Card_handler_wordcount3 {
    constructor() {
      let new_content = wordcloud3_template.content.cloneNode(true);
      content_container.appendChild(new_content);
    }

    cleanup() {
      $(content_container).empty();
    }
  };


  let wordcloud4_template = document.querySelector("#wordcloud4-template");
  class Card_handler_wordcount4 {
    constructor() {
      let new_content = wordcloud4_template.content.cloneNode(true);
      content_container.appendChild(new_content);
    }

    cleanup() {
      $(content_container).empty();
    }
  };


  let wordcloud5_template = document.querySelector("#wordcloud5-template");
  class Card_handler_wordcount5 {
    constructor() {
      let new_content = wordcloud5_template.content.cloneNode(true);
      content_container.appendChild(new_content);
    }

    cleanup() {
      $(content_container).empty();
    }
  };

  let card_list = [
    {
      title: "DISSONANCE",
      subtitle: "FILL ME IN",
      handler_class: Card_handler_dissonance_chart
    },
    {
      title: "MOOD CALENDAR!!!",
      subtitle: "FILL ME IN",
      handler_class: Card_handler_moodcalendar
    },
    {
      title: "WORDCLOUD2",
      subtitle: "FILL ME IN",
      handler_class: Card_handler_wordcount2
    },
    {
      title: "WORDCLOUD3",
      subtitle: "FILL ME IN",
      handler_class: Card_handler_wordcount3
    },    {
      title: "WORDCLOUD4",
      subtitle: "FILL ME IN",
      handler_class: Card_handler_wordcount4
    },    {
      title: "WORDCLOUD5",
      subtitle: "FILL ME IN",
      handler_class: Card_handler_wordcount5
    },
  ];

  let current_card_handler;
  let current_card_index = 0;
  let content_container = document.querySelector("#perspective-content-container");

  function load_card(index) {
    let card_info = card_list[index];
    $('.title').html(card_info.title);
    $('.advice').html(card_info.subtitle);
    $('.advice').addClass('anim-typewriter')
    current_card_handler = new card_info.handler_class();
  }

  function next_card() {
    current_card_handler.cleanup();
    current_card_index ++;

    if (current_card_index < card_list.length) {
      $('.advice').removeClass('anim-typewriter')
      $('.container').animateCss('slideOutUpBig', function(e) {
        load_card(current_card_index);
        $('.container').animateCss('slideInUpBig');
      });
    }
  }

  load_card(current_card_index);

  $('.submit-button').click(next_card);



  // DISSONANCE CHARTING

  function setDissonanceBar(percentage) {
    $('.diss-bar-dissonant').css('height', `${100-percentage}%`);
  }

  setDissonanceBar(10);

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Entries', 'Detected Dissonance'],
      ['total entries',     total_entries],
      ['dissonance detected', dissonance_total]
    ]);
    console.log('TODO: uncomment the "total entries" and "dissonance_total" lines above, and debug')

    var options = {
      title: 'Dissonance Pie'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }



})

$.fn.extend({
  animateCss: function(animationName, callback) {
    let animationEnd = (function(el) {
      let animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };
      for (let t in animations) {
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


// TODO
// - past entries!!!
// - moodchart to main page
// - moodchart to link to trends
// - mood selector to be color-coded (if still dropdown)
// - registration handling
// - intro when you arrive (plus instructions / cvp)
// - conclusion when you're done

// - lay out all trends
// - stagger Rene's questions (subtitles should appear after the main q)
// - implement skip option
// - add About page which explains CVP, data theory and a little about Llama founders
// - mobile responsive!!!
// - #f3e9db for all white backgrounds
// - add Llama logo
// - deploy on Heroku
// - add photos to library of backgrounds
// - shorten the animation gap between questions
// - randomize some of the questions a bit so the language isn't always the same
// - subtitles can appear as if typed by Rene in real time
// - style the registration / login
// - refactor queries
// - add pickmeup <- stretch
// - add goals <- stretch



// validations:
//    -login
//    -logout
//    -registration
//    -empty entry for Q6
//    -empty entry for Q1
// intro paragraph
// STRETCH: if logged in, no intro paragraph
// conlusion note
// STRETCH: if user has fewer than 4 entries, it should encourage user to keep things up to see trends; if user has more than 4 entries, that message should not appear
// trends page should exist
// trends anaysis:
//    -develop page
//    -dissonance score
//    -LIWC (linguistic Inquiry and Word Count
//    -content and style analysis

//prevent skipping mood (empty Q1 not allowed)

