// Init the masterScrollPos variable, getting how far the top of the window is from the top of the page
var masterScrollPos = window.scrollY,
// Init scrollElements array
scrollElements = [],
// For debugging, select the info element so you can see how far you are from the top
info = $(".info"),
// Next is the window height
windowHeight = $(window).innerHeight();

// An object constructor for each of your elements. It contains...
function TransitionElem(element, correction) {
  // a jQuery object of the element,
  (this.elem = element), // its computed height as a number,
  (this.height = $(element).outerHeight()), // as well as a custom offset in in pixels, increase if you want the change of the object to happen later.
  (this.scrollCorrection = correction), // Also, get this element's position from the top of the page
  (this.pos = $(element).offset());
}

TransitionElem.prototype = {
  elementIn: function() {
  /* Setup the first argument, take the window height, add it to the masterScrollPos which is how far the top of the window is from the top of the page, and you get a reference to the bottom of the window. Add a third of your element's height (this makes sure at least a third of the element is showing before the tranistion starts), then subtract scrollCorrection value you specified. This tells the element when to start transitioning. */
  let argument1 =
    windowHeight +
    masterScrollPos +
    this.height / 3 -
    this.scrollCorrection,
  // Second argument is simply how far the top of your element is from the top of the page.
  argument2 = this.pos.top;
  // If our first computation is greater than or equal to the second one, then we know at least a third of our element is inside the viewport.
  if (argument1 >= argument2) {
    // We could do a lot of things here, but let's just add a class and do the rest of our animations in CSS/Sass.
    $(this.elem).addClass("in-view");
  }
 }
}

// Let's run some things on document ready
$(document).ready(function() {
  // update the debugger
  info.html(masterScrollPos);

  // For every element you've placed a data-scroll attribute on, create a new Object using the above constructor. Push that to the scrollElements array.
  $("[data-scroll]").each(function(index, element) {
    let newObj = new TransitionElem(element, $(this).attr("data-scroll"));
    scrollElements.push(newObj);
    // if the element is positioned less than the window height plus the window scroll position, then it's in the viewport onload, so run the elementIn function right now!
    if (newObj.pos.top < windowHeight + masterScrollPos) {
      newObj.elementIn();
    }
  });

  //elementIn(elementOne);
});

/* This function will run whenever the window size changes, so we can re-compute the height and top position of our elements (just in case they're responsive). It has a timeout, so it will wait until the user is done resizing. */
window.setTimeout(function() {
  $(window).resize(function() {
    windowHeight = $(window).innerHeight();

    for (var i = 0, scrollElementslength = scrollElements.length; i < scrollElementslength; i++) {
      scrollElements[i].pos = $(scrollElements[i].elem).offset();
      scrollElements[i].height = $(scrollElements[i].elem).outerHeight();
      if (scrollElements[i].pos.top < windowHeight) {
        scrollElements[i].elementIn();
      }
    }
  });
}, 300);

// The scroll event listener. The function inside will run on every scrolled pixel.
$(document).on("scroll", window, function() {
  // On each scroll, update how far we are from the top.
  masterScrollPos = window.scrollY;
  // Update the debugger
  info.html(masterScrollPos);
  // Add a reference to this function for each element you want to transition in.
  for (var i = 0, scrollElementslength = scrollElements.length; i < scrollElementslength; i++) {
    scrollElements[i].elementIn();
  }
});
