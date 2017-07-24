function setActive(indP) {
  if (typeof myVar != 'undefined') {
    var indW = $('.nav--desktop a.active').first().width();
    console.log(indW);
    console.log(indP);
    $('#indicator').css('left', indP.left).css('width', indW + 'px');
    console.log('setActive');
  }
}

$(document).on('click', 'button.hamburger', function(){
  $(this).toggleClass('active');
  $('.nav--overlay').toggleClass('active').addClass('alive');
  $('a.identity').toggleClass('active');
});

$(document).ready(function(){

  var indP = $('.nav--desktop a.active').first().position();

  setActive(indP);

  $('.nav--desktop ul li a').hover(function(){
    var currP = $(this).position();
    var width = $(this).width();
    // var currPL = currP.left - parseInt($('.inner-wrapper').css('padding-left'));
    var currPL = currP.left;
    console.log(currP);
    $('#indicator').css('left', currPL).css('width', width + 'px');
    // $(this).css('position', 'relative');
  }, function(){
    setActive(indP);
  });

  // https://codepen.io/shellbryson/pen/RaGByK
  // Toggle the field type
  $('.form-lockup').on('click', '#togglepw', function(e) {
    e.preventDefault();
    var field = $('#password');
    console.log(field);
    if (field.attr("type") == "password") {
      field.attr("type","text");
      $(e.target).find('span').text('Hide');
      $('svg.eye').hide();
      $('svg.eye-with-line').show();
    } else {
      field.attr("type","password");
      $(e.target).find('span').text('Show');
      $('svg.eye-with-line').hide();
      $('svg.eye').show();
    }
  });

  $('#sign-in').find('input[type=text], input[type=password], input[type=email]').change(function(e){
    $(e.currentTarget).addClass('typed');
  });

  // Set the form field back to a regular password element
  // $('#sign-in').on('submit', function(e) {
  //   var field = $('#password');
  //   e.preventDefault();
  //   field.attr("type","password");
  //   $('form#sign-in').submit();
  // });

  // $(LargeLockup).css('top', '30px');
  // $(LargeLockup).css({
  //   'transform': 'matrix(1, 0, 0, 1, 0, '+LargeLockupInit+')'
  // })
  // $(SmallLockupOne).css({
  //   'transform': 'matrix(1, 0, 0, 1, 0, '+SmallLockupInitOne+')'
  // })
  // $(SmallLockupTwo).css({
  //   'transform': 'matrix(1, 0, 0, 1, 0, '+SmallLockupInitTwo+')'
  // })

});

var masterScrollPos = $(window).scrollTop(),
// scrollPosFactored,
// thisPos,
// thisTrans,
thisPerc,
result,
LargeLockupOne = $('#large-lockup-one'),
SmallLockupOne = $('#small-lockup-one');

// var scrollAmount = 1;

$(document).ready(function(){
  // initialOffset(LargeLockupOne, 10);
  // initialOffset(SmallLockupOne, 30);
});

// SCROLL/PARALLAX RELATED
$(document).on("scroll", window, function() {
  pScroll(LargeLockupOne, 30);
  pScroll(SmallLockupOne, 10);
  // pScroll(SmallLockupOne, SmallLockupInitOne, 8);
  // pScroll(SmallLockupTwo, SmallLockupInitTwo, 8);
  // $(LargeLockup).css('top', '60px');
});

// function initialOffset(element, offset) {
//   $(element).css({
//     'transform': 'translate(0, '+offset+'%)'
//   })
// }

function pScroll(element, factor) {
  masterScrollPos = $(window).scrollTop();
  // console.log('masterScrollPos: ' + masterScrollPos);
  // scrollPosFactored = masterScrollPos / factor;
  // console.log('scrollPosFactored: ' + scrollPosFactored);
  // thisPos = $(element).offset().top / 100;
  // thisTrans = $(element).css('transform');
  // thisSplitted = thisTrans.split(',');
  // thisPerc = thisSplitted[5].slice(0, -1) / 10;
  // console.log('thisPos: ' + thisPos.top);
  // offsetRatio = masterScrollPos/thisPos.top,
  // console.log('offsetRatio: ' + offsetRatio);
  // totalOffset = thisPos.top - masterScrollPos,
  // console.log('totalOffset: ' + totalOffset);
  // jump = totalOffset/thisPos.top * 10;
  // console.log('jump: ' + jump);
  // var result = scrollPosFactored - jump;
  // var result = scrollAmount * factor / masterScrollPos;
    result = (masterScrollPos / factor);
  // result = (thisPos / masterScrollPos) * 100;
  // if (offsetRatio >= 0.3) {
    // result = scrollPosFactored - totalOffset;
    // console.log(thisTrans);
    // console.log('thisPos: '+thisPos);
    console.log('thisPerc: '+thisPerc);
    console.log('result: '+result);
    $(element).css({
      'transform': 'translate(0, -'+result+'%)'
    })
    // scrollAmount++;
  // }
}
