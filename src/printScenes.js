const svg = (content) => `<svg class="print-scene-art" width="640" height="460" viewBox="0 0 640 460" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><g stroke="#43534f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${content}</g></svg>`;

function ball(x, y) {
  return `<g transform="translate(${x} ${y})"><circle class="paint" r="25" fill="#df776d"/><path d="M-20-12C-4-7 10 6 18 18M-20 12C-5 5 8-8 15-19" fill="none" stroke="#fff1df"/></g>`;
}

function chair(x, y) {
  return `<g transform="translate(${x} ${y})"><path class="paint" d="M-54-125h108v28H-54zM-58-20H58V8H-58z" fill="#d6a067"/><path class="paint" d="M-48-97h15V8h-15zM33-97h15V8H33zM-47 8h14v92h-14zM33 8h14v92H33z" fill="#bb8551"/><path d="M-57 100h27M30 100h27" fill="none"/></g>`;
}

function cat(x, y, scale = 1, { mom = false, reach = false, sad = false } = {}) {
  const fur = mom ? '#cabdae' : '#e8a468';
  const cheek = mom ? '#f5efe6' : '#fff3e2';
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path class="paint" d="M-43 37C-100 17-105 73-74 79-52 83-47 64-62 58-74 53-75 65-67 66" fill="${fur}"/>
    ${reach ? `<path class="paint" d="M30 25C78 35 123 47 170 44L174 58C121 69 70 58 25 48Z" fill="${fur}"/>` : ''}
    <ellipse class="paint" cx="0" cy="25" rx="53" ry="61" fill="${fur}"/>
    <ellipse class="paint" cx="0" cy="28" rx="33" ry="42" fill="${cheek}"/>
    <ellipse class="paint" cx="-31" cy="75" rx="30" ry="16" fill="${fur}"/><ellipse class="paint" cx="31" cy="75" rx="30" ry="16" fill="${fur}"/>
    <ellipse class="paint" cx="-34" cy="-88" rx="20" ry="30" transform="rotate(-16 -34 -88)" fill="${fur}"/><ellipse class="paint" cx="34" cy="-88" rx="20" ry="30" transform="rotate(16 34 -88)" fill="${fur}"/>
    <ellipse class="paint" cx="-34" cy="-87" rx="11" ry="18" transform="rotate(-16 -34 -87)" fill="#f29aa6"/><ellipse class="paint" cx="34" cy="-87" rx="11" ry="18" transform="rotate(16 34 -87)" fill="#f29aa6"/>
    <ellipse class="paint" cx="0" cy="-48" rx="52" ry="46" fill="${fur}"/>
    <path d="M-28-74Q-18-81-8-74M8-74Q18-81 28-74" fill="none" stroke="#997355" stroke-width="3.5"/>
    <ellipse class="paint" cx="-18" cy="-54" rx="14" ry="16" fill="#fff"/><ellipse class="paint" cx="18" cy="-54" rx="14" ry="16" fill="#fff"/>
    <ellipse cx="-17" cy="-54" rx="9.5" ry="11" fill="#5cc460" stroke="none"/><ellipse cx="17" cy="-54" rx="9.5" ry="11" fill="#5cc460" stroke="none"/>
    <ellipse cx="-17" cy="-54" rx="5.5" ry="6.5" fill="#1f2b27" stroke="none"/><ellipse cx="17" cy="-54" rx="5.5" ry="6.5" fill="#1f2b27" stroke="none"/>
    <circle cx="-20" cy="-58" r="3" fill="#fff" stroke="none"/><circle cx="14" cy="-58" r="3" fill="#fff" stroke="none"/>
    <ellipse class="paint" cx="-13" cy="-31" rx="19" ry="13" fill="${cheek}"/><ellipse class="paint" cx="13" cy="-31" rx="19" ry="13" fill="${cheek}"/>
    <ellipse class="paint" cx="0" cy="-38" rx="8.5" ry="6" fill="#f29aa6"/>
    <path d="M0-32v7m0 0q-8 ${sad ? -5 : 7}-14 0m14 0q8 ${sad ? -5 : 7} 14 0M-29-32h-26m26 8-25 6M29-32h26m-26 8 25 6" fill="none"/>
    ${mom ? '<path class="paint" d="M-48-88q-20-16-22 6 3 16 24 3 19 14 24-4-2-19-26-5Z" fill="#e38492"/><circle cx="-46" cy="-83" r="5.5" fill="#b85f6d"/>' : ''}
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

function bunnyEars(wet) {
  if (wet) {
    return '<ellipse class="paint" cx="-53" cy="-88" rx="18" ry="55" transform="rotate(-48 -53 -88)" fill="#9b96b5"/><ellipse class="paint" cx="53" cy="-88" rx="18" ry="55" transform="rotate(48 53 -88)" fill="#9b96b5"/>';
  }
  return '<ellipse class="paint" cx="-25" cy="-116" rx="19" ry="61" transform="rotate(-8 -25 -116)" fill="#c9c2d9"/><ellipse class="paint" cx="25" cy="-116" rx="19" ry="61" transform="rotate(8 25 -116)" fill="#c9c2d9"/><ellipse class="paint" cx="-25" cy="-117" rx="8" ry="40" transform="rotate(-8 -25 -117)" fill="#e8b4b8"/><ellipse class="paint" cx="25" cy="-117" rx="8" ry="40" transform="rotate(8 25 -117)" fill="#e8b4b8"/>';
}

function bunny(x, y, { wet = false, reaching = false } = {}) {
  const fur = wet ? '#9b96b5' : '#c9c2d9';
  const smileCurve = wet ? -4 : 6;
  return `<g transform="translate(${x} ${y})${reaching ? ' rotate(16)' : ''}">${bunnyEars(wet)}<ellipse class="paint" cx="0" cy="35" rx="54" ry="65" fill="${fur}"/><ellipse class="paint" cx="0" cy="38" rx="34" ry="43" fill="#f4ede2"/><circle class="paint" cx="0" cy="-37" r="48" fill="${fur}"/><ellipse class="paint" cx="-35" cy="85" rx="31" ry="19" fill="${fur}"/><ellipse class="paint" cx="35" cy="85" rx="31" ry="19" fill="${fur}"/>
    ${reaching ? '<path class="paint" d="M-35 25q-25 54-8 102l20-4q-10-48 10-83Z" fill="#c9c2d9"/>' : `<ellipse class="paint" cx="-48" cy="40" rx="17" ry="39" transform="rotate(18 -48 40)" fill="${fur}"/><ellipse class="paint" cx="48" cy="40" rx="17" ry="39" transform="rotate(-18 48 40)" fill="${fur}"/>`}
    <path d="M-28-64Q-18-71-8-64M8-64Q18-71 28-64" fill="none" stroke="#7d7494" stroke-width="3.5"/>
    <ellipse class="paint" cx="-18" cy="-44" rx="13" ry="15" fill="#fff"/><ellipse class="paint" cx="18" cy="-44" rx="13" ry="15" fill="#fff"/>
    <ellipse cx="-17" cy="-44" rx="8.5" ry="10" fill="#4b93b8" stroke="none"/><ellipse cx="17" cy="-44" rx="8.5" ry="10" fill="#4b93b8" stroke="none"/>
    <ellipse cx="-17" cy="-44" rx="5" ry="6" fill="#233330" stroke="none"/><ellipse cx="17" cy="-44" rx="5" ry="6" fill="#233330" stroke="none"/>
    <circle cx="-20" cy="-48" r="2.8" fill="#fff" stroke="none"/><circle cx="14" cy="-48" r="2.8" fill="#fff" stroke="none"/>
    <ellipse class="paint" cx="-12" cy="-21" rx="17" ry="12" fill="#f4ede2"/><ellipse class="paint" cx="12" cy="-21" rx="17" ry="12" fill="#f4ede2"/>
    <ellipse class="paint" cx="0" cy="-28" rx="8" ry="5.5" fill="#e4868e"/><path d="M0-22v6m0 0q-7 ${smileCurve}-13 0m13 0q7 ${smileCurve} 13 0M-8 30l16 19m-16 0L8 30" fill="none" stroke="#7b7590" stroke-dasharray="3 4"/>
    ${wet ? '<path d="M-43-62q-8 13 0 17 8-4 0-17ZM36 6q-8 13 0 17 8-4 0-17ZM-19 54q-8 13 0 17 8-4 0-17Z" class="paint" fill="#8bb8c7"/>' : ''}
  </g>`;
}

function owner() {
  return `<g transform="translate(92 245) scale(.82)">
    <circle class="paint" cx="-28" cy="-76" r="14" fill="#c4954a"/><circle class="paint" cx="28" cy="-76" r="14" fill="#c4954a"/>
    <circle class="paint" cx="0" cy="-80" r="34" fill="#f6ccb0"/>
    <path class="paint" d="M-34-84q0-42 36-38 33 4 32 39-16-4-30-21-19 18-38 20Z" fill="#c4954a"/>
    <ellipse class="paint" cx="20" cy="-106" rx="9" ry="5" transform="rotate(-20 20 -106)" fill="#e3788b"/>
    <path class="paint" d="M-26-38h52l24 102h-100Z" fill="#e88964"/>
    <ellipse class="paint" cx="0" cy="-38" rx="18" ry="6" fill="#fff"/>
    <path d="M-24-26-50 22M24-26 52 14M-18 64-22 128M18 64 22 128" fill="none" stroke="#f6ccb0" stroke-width="11"/>
    <ellipse class="paint" cx="-25" cy="130" rx="12" ry="7" fill="#6d5044"/><ellipse class="paint" cx="25" cy="130" rx="12" ry="7" fill="#6d5044"/>
    <circle cx="-11" cy="-80" r="3.5" fill="#2c3c39" stroke="none"/><circle cx="11" cy="-80" r="3.5" fill="#2c3c39" stroke="none"/>
    <path d="M-7-68Q0-62 7-68" fill="none" stroke="#52454a" stroke-width="2.5"/>
    <path d="M55-5h34M79-15l14 10-14 10" fill="none" stroke="#728f84" stroke-dasharray="5 6"/>
  </g>`;
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
    <path d="M45 70C125 70 120 145 80 135 55 129 73 105 94 116" fill="none" stroke="#9d968e" stroke-width="20"/>
    <path d="M-25 105-33 170M25 105 33 170" fill="none" stroke="#9d968e" stroke-width="25"/>
    <ellipse class="paint" cx="-41" cy="180" rx="31" ry="16" fill="#fff"/><ellipse class="paint" cx="41" cy="180" rx="31" ry="16" fill="#fff"/>
    <ellipse class="paint" cx="-41" cy="177" rx="18" ry="6" fill="#63b273"/><ellipse class="paint" cx="41" cy="177" rx="18" ry="6" fill="#63b273"/>
    <path d="M-45 20Q${leftX} ${leftY - 15} ${leftX} ${leftY}M45 20Q${rightX} ${rightY - 15} ${rightX} ${rightY}" fill="none" stroke="#9d968e" stroke-width="25"/>
    <circle class="paint" cx="${leftX}" cy="${leftY}" r="16" fill="#9d968e"/><circle class="paint" cx="${rightX}" cy="${rightY}" r="16" fill="#9d968e"/>
    <ellipse class="paint" cx="-48" cy="22" rx="18" ry="20" fill="#e1544d"/><ellipse class="paint" cx="48" cy="22" rx="18" ry="20" fill="#e1544d"/>
    <ellipse class="paint" cx="0" cy="88" rx="54" ry="38" fill="#5d7ca0"/>
    <ellipse class="paint" cx="0" cy="48" rx="58" ry="58" fill="#e1544d"/>
    <path d="M-28-4Q0 14 28-4" fill="none" stroke="#f7f2ea" stroke-width="8"/>
    <circle class="paint" cx="0" cy="48" r="21" fill="#f7f2ea"/><circle class="paint" cx="0" cy="48" r="15" fill="#e1544d"/><path d="M-6 46Q0 54 6 46" fill="none" stroke="#f7f2ea" stroke-width="3.5"/>
    <ellipse class="paint" cx="-52" cy="-126" rx="28" ry="42" transform="rotate(-16 -52 -126)" fill="#9d968e"/><ellipse class="paint" cx="52" cy="-126" rx="28" ry="42" transform="rotate(16 52 -126)" fill="#9d968e"/>
    <ellipse class="paint" cx="-52" cy="-124" rx="16" ry="26" transform="rotate(-16 -52 -124)" fill="#f29aa6"/><ellipse class="paint" cx="52" cy="-124" rx="16" ry="26" transform="rotate(16 52 -124)" fill="#f29aa6"/>
    <ellipse class="paint" cx="-7" cy="-136" rx="10" ry="14" fill="#9d968e"/><ellipse class="paint" cx="7" cy="-134" rx="8" ry="12" fill="#9d968e"/>
    <ellipse class="paint" cx="0" cy="-67" rx="82" ry="72" fill="#9d968e"/>
    <path d="M-44-106Q-29-115-14-106M14-106Q29-115 44-106" fill="none" stroke="#746f69" stroke-width="5"/>
    <ellipse class="paint" cx="-28" cy="-75" rx="23" ry="26" fill="#fff"/><ellipse class="paint" cx="28" cy="-75" rx="23" ry="26" fill="#fff"/>
    <ellipse cx="-26" cy="-75" rx="15" ry="18" fill="#49bd4c" stroke="none"/><ellipse cx="26" cy="-75" rx="15" ry="18" fill="#49bd4c" stroke="none"/>
    <ellipse cx="-26" cy="-75" rx="9" ry="11" fill="#1b2421" stroke="none"/><ellipse cx="26" cy="-75" rx="9" ry="11" fill="#1b2421" stroke="none"/>
    <circle cx="-31" cy="-82" r="4.5" fill="#fff" stroke="none"/><circle cx="21" cy="-82" r="4.5" fill="#fff" stroke="none"/>
    <circle cx="-22" cy="-69" r="2.2" fill="#fff" stroke="none"/><circle cx="30" cy="-69" r="2.2" fill="#fff" stroke="none"/>
    <ellipse class="paint" cx="-19" cy="-40" rx="29" ry="20" fill="#f7f2ea"/><ellipse class="paint" cx="19" cy="-40" rx="29" ry="20" fill="#f7f2ea"/><ellipse class="paint" cx="0" cy="-28" rx="24" ry="14" fill="#f7f2ea"/>
    <ellipse class="paint" cx="0" cy="-50" rx="13" ry="9" fill="#f08596"/>
    <path d="M0-41v12m0 0q-12 10-23 2m23-2q12 10 23 2M-46-40-88-45M-46-31-87-24M46-40 88-45M46-31 87-24" fill="none"/>
  </g>`;
}

function tomScene(line) {
  const room = `<rect class="paint" width="640" height="460" rx="24" fill="#f1ece3"/><path class="paint" d="M0 340h640v120H0z" fill="#e3d6c3"/><ellipse class="paint" cx="320" cy="405" rx="200" ry="37" fill="#a8cfc9"/><path class="paint" d="M68 312h150v38H68z" fill="#b9cfd9"/><ellipse class="paint" cx="132" cy="310" rx="64" ry="21" fill="#f7dfb4"/><g><path class="paint" d="M520 182h70v35h-70z" fill="#f7f5f0"/><path d="M555 217v105M530 185q25-55 50 0" fill="none" stroke="#8fb0b6" stroke-width="9"/></g>`;
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
