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
    // console.log('launch')
  },
  close: function(selector) {
    // $(selector).css('opacity', '0').children('.info-container__sub-container').html('');
    console.log('close')
    $(selector).removeClass('on').children('.info-container__sub-container').html('').removeClass('has-content').attr('data-key', 'off');
    // this.open = false;
  },
  change: function(selector, key) {
    // $(selector).css('opacity', '0').children('.info-container__sub-container').html('');
    var prevKey = $(selector).children('.info-container__sub-container').attr('data-key');
    var open = false;
    if (prevKey != NaN) {
      open = true;
    }
    else {
      prevKey = parseInt(prevKey, 10)
      infoElements[prevKey].open = false;
    }
    // console.log(prevKey)
    // console.log('change')
    var content = this.content;
    $(selector).children('.info-container__sub-container')
      .animate({opacity: 0}, 300, function(){
        $(selector).children('.info-container__sub-container').html(content);
      })
      .attr('data-key', key)
      .animate({opacity: 1}, 1000, function(){});
    this.open = true;
  }
}

var randomDoodles = [
  'eye.png',
  'light_bulb.png',
  'aa.png',
  'cat.png',
  'geo.png',
  'landscape.png',
  'puzzle.png',
  'skull.png',
  'swear.png',
  'web.png'
];

for (var i = 0; i < randomDoodles.length; i++) {
    $('body').append('<img src="/images/doodles/'+randomDoodles[i]+'" style="display:none;">');
}

// var images = new Array();
// function preload() {
// 	for (let i = 0; i < preload.arguments.length; i++) {
// 		images[i] = new Image()
// 		images[i].src = preload.arguments[i]
// 	}
// }
//
//   for (let i = 0; i < randomDoodles.length; i++) {
//     preload('/images/doodles/'+randomDoodles[i]);
//   }




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
var findRandomDoodle = function () {
  var max = randomDoodles.length;
  // console.log("max: "+max);
  var min = 1;
  // console.log("min: "+min);
  var rand = Math.floor(Math.random() * (max - min)) + min;
  // console.log("rand: "+rand);
  return randomDoodles[rand];
}

var wrapImg = function (direction, element, frameHeight) {
  console.log(element);
  var numFrames = 5;
  var currframeHeight = frameHeight // pixels
  var newFrameHeight = '';
  var doodleHolder = $(element).siblings('.doodle-holder');
  // console.log(doodleHolder);
  if (direction === 'forwards') {
    var doodle = findRandomDoodle();
    newFrameHeight = 0;
    $(doodleHolder).attr('src', '/images/doodles/' + doodle).addClass('on');
  } else {
    // numFrames = numFrames - 1;
    newFrameHeight = (0 - currframeHeight * numFrames);
    $(doodleHolder).attr('src', '').removeClass('on');
  }
  for (var i = 0; i <= numFrames; i++) {
    // (function(i){
    // console.log('wrap function running');
    window.setTimeout(function () {
      // console.log('frameHeight: ' + newFrameHeight + '...' + i);
      // $(jQObj).css('background-position', '0 '+newFrameHeight+'px')
      // console.dir(element);
      element.style.top = newFrameHeight + 'px';
      if (direction === 'forwards') {
        // console.log('forwards running');
        newFrameHeight = newFrameHeight - frameHeight;
      } else if (direction === 'reverse') {
        newFrameHeight = newFrameHeight + frameHeight;
        // console.log('reverse running');
      } else {}
    }, i * 80);
  }
};



$(document).ready(function(){

  $("[data-subject]").each(function(index, element) {
    var newInfoElement = new infoElement(element);
    infoElements.push(newInfoElement);
  });

  // console.dir(infoElements);

  $(document).on('click', '.info-launcher', function(){
    var infoLabel = $(this).data('for');
    var prevKey = $('.info-container__sub-container').attr('data-key');
    // prevKey = parseInt(prevKey, 10)
    var open = false;
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

  $('body').on('click', '.info-container__close', function() {
    for (var i = 0, count = infoElements.length ; i < count ; i++) {
      // if (infoLabel === infoElements[i].label) {
        infoElements[i].close('.info-container');
      // }
    }
  });

  $('body').on('transitionend', '.info-container', function() {
    if($('.info-container').css('opacity') == 0) {
      $('.info-container__sub-container').html('');
    }
  });

  window.setInterval(function() {
    $('.swap span:first-child').toggleClass('on');
    // $('.swap dt:last-child').toggleClass('off');
  }, 2000);
  window.setTimeout(function() {
    window.setInterval(function() {
      $('.swap span:last-child').toggleClass('on');
      // $('.swap dt:first-child').toggleClass('off');
    }, 2000);
  }, 2000);

  // $(document).on('mouseover', '#paper', function() {
  //   var frameHeight = $('#paper').height();
  //   wrap('forwards', element, frameHeight);
  // });
  // $(document).on('mouseout', '#paper', function() {
  //   var frameHeight = $('#paper').height();
  //   wrap('reverse', element, frameHeight);
  // });

  // $(document).on('mouseover', '#paper', function() {
  //   var frameHeight = $('#paper').height();
  //   // let style = window.getComputedStyle(elementImg, null);
  //   // let frameHeight = style.getPropertyValue("height");
  //   // console.log('mouseover');
  //   wrapImg('forwards', elementImg, frameHeight);
  // });
  // $(document).on('mouseout', '#paper', function() {
  //   var frameHeight = $('#paper').height();
  //   // let style = window.getComputedStyle(elementImg, null);
  //   // let frameHeight = style.getPropertyValue("height");
  //   wrapImg('reverse', elementImg, frameHeight);
  // });

  //  paper element



  $('body').on('click', '.paper', function(e) {
      var frameHeight = $(this).height();
      // console.log(e);
      // var element = document.getElementsByClassName('paper');
      var elementImg = e.currentTarget.children[0].firstElementChild;

      $(this).toggleClass('clicked');
      if ($(this).hasClass('clicked')) {
        wrapImg('forwards', elementImg, frameHeight);
      }
      else {
        wrapImg('reverse', elementImg, frameHeight);
      }
    }
  );

  var mailLink = $('#obfuscated').attr('href');
  mailLink = atob(mailLink);
  $('#obfuscated').attr('href', mailLink);

  // var mailText = $('#obfuscated').html();
  // mailText = atob(mailText);
  // $('#obfuscated').html(mailText);


});
