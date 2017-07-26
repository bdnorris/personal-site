/* Anything here will be processed by the javascript interpreter when this file finishes loading. */

$(document).on('click', '.info-launcher', function(){
  var infoLabel = $(this).attr('id');
  var content = $('.info[data-subject='+infoLabel+']').html();
  $('.info-container').css('opacity', '1');
  $('.info-container > .sub-container').html(content);
});

$(document).on('click', '.close-info', function() {
  $('.info-container').css('opacity', '0');
  $('.info-container > .sub-container').html('');

});


$(document).ready(function(){
/* Anything here will run when the entire HTML document has been processed by the browser */

  // $('header.masthead h2 span').html('hi');

});
