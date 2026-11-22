const film = gsap.timeline({ paused:true, defaults:{ ease:'power3.out' } });

function reveal(target, time, distance) {
  film.fromTo(target, {opacity:0,y:distance}, {opacity:1,y:0,duration:.52}, time);
}

function screen(previous, next, time) {
  film.fromTo(next, {opacity:0,x:22}, {opacity:1,x:0,duration:.38}, time);
  film.to(previous, {opacity:0,duration:.30}, time + .04);
}

function feature(previous, next, from, to, time) {
  film.to(previous, {opacity:0,y:-18,duration:.24}, time);
  reveal(next,time + .12,26);
  screen(from,to,time + .08);
}

film.fromTo('.phone', {y:16}, {y:0,duration:.85}, 0);
screen('#home','#accounts',2.75);
feature('#accounts-copy','#pay-copy','#accounts','#pay',5.25);
feature('#pay-copy','#activity-copy','#pay','#activity',10.05);
screen('#activity','#receipt',13.22);
feature('#activity-copy','#plan-copy','#receipt','#planned',15.9);
screen('#planned','#plan-detail',18.72);
film.fromTo('#wipe', {xPercent:100}, {xPercent:0,duration:.64,ease:'power3.inOut'}, 21.05);
film.fromTo('#closing', {opacity:1,clipPath:'inset(0 0 0 100%)'}, {opacity:1,clipPath:'inset(0 0 0 0%)',duration:.66,ease:'power3.inOut'}, 21.56);
reveal('.icon',21.87,20);
reveal('.brand',22.08,28);
reveal('#closing p',22.64,18);
film.set('#closing p',{opacity:1},25);
window.__timelines = {main:film};
