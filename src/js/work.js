import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

//jQuery
import $ from 'jquery';

//=== Cursor
import Cursor from './cursor';
import Magnetic from './magnetic';

// === declarations
const body = document.querySelector('body');
const svg = document.getElementById('svg');
const tl = gsap.timeline();
const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';
// === declarations

gsap.registerPlugin(ScrollTrigger);

// Locomotive scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  lerp: 0.06,
  tablet: {
    breakpoint: 768,
  },
});

setTimeout(() => {
  scroll.update();
}, 1000);

scroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scroll.el, {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },

  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

/* ================= PRELOADER to Header 
==================== */
tl.from('.loader-wrap-heading h1', {
  delay: 1,
  y: 200,
  skewY: 10,
}).to('.loader-wrap-heading h1', {
  delay: 0.2,
  y: -200,
  skewY: 10,
});
tl.to(svg, {
  duration: 0.2,
  attr: { d: curve },
  ease: 'power2.easeIn',
}).to(svg, {
  duration: 0.2,
  attr: { d: flat },
  ease: 'power2.easeOut',
});
tl.to('.loader-wrap', {
  y: -1500,
});
tl.to('.loader-wrap', {
  zIndex: -1,
  display: 'none',
});
tl.from(
  '#nav-nime',
  {
    delay: 0.8,
  },
  '-=1.5'
);
tl.from(
  '#up-nime',
  {
    opacity: 0,
    y: 100,
    duration: 0.5,
  },
  '-=1.5'
);
/* ================= PRELOADER to Header 
==================== */

//=== init Cursor
// Init cursor
const cursor = new Cursor({
  container: 'body', // container to attach
  speed: 0.7, // default speed
  ease: 'expo.out', // default ease (gsap)
  visibleTimeout: 300, // disappear timeout
});

const magnetic = new Magnetic({
  y: 0.2,
  x: 0.2,
  s: 0.2,
  rs: 0.7,
});

// Automatic handle magnetic elements through attribute
$('[data-magnetic]').each(function () {
  new Magnetic(this);
});

/**
 * Scrolltrigger Scroll Check
 */

$(document).ready(function () {
  $(window).scroll(function () {
    // const scroll = $(window).scrollTop();

    if ($(window).scrollTop() > 800) {
      $('main').addClass('scrolled');
    } else {
      $('main').removeClass('scrolled');
    }
  });
});

// window.addEventListener('scroll', function () {
//   var navFixed = document.querySelector('.nav-hamburger');
//   navFixed.classList.toggle('navshow', window.scrollY > 100);
// });

// ScrollTrigger.create({
//   start: 'top -30%',
//   onUpdate: (self) => {
//     $('main').addClass('scrolled');
//   },
//   onLeaveBack: () => {
//     $('main').removeClass('scrolled');
//   },
// });
