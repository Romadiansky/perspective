// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
// require turbolinks
//= require jquery-3.3.1.min
//= require jquery_ujs
//= require bootstrap
//= require bootstrap-notify.min
//= require wow.min
//= require jqcloud
// require_tree .

$(document).ready(function() {
  $("form#sign-in-form").on("ajax:success", function(event) {
    e = event.originalEvent.detail[0];
    $('#account-modal').modal('hide');
    $('#account-link').hide();
    $('.ajax-user').show();
    $('body').data('user', true);
    notify(`Welcome back, ${e.first_name}!`)
  });
  $("form#sign-in-form").on("ajax:error", function(event) {
    $('#sign-in-alert').html("Invalid email or password.").fadeIn();
  });
  $("form#register-form").on("ajax:success", function(event) {
    e = event.originalEvent.detail[0];
    $('#account-modal').modal('hide');
    $('#account-link').hide();
    $('.ajax-user').show();
    $('body').data('user', true);
    notify(`Welcome to Daily Llama, ${e.first_name}!`)
  });
  $("form#register-form").on("ajax:error", function(event) {
    e = event.originalEvent.detail[0].errors;
    let warning = [];
    if (e.hasOwnProperty('email')) { warning.push(`Email ${e["email"][0]}.`) }
    if (e.hasOwnProperty('first_name')) { warning.push(`First name ${e["first_name"][0]}.`) }
    if (e.hasOwnProperty('password')) { warning.push(`Password ${e["password"][0]}.`) }
    if (e.hasOwnProperty('password_confirmation')) { warning.push(`Password confirmation ${e["password_confirmation"][0]}.`) }
    $('#register-alert').html(warning.join('<br>')).fadeIn();
  });
  $("form#password-form").on("ajax:success", function(event) {
    $('#account-modal').modal('hide');
    notify(`Check your email for a password reset link!`, 'dizzy')
  });
  $("form#password-form").on("ajax:error", function(event) {
    $('#password-alert').html("You must enter a valid email.").fadeIn();
  });
});

function notify(message, icon = 'grin', type = 'dark'){
  $.notify({
    message: "&nbsp;&nbsp;" + message,
    icon: `fal fa-${icon}`
  },{
    type: type,
    allow_dismiss: false
  });
}