//Animate Page
$.fn.needAnimate = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() - 100;

    return elementBottom > viewportTop && elementTop < viewportBottom || elementBottom < viewportTop;
};

$(window).on('resize scroll', function() {
    $('.js-anim').each(function() {
        var that = $(this);
        if (that.needAnimate()) {
            if (!that.hasClass('isInViewport')) {
                that.addClass('isInViewport');
                var animName = that.data('animate');
                that.addClass(animName);
            }
        }
    });
});

function goToSection(id, time) {
    var topScrollOffset = 0;
    $('html, body').animate({
        scrollTop: $(id).offset().top - topScrollOffset
    }, time);
}

//BackToTop
var scrollTrigger = 1000;
function backToTop() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > scrollTrigger) {
        $('.back-to-top').fadeIn(200);
    } else {
        $('.back-to-top').fadeOut(200);
    }
};
//backToTop();
$(window).on('scroll', function () {
    //backToTop();
});
$('.back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html,body').animate({
        scrollTop: 0
    }, 700);
});

//// Detect objectFit support
if('objectFit' in document.documentElement.style === false) {
    var container = document.getElementsByClassName('js-box');
    for(var i = 0; i < container.length; i++) {
        var imageSource = container[i].querySelector('img').src;
        container[i].querySelector('img').style.display = 'none';
        container[i].style.backgroundSize = 'cover';
        container[i].style.backgroundImage = 'url(' + imageSource + ')';
        container[i].style.backgroundPosition = 'center center';
    }
}
