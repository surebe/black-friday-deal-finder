// render.js — turns deals into HTML: the card grid, the category art, and the
// deal detail view with its cross-store comparison. Product art is drawn with
// inline SVG per category (no image files, nothing loaded from anywhere).

import { STORES, CATEGORIES, CHECKED } from './data.js';
import { discountPct, dollarsSaved, money, VERDICT_LABEL } from './scoring.js';

const ART = {
  audio: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 40v-6a18 18 0 0 1 36 0v6" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><rect x="8" y="38" width="12" height="18" rx="5"/><rect x="44" y="38" width="12" height="18" rx="5"/></svg>',
  tv: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="6" y="12" width="52" height="34" rx="3" fill="none" stroke="currentColor" stroke-width="5"/><path d="M24 56h16" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  computing: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="14" width="44" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="5"/><path d="M4 52h56" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  gaming: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 22h28a12 12 0 0 1 11 17l-2 5a6 6 0 0 1-10 2l-4-4H23l-4 4a6 6 0 0 1-10-2l-2-5a12 12 0 0 1 11-17Z" fill="none" stroke="currentColor" stroke-width="4"/><path d="M20 30v8M16 34h8" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="44" cy="31" r="2.6"/><circle cx="49" cy="37" r="2.6"/></svg>',
  home: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 30 32 12l22 18" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M16 28v24h32V28" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><rect x="27" y="38" width="10" height="14"/></svg>',
};

export function categoryArt(cat) {
  return ART[cat] ?? ART.home;
}

export function dealCard(deal) {
  const pct = discountPct(deal);
  return `<article class="card" data-id="${deal.id}">
    <a class="card-art art-${deal.cat}" href="#/deal/${deal.id}">${categoryArt(deal.cat)}<span class="pct">−${pct}%</span></a>
    <div class="card-body">
      <p class="card-meta"><span class="store">${STORES[deal.store].name}</span><span class="cat">${CATEGORIES[deal.cat]}</span></p>
      <h3 class="card-name"><a href="#/deal/${deal.id}">${deal.name}</a></h3>
      <p class="price"><span class="now">$${money(deal.price)}</span> <span class="was">$${money(deal.was)}</span> <span class="save">save $${money(dollarsSaved(deal))}</span></p>
      <p class="verdict v-${deal.verdict}">${VERDICT_LABEL[deal.verdict]}</p>
      <p class="checked">Checked ${CHECKED} · ${deal.source}</p>
      <p class="card-actions"><a class="go" href="${deal.url}" target="_blank" rel="noopener">View at ${STORES[deal.store].name} →</a></p>
    </div>
  </article>`;
}

export function dealGrid(deals) {
  if (!deals.length) return '<p class="empty">No deals match that search — loosen a filter and the bargains come back.</p>';
  return `<div class="grid">${deals.map(dealCard).join('')}</div>`;
}

export function dealDetail(deal, twins) {
  const pct = discountPct(deal);
  const twinRows = twins.length
    ? `<section class="compare"><h2>Same product, other stores</h2>${twins.map((t) => `
      <p class="twin"><span>${STORES[t.store].name}</span> <strong>$${money(t.price)}</strong> <span class="was">$${money(t.was)}</span> <span class="pct-inline">−${discountPct(t)}%</span>
      <a href="#/deal/${t.id}">see this listing</a> · <a href="${t.url}" target="_blank" rel="noopener">open at ${STORES[t.store].name} →</a></p>`).join('')}</section>`
    : '';
  return `<article class="detail">
    <p class="back"><a href="#/">← All deals</a></p>
    <div class="detail-head">
      <div class="card-art art-${deal.cat}">${categoryArt(deal.cat)}<span class="pct">−${pct}%</span></div>
      <div>
        <p class="card-meta"><span class="store">${STORES[deal.store].name}</span><span class="cat">${CATEGORIES[deal.cat]}</span></p>
        <h1>${deal.name}</h1>
        <p class="price big"><span class="now">$${money(deal.price)}</span> <span class="was">$${money(deal.was)}</span> <span class="save">you save $${money(dollarsSaved(deal))} (${pct}% off)</span></p>
        <p class="verdict v-${deal.verdict}">${VERDICT_LABEL[deal.verdict]}</p>
      </div>
    </div>
    <section class="why"><h2>Is it really a deal?</h2><p>${deal.why}</p></section>
    <section class="facts">
      <p><strong>Store:</strong> ${STORES[deal.store].name} — <a href="${deal.url}" target="_blank" rel="noopener">open this product at ${STORES[deal.store].name} →</a></p>
      <p><strong>Price checked:</strong> ${CHECKED}</p>
      <p><strong>Where the price was read:</strong> ${deal.source}</p>
      <p><strong>Good to know:</strong> ${deal.note}</p>
    </section>
    ${twinRows}
  </article>`;
}
