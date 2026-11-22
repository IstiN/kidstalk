const svg = (content, className = '') => `
  <svg class="${className}" viewBox="0 0 72 72" fill="none" aria-hidden="true" focusable="false">
    <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${content}</g>
  </svg>`;

const bunny = (wet = false) => `
  <ellipse cx="25" cy="19" rx="7" ry="14" fill="#d9d2e5" transform="rotate(-10 25 19)"/>
  <ellipse cx="47" cy="19" rx="7" ry="14" fill="#d9d2e5" transform="rotate(10 47 19)"/>
  <ellipse cx="25" cy="19" rx="3" ry="9" fill="#efb9b7" stroke="none" transform="rotate(-10 25 19)"/>
  <ellipse cx="47" cy="19" rx="3" ry="9" fill="#efb9b7" stroke="none" transform="rotate(10 47 19)"/>
  <circle cx="36" cy="42" r="20" fill="#e8e3ee"/>
  <circle cx="29" cy="40" r="2.2" fill="#40514f" stroke="none"/>
  <circle cx="43" cy="40" r="2.2" fill="#40514f" stroke="none"/>
  <path d="M33 47h6l-3 3z" fill="#e99491"/>
  <path d="M36 50v3m0 0c-2 2-4 2-6 0m6 0c2 2 4 2 6 0"/>
  ${wet ? '<path d="M14 31c0 4-5 4-5 0 0-2 5-7 5-7s5 5 5 7Zm44 18c0 4-5 4-5 0 0-2 5-7 5-7s5 5 5 7Z" fill="#9cc9d8" stroke="#5d96aa"/>' : ''}`;

export function wordIcon(icon) {
  const icons = {
    bunny: () => svg(bunny()),
    leave: () => svg(`
      <path d="M45 16c5 1 9 4 12 8l4 7-8 5-5-8-8 4-5-5 9-6-6-2 7-3Z" fill="#f2c7ad"/>
      <path d="M53 36 45 47m8-11-8 11" />
      <circle cx="24" cy="42" r="9" fill="#dc7868"/>
      <path d="m12 26 8 5m-11 3 8 2M9 54l5 5m0-5-5 5" stroke="#cf7669"/>`),
    owner: () => svg(`
      <circle cx="36" cy="18" r="10" fill="#f2c7ad"/>
      <path d="M26 18c0-13 20-13 20 0-3-2-5-5-6-8-3 4-7 6-14 8Z" fill="#d9b45f"/>
      <path d="M27 31h18l6 23H21l6-23Z" fill="#e99b68"/>
      <path d="m26 34-9 13m29-13 9 13M28 54l-2 10m18-10 2 10"/>
      <path d="M22 64h8m12 0h8"/>
      <circle cx="32" cy="18" r="1" fill="#40514f" stroke="none"/><circle cx="40" cy="18" r="1" fill="#40514f" stroke="none"/>`),
    under: () => svg(`
      <path d="M12 20h48v13H12z" fill="#bdc6c8"/>
      <circle cx="36" cy="48" r="13" fill="#df7c70"/>
      <path d="m30 38 6 5 6-5" stroke="#fff"/>`),
    rain: () => svg(`
      <path d="M20 38a10 10 0 0 1-2-20 15 15 0 0 1 28-3 12 12 0 0 1 8 23H20Z" fill="#a9c8d6"/>
      <path d="m22 47-3 7m16-7-3 7m16-7-3 7m-16 5-3 5m16-5-3 5" stroke="#659eb5" stroke-width="4"/>`),
    stay: () => svg(`
      <path d="M19 46h35v9H19zM23 55v9m27-9v9M22 39h31" fill="#d6a260"/>
      <circle cx="36" cy="24" r="11" fill="#e8e3ee"/>
      <ellipse cx="30" cy="11" rx="4" ry="9" fill="#d9d2e5"/><ellipse cx="42" cy="11" rx="4" ry="9" fill="#d9d2e5"/>
      <path d="m13 24 5 5 5-5" stroke="#d47f68"/>`),
    so: () => svg('<text x="36" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#5b7772" stroke="none">со</text>'),
    bench: () => svg(`
      <path d="M12 34h48v10H12zM15 48h42v8H15z" fill="#dca65f"/>
      <path d="M18 24v36m36-36v36M20 56l-4 10m36-10 4 10M12 28h48"/>
      <path d="M22 39h28" stroke="#b47d44"/>`),
    down: () => svg(`
      <path d="M10 19h32v8H10zM14 27v10m24-10v10" fill="#dca65f"/>
      <path d="M50 18v35m-9-9 9 10 9-10" stroke="#5e9287" stroke-width="4"/>
      <circle cx="25" cy="45" r="9" fill="#e8e3ee"/>`),
    cannot: () => svg(`
      <path d="M24 12v35m-9-9 9 10 9-10" stroke="#789b92" stroke-width="4"/>
      <path d="M45 31h16v8H45zM47 39v9m12-9v9" fill="#dca65f"/>
      <circle cx="37" cy="36" r="27" stroke="#d8776c" stroke-width="3.5"/>
      <path d="m18 17 38 38" stroke="#d8776c" stroke-width="4"/>`),
    whole: () => svg(`
      <circle cx="36" cy="36" r="19" fill="#d9e6df"/>
      <path d="M14 26a25 25 0 0 1 39-7l4 5m0 0 1-10m-1 10-10-1M58 47a25 25 0 0 1-39 7l-4-5m0 0-1 10m1-10 10 1" stroke="#679489"/>`),
    do: () => svg('<text x="36" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#5b7772" stroke="none">до</text>'),
    threads: () => svg(`
      <path d="M17 14c22 0-5 21 15 21s-6 23 20 23M42 10c-14 11 13 16 3 28S35 61 22 56" stroke="#8d83ac" stroke-width="3"/>
      <circle cx="17" cy="14" r="3" fill="#c0b6d7"/><circle cx="52" cy="58" r="3" fill="#c0b6d7"/>`),
    cloud: () => svg(`
      <path d="M18 50a12 12 0 0 1-2-24 17 17 0 0 1 32-5 14 14 0 0 1 6 29H18Z" fill="#b8ccd4"/>
      <path d="M24 56h25" stroke="#799da9"/>`),
    roll: () => svg(`
      <circle cx="43" cy="40" r="16" fill="#de7c70"/>
      <path d="M31 29c8 4 15 12 18 22M31 51c8-8 16-12 25-13" stroke="#fff"/>
      <path d="M9 27h18m-8-7 8 7-8 7M6 45h17m-7-6 7 6-7 6" stroke="#65978d" stroke-width="3.5"/>`),
    underChair: () => svg(`
      <path d="M14 18h44v12H14zM18 30v30m36-30v30M12 60h12m24 0h12" fill="#dca65f"/>
      <path d="M18 12v24m36-24v24" stroke="#a97543" stroke-width="4"/>
      <circle cx="36" cy="49" r="10" fill="#de7c70"/>
      <path d="M36 34v8m-4-4 4 4 4-4" stroke="#679489"/>`),
    catPaw: () => svg(`
      <ellipse cx="36" cy="45" rx="15" ry="13" fill="#e9a69c"/>
      <ellipse cx="18" cy="28" rx="6" ry="8" fill="#f2c0b5" transform="rotate(-20 18 28)"/>
      <ellipse cx="31" cy="20" rx="6" ry="8" fill="#f2c0b5"/>
      <ellipse cx="46" cy="20" rx="6" ry="8" fill="#f2c0b5"/>
      <ellipse cx="57" cy="30" rx="6" ry="8" fill="#f2c0b5" transform="rotate(20 57 30)"/>
      <path d="M27 47c5-5 13-5 18 0" stroke="#c9827a"/>`),
    window: () => svg(`
      <path d="M12 10h48v52H12z" fill="#c7e0e5"/>
      <circle cx="43" cy="27" r="9" fill="#f1ca70"/>
      <path d="M36 10v52M12 37h48" stroke="#809c96" stroke-width="4"/>
      <path d="m15 57 13-13 9 8 9-10 14 15" fill="#a9c7a2"/>`),
    wet: () => svg(bunny(true)),
  };

  return (icons[icon] || icons.bunny)();
}

export const uiIcons = {
  print: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 11h10" stroke="currentColor" stroke-width="1.8"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6V6Z" fill="currentColor"/></svg>',
  stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10v4h3l4 4V6l-4 4H5Z" fill="currentColor"/><path d="M15 9c1.4 1.6 1.4 4.4 0 6m3-9c3.2 3.4 3.2 8.6 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10v4h3l4 4V6l-4 4H5Z" fill="currentColor"/><path d="m16 10 5 5m0-5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  rain: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 14a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 7a3.5 3.5 0 0 1 .5 7H7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m8 17-1 2m5-2-1 2m5-2-1 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M5 17h14M9 4v6m6 4v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="7" r="2" fill="currentColor"/><circle cx="15" cy="17" r="2" fill="currentColor"/></svg>',
  backspace: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5h11v14H9l-6-7 6-7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m12 9 5 6m0-6-5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M9 7V4h6v3m2 0-1 13H8L7 7m4 4v5m3-5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v12H9l-5 4V5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 9h8m-8 4h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  hand: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 12V6a1.5 1.5 0 0 1 3 0v4-6a1.5 1.5 0 0 1 3 0v6-4a1.5 1.5 0 0 1 3 0v5-2a1.5 1.5 0 0 1 3 0v5c0 4-2 7-6 7h-1c-3 0-5-2-6-4l-3-5a1.6 1.6 0 0 1 2.5-2L8 12Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
