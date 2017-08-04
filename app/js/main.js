/* Anything here will be processed by the javascript interpreter when this file finishes loading. */

var infoElements = [];

function infoElement(element) {
  // a jQuery object of the element,
  (this.elem = element),
  // its computed height as a number,
  (this.label = $(element).data('subject')),
  (this.content = $(element).html()),
  (this.open = false)
  // (this.button = $('[data-for='+this.label+']'))
}

infoElement.prototype = {
  launch: function(selector, key) {
    $(selector).addClass('on').children('.info-container__sub-container').html(this.content).addClass('has-content').attr('data-key', key);
    this.open = true;
    console.log('launch')
  },
  close: function(selector) {
    // $(selector).css('opacity', '0').children('.info-container__sub-container').html('');
    console.log('close')
    $(selector).removeClass('on').children('.info-container__sub-container').html('').removeClass('has-content').attr('data-key', 'off');
    this.open = false;
  },
  change: function(selector, key) {
    // $(selector).css('opacity', '0').children('.info-container__sub-container').html('');
    let prevKey = $(selector).children('.info-container__sub-container').attr('data-key');
    let open = false;
    if (prevKey != NaN) {
      open = true;
    }
    else {
      prevKey = parseInt(prevKey, 10)
      infoElements[prevKey].open = false;
    }
    console.log(prevKey)
    console.log('change')
    let content = this.content;
    $(selector).children('.info-container__sub-container')
      .animate({opacity: 0}, 300, function(){
        $(selector).children('.info-container__sub-container').html(content);
      })
      .attr('data-key', key)
      .animate({opacity: 1}, 1000, function(){});
    this.open = true;
  }
}

// cacheing paper element
var element = document.getElementById('paper');
var elementImg = document.getElementById('wrapper-img');

// var wrap = function (direction, element, frameHeight) {
//   let numFrames = 5;
//   let currframeHeight = frameHeight // pixels
//   // let direction = direction
//   let newFrameHeight = '';
//   // if (Number.isInteger(numFrames)) {
//   if (direction === 'forwards') {
//     newFrameHeight = 0;
//   } else if (direction === 'reverse') {
//     // numFrames = numFrames - 1;
//     newFrameHeight = (0 - currframeHeight * numFrames);
//   } else {}
//   for (let i = 0; i <= numFrames; i++) {
//     // (function(i){
//     window.setTimeout(function () {
//       console.log('frameHeight: ' + newFrameHeight + '...' + i);
//       // $(jQObj).css('background-position', '0 '+newFrameHeight+'px')
//       element.style.backgroundPosition = '0 ' + newFrameHeight + 'px';
//       if (direction === 'forwards') {
//         newFrameHeight = newFrameHeight - frameHeight;
//       } else if (direction === 'reverse') {
//         newFrameHeight = newFrameHeight + frameHeight;
//       } else {}
//     }, i * 80);
//   }
//   // }
// };

var wrapImg = function (direction, element, frameHeight) {
  let numFrames = 5;
  let currframeHeight = frameHeight // pixels
  // let direction = direction
  let newFrameHeight = '';
  // if (Number.isInteger(numFrames)) {
  if (direction === 'forwards') {
    newFrameHeight = 0;
  } else if (direction === 'reverse') {
    // numFrames = numFrames - 1;
    newFrameHeight = (0 - currframeHeight * numFrames);
  } else {}
  for (let i = 0; i <= numFrames; i++) {
    // (function(i){
    window.setTimeout(function () {
      console.log('frameHeight: ' + newFrameHeight + '...' + i);
      // $(jQObj).css('background-position', '0 '+newFrameHeight+'px')
      element.style = 'top: ' + newFrameHeight + 'px';
      if (direction === 'forwards') {
        newFrameHeight = newFrameHeight - frameHeight;
      } else if (direction === 'reverse') {
        newFrameHeight = newFrameHeight + frameHeight;
      } else {}
    }, i * 80);
  }
  // }
};


$(document).ready(function(){

  $("[data-subject]").each(function(index, element) {
    let newInfoElement = new infoElement(element);
    infoElements.push(newInfoElement);
  });

  console.dir(infoElements);

  $(document).on('click', '.info-launcher', function(){
    var infoLabel = $(this).data('for');
    let prevKey = $('.info-container__sub-container').attr('data-key');
    // prevKey = parseInt(prevKey, 10)
    let open = false;
    // debugger;
    if (prevKey != 'off') {
      open = true;
    }
    for (var i = 0, count = infoElements.length ; i < count ; i++) {
      if (infoLabel === infoElements[i].label) {
        if (open === false) {
          infoElements[i].launch('.info-container', i);
          // console.log('Launch | key: '+i+" open: "+infoElements[i].open)
        }
        else {
          infoElements[i].change('.info-container', i);
          // console.log('Change | key: '+i+" open: "+infoElements[i].open)
        }
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

  // $(document).on('mouseover', '#paper', function() {
  //   var frameHeight = $('#paper').height();
  //   wrap('forwards', element, frameHeight);
  // });
  // $(document).on('mouseout', '#paper', function() {
  //   var frameHeight = $('#paper').height();
  //   wrap('reverse', element, frameHeight);
  // });

  $(document).on('mouseover', '#paper', function() {
    var frameHeight = $('#paper').height();
    // let style = window.getComputedStyle(elementImg, null);
    // let frameHeight = style.getPropertyValue("height");
    console.log('mouseover');
    wrapImg('forwards', elementImg, frameHeight);
  });
  $(document).on('mouseout', '#paper', function() {
    var frameHeight = $('#paper').height();
    // let style = window.getComputedStyle(elementImg, null);
    // let frameHeight = style.getPropertyValue("height");
    wrapImg('reverse', elementImg, frameHeight);
  });

});
