$(document).ready(function() {

// if mood is incompatible with your tone you get a dissonance point
// if dissonance points per batch are greater than what is considered healthy, your dissonance meter increases

  function setDissonanceBar(percentage){
    $('.diss-bar-dissonant').css('height', `${100-percentage}%`);
  }

  setDissonanceBar(10);

})

// TODO

// - moodchart to main page
// - moodchart to link to trends
// - mood selector to be color-coded (if still dropdown)
// - registration handling
// - intro when you arrive (plus instructions / cvp)
// - conclusion when you're done
// - validations for all fields (first and last q's can't be empty)
// - lay out all trends
// - stagger Rene's questions (subtitles should appear after the main q)
// - implement skip option
// - add About page which explains CVP, data theory and a little about Llama founders
// - mobile responsive!!!
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

