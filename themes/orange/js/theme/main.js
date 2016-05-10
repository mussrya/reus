/* REUS JAVASCRIPT */

//JSHint options
/* global $ */
/* global document */
/* global window */
/* global WOW */
/* global particlesJS */
/* global setInterval */
/* global clearInterval */
/* global setTimeout */

// Global variable for the menu scrolling variable which gets stopped if another animation is triggered
var menuScroll;

// Particles script loading, if you wish to change the configuration please edit the .json file (path can be seen below). There is a GUI editor available for the .json file at the following URL (http://vincentgarreau.com/particles.js/)
particlesJS.load('particles-js', 'js/includes/particlesjs-config.json');

// Wait until the page has loaded fully before running any additional JavaScript
$(window).load(function () {
    
    // Using strict as a JavaScript best practice
    "use strict";

    // Remove the loading pre-loader graphics and show the content
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({
        'overflow': 'visible'
    });

    // Click handler for the main menu on the top left hand side
    $('#menu li a, .footerMenu a').on('click', function (event) {
        // This prevents the menu items being selected mid-scroll
        $('body').addClass('scrolling');
        var positionID = $(this).attr('href').replace('#', '.');
        $('#menu').find('.active').removeClass('active');
        $(this).addClass('active');
        if (menuScroll) {
            menuScroll.stop();
        }
        
        // Animate the scroll
        menuScroll = $("html, body").animate({
            scrollTop: $(positionID).position().top - 60
        }, 1000, function () {
            // Remove the class set on the body so the menu will work when scrolling normally
            $('body').removeClass('scrolling');
        });
    });

    // Click handler for when the brand i.e. the logo at the top left is clicked
    $('a.navbar-brand').on('click', function (event) {
        $('#menu li a[href="#home"]').click();
    });

    // Look for browser scrolling so that the menu items can be selected as the user scrolls past each section
    $(document).bind('scroll', function (e) {
        fixedMenu.mobileFixedRemoval();
        if (window.pageYOffset > 40) {
            $('.navbar-fixed-top').css({
                'background': 'rgba(0, 0, 0, 0.4)'
            });
        } else {
            $('.navbar-fixed-top').css({
                'background': 'rgba(0, 0, 0, 0)'
            });
        }
        if (!$('body').hasClass('scrolling')) {
            $('section').each(function () {
                if (
                    $(this).offset().top < window.pageYOffset + 60 && $(this).offset().top + $(this).height() > window.pageYOffset + 60
                ) {
                    if ($(this).attr('data-name')) {
                        window.location.hash = $(this).attr('data-name');
                        $('#menu').find('.active').removeClass('active');
                        $('#menu li a[href="#' + $(this).attr('data-name') + '"]').addClass('active');
                    }
                }
            });
        }
    });

    // Checking when the window is resized to remove the fixed header if on mobile devices
    $(window).resize(function () {
        fixedMenu.mobileFixedRemoval();
    });

    // Click handler for when a footer link is clicked which relates to navigation
    $('.footerMenu a').on('click', function (event) {
        scroller.scrollToSection(0, true);

    });
    
    // WOW animation configuration to handle animation of the content and sections
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
        scrollContainer: null // optional scroll container selector, otherwise use window
    });

    // Slideshow / Caorsel function which can be seen at the very top of the page
    var slides = {
        start: function () {
            var $slide = $("#sliderMain"),
                $slides = $slide.find(".slider"),
                $prev = $slide.find("#sliderLeft"),
                $next = $slide.find("#sliderRight");

            var index = 0;
            var timer = setInterval(function () {
                index++;
                if (index >= $slides.length) {
                    index = 0;
                }
                slideUpdate(index);
            }, 4500);
            $prev.click(function () {
                clearInterval(timer);
                timer = null;
                index--;
                if (index < 0) {
                    index = $slides.length - 1;
                }
                slideUpdate(index);
            });
            $next.click(function () {
                clearInterval(timer);
                timer = null;
                index++;
                if (index >= $slides.length) {
                    index = 0;
                }
                slideUpdate(index);
            });
            $slide.hover(function () {
                $prev.addClass("active");
                $next.addClass("active");
            }, function () {
                $prev.removeClass("active");
                $next.removeClass("active");
            });

            function slideUpdate(index) {
                $slides.removeClass("activeSlider");
                $slides.eq(index).addClass("activeSlider");
            }
        }
    };

    // A scrollTo function to scroll to a section which has been set previously in the URL i.e. if somebody shared the URL
    var scroller = {
        scrollToSection: function (delayValue, scrollType) {
            setTimeout(function () {
                var hash = window.location.hash;
                if (hash && hash !== '#') {
                    $('#menu li a[href="' + hash + '"]').click();
                    $('#menu li a[href="#' + hash + '"]').addClass('active');
                }
            }, delayValue);
        }
    };

    // Function to remove the fixed header if on mobile devices
    var fixedMenu = {
        mobileFixedRemoval: function () {
            if (window.innerWidth < 720) {
                $('.navbar-fixed-top').removeClass('navbar-fixed-top');
                $('section[name="home"]').removeClass('marginTop').removeClass('marginBottom');
            } else {
                $('.navbar').addClass('navbar-fixed-top');
                $('section[name="home"]').addClass('marginTop').addClass('marginBottom');
            }
        }
    };

    // Initializing the various functions
    slides.start();
    wow.init();
    fixedMenu.mobileFixedRemoval();

    // Adding the active class to the first menu item if no hash is found
    if (!window.location.hash || window.location.hash === '#home') {
        $('#menu li a:first').addClass('active');
    }

    // This briefly waits before running the scrollTo function
    if (window.pageYOffset > 1 || window.location.hash != '#home') {
        scroller.scrollToSection(800, false);
    }

    // Initializing the lightbox script
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });
    
});