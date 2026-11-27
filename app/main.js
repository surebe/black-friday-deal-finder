// main.js — wires the controls to the grid and routes between the home view
// and a deal's detail view by the URL hash (#/ and #/deal/<id>).

import { DEALS, CATEGORIES } from './data.js';
import { emptyState, applyFilters, sameProduct } from './filters.js';
import { dealGrid, dealDetail, dealCard } from './render.js';
import { dealScore, dollarsSaved } from './scoring.js';

const state = emptyState();
const gridEl = document.getElementById('grid');
const lineEl = document.getElementById('result-line');
const homeEl = document.getElementById('home-view');
const detailEl = document.getElementById('detail-view');

function renderGrid() {
  const shown = applyFilters(DEALS, state);
  gridEl.innerHTML = dealGrid(shown);
  lineEl.textContent = `Showing ${shown.length} of ${DEALS.length} checked deals`;
}

function renderChips() {
  const chips = document.getElementById('category-chips');
  const options = [['all', 'All categories'], ...Object.entries(CATEGORIES)];
  chips.innerHTML = options
    .map(([key, label]) => `<button type="button" class="chip${state.category === key ? ' on' : ''}" data-cat="${key}">${label}</button>`)
    .join('');
  chips.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.category = chip.dataset.cat;
      renderChips();
      renderGrid();
    });
  });
}

function renderSpotlight() {
  const top = [...DEALS].sort((a, b) => dealScore(b) - dealScore(a))[0];
  document.getElementById('spotlight').innerHTML =
    `<p class="spot-label">★ Top deal right now — biggest verified saving story</p>${dealCard(top)}`;
  const lows = DEALS.filter((d) => d.verdict === 'low').length;
  const biggest = Math.max(...DEALS.map(dollarsSaved));
  document.getElementById('stat-deals').textContent = String(DEALS.length);
  document.getElementById('stat-low').textContent = String(lows);
  document.getElementById('stat-save').textContent = `$${biggest.toLocaleString('en-US')}`;
  document.getElementById('hero-count').textContent = `${DEALS.length} deals`;
}

function bindControls() {
  document.getElementById('search').addEventListener('input', (event) => {
    state.query = event.target.value;
    renderGrid();
  });
  document.getElementById('store-filter').addEventListener('change', (event) => {
    state.store = event.target.value;
    renderGrid();
  });
  document.getElementById('discount-filter').addEventListener('change', (event) => {
    state.minPct = Number(event.target.value);
    renderGrid();
  });
  document.getElementById('sort-select').addEventListener('change', (event) => {
    state.sort = event.target.value;
    renderGrid();
  });
}

function route() {
  const match = location.hash.match(/^#\/deal\/(.+)$/);
  const deal = match ? DEALS.find((d) => d.id === match[1]) : null;
  if (deal) {
    detailEl.innerHTML = dealDetail(deal, sameProduct(DEALS, deal));
    detailEl.hidden = false;
    homeEl.hidden = true;
    window.scrollTo(0, 0);
  } else {
    detailEl.hidden = true;
    homeEl.hidden = false;
  }
}

renderChips();
renderSpotlight();
bindControls();
renderGrid();
window.addEventListener('hashchange', route);
route();
