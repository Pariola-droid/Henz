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
const main = document.querySelector('.main');
const svg = document.getElementById('svg');
const tl = gsap.timeline();
const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';
// === declarations

gsap.registerPlugin(ScrollTrigger);

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

/* ================= PRELOADER to Header 
==================== */
tl.from('.loader-wrap-heading .loader-wrap-heading-progress', {
  delay: 0.5,
  y: 200,
}).to('.loader-wrap-heading .loader-wrap-heading-progress', {
  delay: 1,
  y: -200,
  display: 'none',
});
tl.to(svg, {
  duration: 0.5,
  attr: { d: flat },
  ease: 'power2.easeIn',
}).to(svg, {
  duration: 0.5,
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

//

/* ================= PRELOADER to Header 
==================== */

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
// Locomotive scroll

// Hamburger Nav Open/Close
const cart = document.querySelector('.nav-cart');
const sideNav = document.querySelector('.sideNav');
const skrim = document.querySelector('.sideNav_skrim');
const sideWrap = document.querySelector('.sideNav_navContent');
const sideNavContent = document.querySelector('.sideNav_navContent-wrapper');
const sideNavContentLine = document.querySelectorAll(
  '.sideNav_navContent-top_line'
);

cart.addEventListener('click', () => {
  skrim.classList.toggle('toggle');
  sideWrap.classList.toggle('toggle');
  sideNav.classList.toggle('toggle');
  sideNavContent.classList.toggle('toggle');

  sideNavContentLine.forEach((sideNavContentL) => {
    sideNavContentL.classList.toggle('toggle');
  });

  if (sideNav.classList.contains('toggle')) {
    scroll.stop();
  } else {
    scroll.start();
  }
});
// Hamburger Nav Open/Close
