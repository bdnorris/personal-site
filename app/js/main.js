/* Anything here will be processed by the javascript interpreter when this file finishes loading. */

var infoElements = [];

function infoElement(element) {
  // a jQuery object of the element,
  (this.elem = element),
  // its computed height as a number,
  (this.label = $(element).data('subject')),
  (this.content = $(element).html())
  // (this.button = $('[data-for='+this.label+']'))
}

infoElement.prototype = {
  launch: function(selector) {
    $(selector).addClass('on').children('.info-container__sub-container').html(this.content);
  },
  close: function(selector) {
    // $(selector).css('opacity', '0').children('.info-container__sub-container').html('');
    $(selector).removeClass('on');
  }
}


$(document).ready(function(){

  $("[data-subject]").each(function(index, element) {
    let newInfoElement = new infoElement(element);
    infoElements.push(newInfoElement);
  });

  console.dir(infoElements);

  $(document).on('click', '.info-launcher', function(){
    var infoLabel = $(this).data('for');
    // var content = $('.info[data-subject='+infoLabel+']').html();
    // $('.info-container').css('opacity', '1');
    // $('.info-container > .sub-container').html(content);
    for (var i = 0, count = infoElements.length ; i < count ; i++) {
      if (infoLabel === infoElements[i].label) {
        infoElements[i].launch('.info-container');
      }
    }
  });

  $(document).on('click', '.info-container__close', function() {
    for (var i = 0, count = infoElements.length ; i < count ; i++) {
      // if (infoLabel === infoElements[i].label) {
        infoElements[i].close('.info-container');
      // }
    }
  });

  $(document).on('transitionend', '.info-container', function() {
    if($('.info-container').css('opacity') == 0) {
      $('.info-container__sub-container').html('');
    }
  });

  window.setInterval(function() {
    $('.swap span:first-child').toggleClass('on');
    // $('.swap dt:last-child').toggleClass('off');
  }, 3000);
  window.setTimeout(function() {
    window.setInterval(function() {
      $('.swap span:last-child').toggleClass('on');
      // $('.swap dt:first-child').toggleClass('off');
    }, 3000);
  }, 3000);


});
