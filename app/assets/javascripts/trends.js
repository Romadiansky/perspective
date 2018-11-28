$(document).ready(function() {

  let dissonanceTemplate = document.querySelector("#dissonance-template");
  class dissonanceHandler {
    constructor() {
      let new_content = dissonanceTemplate.content.cloneNode(true);
      content_container.appendChild(new_content);
      google.charts.setOnLoadCallback(drawChart);
    }

    cleanup() {
      $(content_container).empty();
    }
  };

  let activitiesTemplate = document.querySelector("#activities-template");
  class activitiesHandler {
    constructor() {
      let new_content = activitiesTemplate.content.cloneNode(true);
      content_container.appendChild(new_content);
    }

    cleanup() {
      $(content_container).empty();
    }
  };

  let peopleTemplate = document.querySelector("#people-template");
  class peopleHandler {
    constructor() {
      let new_content = peopleTemplate.content.cloneNode(true);
      content_container.appendChild(new_content);
    }

    cleanup() {
      $(content_container).empty();
    }
  };

  let adjectivesTemplate = document.querySelector("#adjectives-template");
  class adjectivesHandler {
    constructor() {
      let new_content = adjectivesTemplate.content.cloneNode(true);
      content_container.appendChild(new_content);
    }

    cleanup() {
      $(content_container).empty();
    }
  };

  let gratitudeTemplate = document.querySelector("#gratitude-template");
  class gratitudeHandler {
    constructor() {
      let new_content = gratitudeTemplate.content.cloneNode(true);
      content_container.appendChild(new_content);
    }

    cleanup() {
      $(content_container).empty();
    }
  };

  let moodTemplate = document.querySelector("#mood-template");
  class moodHandler {
    constructor() {
      let new_content = moodTemplate.content.cloneNode(true);
      content_container.appendChild(new_content);
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

  let card_list = [
    {
      title: "Gratitude Cloud",
      subtitle: "Things you've been grateful for",
      handler_class: gratitudeHandler
    },
    {
      title: "Mood",
      subtitle: "FILL ME IN",
      handler_class: moodHandler
    },
    {
      title: "Activities",
      subtitle: "FILL ME IN",
      handler_class: activitiesHandler
    },    {
      title: "People",
      subtitle: "FILL ME IN",
      handler_class: peopleHandler
    },    {
      title: "Dissonance",
      subtitle: "FILL ME IN",
      handler_class: dissonanceHandler
    },    {
      title: "Adjectives",
      subtitle: "FILL ME IN",
      handler_class: adjectivesHandler
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

