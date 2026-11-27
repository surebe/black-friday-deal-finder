// filters.js — search + filter + sort state for the deal grid. Pure logic:
// given the deals and the current control state, return the deals to show.

import { discountPct, dollarsSaved, dealScore } from './scoring.js';

export const SORTS = {
  best: { label: 'Best first', by: (a, b) => dealScore(b) - dealScore(a) },
  pct: { label: 'Biggest % off', by: (a, b) => discountPct(b) - discountPct(a) },
  saved: { label: 'Most $ saved', by: (a, b) => dollarsSaved(b) - dollarsSaved(a) },
  cheap: { label: 'Lowest price', by: (a, b) => a.price - b.price },
};

export function emptyState() {
  return { query: '', category: 'all', store: 'all', minPct: 0, sort: 'best' };
}

export function applyFilters(deals, state) {
  const q = state.query.trim().toLowerCase();
  const shown = deals.filter((deal) => {
    if (state.category !== 'all' && deal.cat !== state.category) return false;
    if (state.store !== 'all' && deal.store !== state.store) return false;
    if (discountPct(deal) < state.minPct) return false;
    if (q && !(`${deal.name} ${deal.cat}`.toLowerCase().includes(q))) return false;
    return true;
  });
  return shown.sort(SORTS[state.sort].by);
}

export function sameProduct(deals, deal) {
  return deals.filter((other) => other.id !== deal.id && other.name === deal.name);
}
