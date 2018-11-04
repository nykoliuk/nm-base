$(function() {
    //Menu
    $(".navbar-toggler").click(function(e) {
        $navButton = $(this);
        $nav = $(".navbar");
        $navBar = $nav.find(".navbar-collapse");
        if (!$nav.hasClass("open")) {
            $nav.addClass("open");
            $('body').css('overflow', 'hidden');
        } else {
            $nav.removeClass("open");
            $('body').css('overflow', 'auto');
        }
    });
});

//LazyLoad Images
var lazyLoadOptions = { threshold: 500 };
var aLazyLoad = new LazyLoad(lazyLoadOptions);
