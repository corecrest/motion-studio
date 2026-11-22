const transactions = [
  ['20 November', [['T', 'Transport', '07:42 · Transport', '−1,500'], ['C', 'Coffee', '07:15 · Food', '−2,400']]],
  ['19 November', [['G', 'Groceries', '18:20 · Food and groceries', '−3,600'], ['D', 'Data bundle', '15:54 · Utilities', '−1,000'], ['P', 'Incoming payment', '11:06 · Income', '+20,000']]],
  ['18 November', [['T', 'Transport', '08:12 · Transport', '−2,000']]],
];

const list = document.querySelector('#activity-list');
for (const [date, entries] of transactions) {
  const heading = document.createElement('h3');
  heading.textContent = date;
  list.append(heading);
  for (const [initial, title, detail, amount] of entries) {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<span class="tile">${initial}</span><span>${title}<small>${detail}</small></span><b>${amount}</b>`;
    if (title === 'Groceries') row.id = 'groceries';
    list.append(row);
  }
}

const timeline = gsap.timeline({paused:true, defaults:{ease:'power3.out'}});
const hide = {opacity:0, y:34};
const show = {opacity:1, y:0, duration:.62};

function enter(element, time) {
  timeline.fromTo(element, hide, show, time);
}

function swap(previous, next, time) {
  timeline.to(previous, {opacity:0, x:-14, duration:.22, ease:'power2.in'}, time);
  timeline.fromTo(next, {opacity:0, x:18}, {opacity:1, x:0, duration:.30}, time + .09);
}

function tap(selector, time) {
  const target = document.querySelector(selector).getBoundingClientRect();
  const screen = document.querySelector('.screen').getBoundingClientRect();
  timeline.set('#touch', {
    x:(target.left - screen.left + target.width / 2) * document.querySelector('.screen').offsetWidth / screen.width - 23,
    y:(target.top - screen.top + target.height / 2) * document.querySelector('.screen').offsetHeight / screen.height - 23,
    scale:.55,
    opacity:.9,
  }, time);
  timeline.to('#touch', {scale:1.45, opacity:0, duration:.29}, time);
}

function setLabel(selector, before, after, time) {
  // Crossfade independent text nodes so scrubbing also restores the original label.
  const label = document.querySelector(selector);
  label.style.position = 'relative';
  const replacement = document.createElement('span');
  const original = document.createElement('span');
  original.textContent = before;
  replacement.textContent = after;
  replacement.style.cssText = 'position:absolute;inset:0;opacity:0';
  label.replaceChildren(original, replacement);
  timeline.to(original, {opacity:0, duration:.09}, time);
  timeline.to(replacement, {opacity:1, duration:.12}, time + .06);
}

timeline.fromTo('.opening-rule', {scaleX:0}, {scaleX:1, duration:.59}, .04);
enter('h1 span:first-child', .38);
enter('h1 span:last-child', .99);
enter('#opening p', 1.57);

timeline.fromTo('#product', {opacity:0, clipPath:'inset(100% 0 0 0)'}, {opacity:1, clipPath:'inset(0% 0 0 0)', duration:.72, ease:'power3.inOut'}, 3.74);
timeline.set('#home', {opacity:1}, 3.74);
enter('#home-copy', 4.15);
timeline.fromTo('.device', {y:90, scale:.96}, {y:0, scale:1.055, duration:1.15}, 4.04);

tap('.pay-pill', 7.89);
swap('#home', '#pay', 8.02);
swap('#home-copy', '#pay-copy', 7.93);
const digits = document.querySelector('#digits');
digits.textContent = '';
for (const [index, value] of ['0', '5', '50', '500', '5,000'].entries()) {
  const glyph = document.createElement('span');
  glyph.textContent = value;
  glyph.style.display = index ? 'none' : 'inline';
  digits.append(glyph);
  if (!index) continue;
  const time = 8.59 + (index - 1) * .22;
  tap(index === 1 ? '#key5' : '#key0', time);
  timeline.set(digits.children[index - 1], {display:'none'}, time + .05);
  timeline.set(glyph, {display:'inline'}, time + .05);
}
tap('#source-field', 9.62);
enter('#source-sheet', 9.71);
tap('#source-sheet .row:first-of-type', 10.18);
timeline.to('#source-sheet', {opacity:0, y:22, duration:.24}, 10.27);
setLabel('#source-label', 'Choose an account', 'Mobile wallet', 10.28);
tap('#beneficiary-field', 10.73);
enter('#beneficiary-sheet', 10.83);
tap('#beneficiary-sheet .row:first-of-type', 11.36);
timeline.to('#beneficiary-sheet', {opacity:0, y:22, duration:.24}, 11.45);
setLabel('#beneficiary-label', 'Choose a beneficiary', 'Aline U.', 11.46);
tap('#review-button', 11.91);
swap('#pay', '#review', 12.02);
tap('#review .action', 13.06);
swap('#review', '#handoff', 13.16);

swap('#handoff', '#activities', 14.0);
swap('#pay-copy', '#activity-copy', 13.96);
timeline.to('#activity-list', {y:-132, duration:1.30, ease:'power2.inOut'}, 15.62);
timeline.fromTo('#groceries', {backgroundColor:'#101714'}, {backgroundColor:'#274235', duration:.35}, 17.08);
swap('#activities', '#receipt', 17.46);

timeline.fromTo('#wipe', {yPercent:100}, {yPercent:0, duration:.64, ease:'power3.inOut'}, 18.94);
timeline.set('#product', {opacity:0}, 19.58);
timeline.fromTo('#brand', {opacity:1, clipPath:'inset(100% 0 0 0)'}, {opacity:1, clipPath:'inset(0% 0 0 0)', duration:.76, ease:'power3.inOut'}, 19.59);
timeline.fromTo('.brand-rule', {scaleX:0}, {scaleX:1, duration:.68}, 20.0);
enter('.brand-icon', 20.05);
timeline.fromTo('.wordmark-window', {clipPath:'inset(0% 100% 0% 0%)'}, {clipPath:'inset(0% 0% 0% 0%)', duration:1.18, ease:'power3.inOut'}, 20.18);
enter('#brand p', 23.0);
timeline.set('#brand p', {opacity:1}, 25);

window.__timelines = {main:timeline};
