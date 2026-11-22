const svg = (content) => `<svg class="print-scene-art" width="640" height="460" viewBox="0 0 640 460" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><g stroke="#43534f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${content}</g></svg>`;

function ball(x, y) {
  return `<g transform="translate(${x} ${y})"><circle class="paint" r="25" fill="#df776d"/><path d="M-20-12C-4-7 10 6 18 18M-20 12C-5 5 8-8 15-19" fill="none" stroke="#fff1df"/></g>`;
}

function chair(x, y) {
  return `<g transform="translate(${x} ${y})"><path class="paint" d="M-54-125h108v28H-54zM-58-20H58V8H-58z" fill="#d6a067"/><path class="paint" d="M-48-97h15V8h-15zM33-97h15V8H33zM-47 8h14v92h-14zM33 8h14v92H33z" fill="#bb8551"/><path d="M-57 100h27M30 100h27" fill="none"/></g>`;
}

function cat(x, y, scale = 1, { mom = false, reach = false, sad = false } = {}) {
  const fur = mom ? '#c58e70' : '#e5a06f';
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path class="paint" d="M-43 37C-100 17-105 73-74 79-52 83-47 64-62 58-74 53-75 65-67 66" fill="${fur}"/>
    ${reach ? '<path class="paint" d="M30 25C78 35 123 47 170 44L174 58C121 69 70 58 25 48Z" fill="#e5a06f"/>' : ''}
    <ellipse class="paint" cx="0" cy="25" rx="53" ry="61" fill="${fur}"/>
    <ellipse class="paint" cx="-31" cy="75" rx="30" ry="16" fill="${fur}"/><ellipse class="paint" cx="31" cy="75" rx="30" ry="16" fill="${fur}"/>
    <path class="paint" d="M-42-70-34-119-7-83M42-70 34-119 7-83" fill="${fur}"/>
    <path class="paint" d="M-34-83-31-103-18-85M34-83 31-103 18-85" fill="#edb2a4"/>
    <circle class="paint" cx="0" cy="-48" r="48" fill="${fur}"/>
    <ellipse class="paint" cx="0" cy="-31" rx="26" ry="18" fill="#f7dfc5"/>
    <ellipse cx="-18" cy="-53" rx="5" ry="7" fill="#354943" stroke="none"/><ellipse cx="18" cy="-53" rx="5" ry="7" fill="#354943" stroke="none"/>
    <path d="M-5-35 0-30 5-35Z" fill="#b76f70"/><path d="M0-30v7m0 0q-8 ${sad ? -5 : 7}-13 0m13 0q8 ${sad ? -5 : 7} 13 0M-27-30h-28m28 9-27 7M27-30h28m-28 9 27 7" fill="none"/>
    <path d="M-12-83-8-70M0-86v16M12-83 8-70" fill="none" stroke="#a87457"/>
    ${mom ? '<path class="paint" d="M-55-91q-25-20-27 7 3 20 29 4 23 17 29-5-2-24-31-6Z" fill="#cf7f89"/><circle cx="-53" cy="-85" r="7" fill="#9f5e67"/>' : ''}
  </g>`;
}

function catScene(line) {
  const room = `<rect class="paint" width="640" height="460" rx="24" fill="#f6ecdc"/><path class="paint" d="M0 330h640v130H0z" fill="#ddd2b9"/><path d="M0 330h640" fill="none" stroke="#b7a88f"/><ellipse class="paint" cx="285" cy="386" rx="205" ry="42" fill="#dcb8a8"/>
    <g><rect class="paint" x="414" y="44" width="152" height="112" rx="5" fill="#b9d9df"/><circle class="paint" cx="530" cy="72" r="18" fill="#f1ca70"/><path class="paint" d="M416 135q46-60 79 0 35-45 69 0v19H416Z" fill="#a6bf98"/><path d="M490 44v112M414 100h152" fill="none" stroke="#fffaf0" stroke-width="8"/></g>`;
  if (line === 0) return svg(`${room}${chair(455, 295)}${cat(170, 278, 0.9)}${ball(322, 362)}<path d="M225 213q35-32 70 0" fill="none" stroke="#d49b62" stroke-dasharray="5 9"/>`);
  if (line === 1) return svg(`${room}${chair(445, 295)}${cat(220, 282, 0.88)}${ball(455, 365)}<path d="M282 370q60 28 119 2m-18-9 20 10-15 15" fill="none" stroke="#72998d" stroke-dasharray="7 8"/>`);
  if (line === 2) return svg(`${room}${chair(450, 295)}${cat(205, 282, 0.86, { reach: true, sad: true })}${ball(466, 367)}<path d="M330 180q25 18 50 0" fill="none" stroke="#a4afa9"/>`);
  return svg(`${room}${chair(350, 295)}<path class="paint" d="M465 324C419 343 393 368 340 366L337 378C405 385 445 362 480 344Z" fill="#c58e70"/>${cat(145, 286, 0.82)}${cat(492, 264, 1.02, { mom: true })}${ball(286, 367)}<path d="M213 199q18-25 36 0 18-25 36 0-18 28-36 39-18-11-36-39Z" class="paint" fill="#e9a39b"/>`);
}

function bench() {
  return `<g>
    <path class="paint" d="M171 181Q163 238 181 320L196 320Q181 241 188 181ZM462 181Q477 241 459 320H444Q463 238 449 181Z" fill="#b97e45"/>
    <path class="paint" d="M151 174Q322 157 493 174L493 199Q322 184 151 199ZM155 212Q322 198 489 212L489 237Q322 224 155 237Z" fill="#e0ad68"/>
    <path class="paint" d="M143 249Q157 239 181 246L225 259 222 272 174 263Q154 259 147 267ZM501 249Q487 239 463 246L423 259 426 272 470 263Q490 259 497 267Z" fill="#d39a5c"/>
    <path class="paint" d="M183 303C184 340 178 376 165 405H184C197 367 203 336 204 306ZM445 303C442 340 448 376 461 405H480C467 367 461 336 462 306Z" fill="#b97e45"/>
    <path class="paint" d="M145 280Q320 266 500 280L490 309Q320 296 155 309Z" fill="#dca65f"/>
    <path d="M174 185Q322 172 470 185M178 222Q322 210 466 222M174 288Q322 278 472 288M157 405h38M451 405h38" fill="none" stroke="#bd874f"/>
  </g>`;
}

function bunny(x, y, { wet = false, reaching = false } = {}) {
  const fur = wet ? '#9b96b5' : '#c9c2d9';
  const ears = wet
    ? '<ellipse class="paint" cx="-53" cy="-88" rx="18" ry="55" transform="rotate(-48 -53 -88)" fill="#9b96b5"/><ellipse class="paint" cx="53" cy="-88" rx="18" ry="55" transform="rotate(48 53 -88)" fill="#9b96b5"/>'
    : '<ellipse class="paint" cx="-25" cy="-116" rx="19" ry="61" transform="rotate(-8 -25 -116)" fill="#c9c2d9"/><ellipse class="paint" cx="25" cy="-116" rx="19" ry="61" transform="rotate(8 25 -116)" fill="#c9c2d9"/><ellipse class="paint" cx="-25" cy="-117" rx="8" ry="40" transform="rotate(-8 -25 -117)" fill="#e8b4b8"/><ellipse class="paint" cx="25" cy="-117" rx="8" ry="40" transform="rotate(8 25 -117)" fill="#e8b4b8"/>';
  return `<g transform="translate(${x} ${y})${reaching ? ' rotate(16)' : ''}">${ears}<ellipse class="paint" cx="0" cy="35" rx="54" ry="65" fill="${fur}"/><ellipse class="paint" cx="0" cy="38" rx="34" ry="43" fill="#f4ede2"/><circle class="paint" cx="0" cy="-37" r="48" fill="${fur}"/><ellipse class="paint" cx="-35" cy="85" rx="31" ry="19" fill="${fur}"/><ellipse class="paint" cx="35" cy="85" rx="31" ry="19" fill="${fur}"/>
    ${reaching ? '<path class="paint" d="M-35 25q-25 54-8 102l20-4q-10-48 10-83Z" fill="#c9c2d9"/>' : `<ellipse class="paint" cx="-48" cy="40" rx="17" ry="39" transform="rotate(18 -48 40)" fill="${fur}"/><ellipse class="paint" cx="48" cy="40" rx="17" ry="39" transform="rotate(-18 48 40)" fill="${fur}"/>`}
    <ellipse cx="-18" cy="-42" rx="5" ry="7" fill="#344542" stroke="none"/><ellipse cx="18" cy="-42" rx="5" ry="7" fill="#344542" stroke="none"/><path d="M-6-24 0-19 6-24Z" fill="#d98286"/><path d="M0-19v7m0 0q-7 6-13 0m13 0q7 6 13 0M-8 30l16 19m-16 0L8 30" fill="none" stroke="#7b7590" stroke-dasharray="3 4"/>
    ${wet ? '<path d="M-43-62q-8 13 0 17 8-4 0-17ZM36 6q-8 13 0 17 8-4 0-17ZM-19 54q-8 13 0 17 8-4 0-17Z" class="paint" fill="#8bb8c7"/>' : ''}
  </g>`;
}

function owner() {
  return `<g transform="translate(92 245) scale(.82)"><circle class="paint" cx="0" cy="-80" r="36" fill="#f2c7ad"/><path class="paint" d="M-36-84q0-49 38-42 35 4 32 45-17-4-31-27-20 22-39 24Z" fill="#d9b45f"/><path class="paint" d="M-27-38h54l25 104h-104Z" fill="#e99b68"/><path d="M-29-24-67 31M29-24 63 15M-23 65-29 132M23 65 31 132M-45 132h31M17 132h31" fill="none" stroke-width="9"/><circle cx="-12" cy="-82" r="3" fill="#40514f" stroke="none"/><circle cx="12" cy="-82" r="3" fill="#40514f" stroke="none"/><path d="M55-5h34M79-15l14 10-14 10" fill="none" stroke="#728f84" stroke-dasharray="5 6"/></g>`;
}

function cloudAndRain(heavy = false) {
  const drops = Array.from({ length: heavy ? 15 : 9 }, (_, index) => {
    const x = 225 + (index % 5) * 48 + (index % 2) * 9;
    const y = 137 + Math.floor(index / 5) * 54;
    return `<path d="M${x} ${y}l-8 20" fill="none" stroke="#6e9fb5" stroke-width="4"/>`;
  }).join('');
  return `<path class="paint" d="M215 113q-25-47 22-64 20-50 73-27 45-31 80 8 52-4 62 42 38 11 24 41Z" fill="#a9bdc9"/>${drops}`;
}

function bunnyScene(line) {
  const outdoors = `<rect class="paint" width="640" height="460" rx="24" fill="#dce9e8"/><path class="paint" d="M0 342q145-34 285 3 182-48 355-3v118H0Z" fill="#aabca6"/><g><path class="paint" d="M65 145h22v196H65zM555 136h22v205h-22z" fill="#8e7657"/><circle class="paint" cx="76" cy="120" r="69" fill="#87a28b"/><circle class="paint" cx="566" cy="105" r="78" fill="#87a28b"/></g><ellipse class="paint" cx="340" cy="408" rx="176" ry="25" fill="#8bb8c7" opacity=".65"/>`;
  if (line === 0) return svg(`${outdoors}${bench()}${bunny(340, 263)}${owner()}<path class="paint" d="M520 62a28 28 0 1 1 28 28" fill="#f1ca70"/>`);
  if (line === 1) return svg(`${outdoors}${cloudAndRain()}${bench()}${bunny(340, 263, { wet: true })}`);
  if (line === 2) return svg(`${outdoors}${cloudAndRain()}${bench()}${bunny(405, 274, { reaching: true })}<path d="M414 403h58m-15-10 17 10-17 10" fill="none" stroke="#6e9185" stroke-dasharray="5 6"/>`);
  return svg(`${outdoors}${cloudAndRain(true)}${bench()}${bunny(340, 263, { wet: true })}<path d="M191 389q26 12 52 0M443 390q26 12 52 0" fill="none" stroke="#e3f2f4"/>`);
}

function tomCharacter(line) {
  const armEnds = [
    [[-92, 72], [92, -42]],
    [[-75, 82], [88, -105]],
    [[-24, -12], [24, -12]],
    [[-82, 75], [82, 75]],
  ][line];
  const [[leftX, leftY], [rightX, rightY]] = armEnds;
  return `<g transform="translate(320 ${line === 0 ? 220 : 235})">
    <path d="M45 70C125 70 120 145 80 135 55 129 73 105 94 116" fill="none" stroke="#777d82" stroke-width="20"/>
    <path d="M-25 105-35 170M25 105 35 170" fill="none" stroke="#656c72" stroke-width="25"/>
    <ellipse class="paint" cx="-43" cy="180" rx="31" ry="16" fill="#f4f0e9"/><ellipse class="paint" cx="43" cy="180" rx="31" ry="16" fill="#f4f0e9"/>
    <path d="M-45 20Q${leftX} ${leftY - 15} ${leftX} ${leftY}M45 20Q${rightX} ${rightY - 15} ${rightX} ${rightY}" fill="none" stroke="#777d82" stroke-width="25"/>
    <circle class="paint" cx="${leftX}" cy="${leftY}" r="16" fill="#777d82"/><circle class="paint" cx="${rightX}" cy="${rightY}" r="16" fill="#777d82"/>
    <ellipse class="paint" cx="0" cy="62" rx="61" ry="78" fill="#d95f58"/><ellipse class="paint" cx="0" cy="65" rx="32" ry="48" fill="#f4f0e9"/>
    <path d="M-29-2Q0 22 29-2" fill="none" stroke="#f4f0e9" stroke-width="10"/><circle cx="-12" cy="35" r="4" fill="#f4f0e9" stroke="none"/><circle cx="12" cy="35" r="4" fill="#f4f0e9" stroke="none"/>
    <path class="paint" d="M-65-104-68-176-21-130M65-104 68-176 21-130" fill="#777d82"/>
    <path class="paint" d="M-55-119-58-155-34-132M55-119 58-155 34-132" fill="#e9939b"/>
    <ellipse class="paint" cx="0" cy="-67" rx="82" ry="72" fill="#777d82"/>
    <ellipse class="paint" cx="-29" cy="-76" rx="24" ry="29" fill="#f4f0e9"/><ellipse class="paint" cx="29" cy="-76" rx="24" ry="29" fill="#f4f0e9"/>
    <ellipse cx="-29" cy="-75" rx="14" ry="20" fill="#6ea86c" stroke="none"/><ellipse cx="29" cy="-75" rx="14" ry="20" fill="#6ea86c" stroke="none"/>
    <ellipse cx="-29" cy="-75" rx="6" ry="14" fill="#243832" stroke="none"/><ellipse cx="29" cy="-75" rx="6" ry="14" fill="#243832" stroke="none"/>
    <circle cx="-34" cy="-84" r="5" fill="#fff" stroke="none"/><circle cx="24" cy="-84" r="5" fill="#fff" stroke="none"/>
    <ellipse class="paint" cx="-20" cy="-39" rx="31" ry="23" fill="#f4f0e9"/><ellipse class="paint" cx="20" cy="-39" rx="31" ry="23" fill="#f4f0e9"/>
    <path class="paint" d="M-14-50Q0-60 14-50L0-38Z" fill="#e9939b"/>
    <path d="M0-38v10m0 0q-20 20-34 0m34 0q20 20 34 0M-48-38-91-44M-48-27-90-19M48-38 91-44M48-27 90-19" fill="none"/>
    <path d="M-20-125-15-108M0-130v22M20-125 15-108" fill="none" stroke="#565d63" stroke-width="7"/>
  </g>`;
}

function tomScene(line) {
  const room = `<rect class="paint" width="640" height="460" rx="24" fill="#e8e5f1"/><path class="paint" d="M0 340h640v120H0z" fill="#d9cfbd"/><ellipse class="paint" cx="320" cy="405" rx="200" ry="37" fill="#9ebfc0"/><path class="paint" d="M68 312h145v38H68z" fill="#b2c8d2"/><ellipse class="paint" cx="140" cy="312" rx="68" ry="22" fill="#f0d5a6"/><g><path class="paint" d="M520 182h70v35h-70z" fill="#f1eee8"/><path d="M555 217v105M530 185q25-55 50 0" fill="none" stroke="#91a8ad" stroke-width="9"/></g>`;
  if (line === 0) return svg(`${room}${tomCharacter(line)}<path d="M205 155q-25 35-15 70M435 145q25 35 15 70M272 65q48-25 96 0" fill="none" stroke="#d6a657" stroke-dasharray="7 9"/>`);
  if (line === 1) return svg(`${room}${tomCharacter(line)}<path d="M424 96l20-20m-7 40 28-8m-46-29 4-28" fill="none" stroke="#d6a657" stroke-width="5"/>`);
  if (line === 2) return svg(`${room}${tomCharacter(line)}<g transform="translate(343 221) rotate(-18)"><rect class="paint" x="-8" y="-55" width="16" height="75" rx="7" fill="#6fa9ba"/><rect class="paint" x="-13" y="-63" width="26" height="15" rx="4" fill="#f4f0e9"/></g><g fill="#d8f1f2" stroke="#8bb8c7"><circle cx="210" cy="125" r="15"/><circle cx="440" cy="135" r="20"/><circle cx="462" cy="83" r="11"/></g>`);
  return svg(`${room}${tomCharacter(line)}${ball(475, 365)}<g fill="#d6a657" stroke="#43534f"><ellipse cx="175" cy="112" rx="13" ry="10"/><path d="M186 110V62l34-8v47" fill="none" stroke-width="7"/><ellipse cx="211" cy="103" rx="13" ry="10"/><ellipse cx="466" cy="132" rx="12" ry="9"/><path d="M476 130V84l29-7" fill="none" stroke-width="7"/></g>`);
}

export function renderPrintScene(storyId, lineIndex = 0) {
  const numericIndex = Number(lineIndex);
  const line = Number.isFinite(numericIndex) ? Math.max(0, Math.min(3, Math.trunc(numericIndex))) : 0;
  if (storyId === 'cat') return catScene(line);
  if (storyId === 'tom') return tomScene(line);
  return bunnyScene(line);
}
