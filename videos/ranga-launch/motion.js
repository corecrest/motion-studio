const film = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

function rise(target, at, distance = 36, duration = .64) {
  film.fromTo(target, { opacity: 0, y: distance }, { opacity: 1, y: 0, duration }, at);
}

function screen(previous, next, at) {
  film.fromTo(next, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .34 }, at);
  film.to(previous, { opacity: 0, duration: .29, ease: 'power2.in' }, at + .03);
}

function headline(previous, next, at) {
  film.to(previous, { opacity: 0, y: -19, duration: .25 }, at);
  rise(next, at + .13, 22, .46);
}

function tap(x, y, at) {
  film.set('#tap', { left: x + '%', top: y + '%', xPercent: -50, yPercent: -50, scale: .65, opacity: .85 }, at);
  film.to('#tap', { scale: 1.5, opacity: 0, duration: .32 }, at);
}

film.fromTo('.opening-rule', { scaleX: 0 }, { scaleX: 1, duration: .64 }, .04);
rise('h1 span:first-child', .35);
rise('h1 span:last-child', .85);
rise('#opening p', 1.32, 22);
film.fromTo('#product', { opacity: 0, clipPath: 'inset(100% 0 0)' }, { opacity: 1, clipPath: 'inset(0% 0 0)', duration: .68, ease: 'power3.inOut' }, 3.06);
film.set('#home', { opacity: 1 }, 3.06);
rise('#overview-copy', 3.4);
film.fromTo('#device', { y: 80, scale: .97 }, { y: 0, scale: 1, duration: 1 }, 3.3);
tap(90, 48, 5.38);
screen('#home', '#accounts', 5.49);

screen('#accounts', '#pay', 7.42);
headline('#overview-copy', '#pay-copy', 7.32);
tap(80, 84, 10.45);
screen('#pay', '#handoff', 10.64);

screen('#handoff', '#activity', 12.86);
headline('#pay-copy', '#activity-copy', 12.76);
film.to('#activity-body', { y: -164, duration: 1.05, ease: 'power2.inOut' }, 14.05);
tap(56, 67.5, 15.48);
screen('#activity', '#receipt', 15.63);

screen('#receipt', '#planned', 17.4);
headline('#activity-copy', '#plan-copy', 17.30);
tap(66, 67.8, 19.27);
screen('#planned', '#plan-detail', 19.41);

film.fromTo('#wipe', { yPercent: 100 }, { yPercent: 0, duration: .57, ease: 'power3.inOut' }, 20.91);
film.fromTo('#brand', { opacity: 1, clipPath: 'inset(100% 0 0)' }, { opacity: 1, clipPath: 'inset(0% 0 0)', duration: .66, ease: 'power3.inOut' }, 21.36);
rise('.brand-icon', 21.70, 20, .58);
film.fromTo('.brand-rule', { scaleX: 0 }, { scaleX: 1, duration: .55 }, 21.91);
film.fromTo('.wordmark-window', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .85 }, 22.03);
rise('#brand p', 22.77, 21, .55);
film.set('#brand p', { opacity: 1 }, 25);

window.__timelines = { main: film };
