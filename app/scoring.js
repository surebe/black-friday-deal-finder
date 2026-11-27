// scoring.js — the arithmetic of a deal: discount, dollars saved, and the
// shopper score that decides the default "Best first" order. The score blends
// the verdict signal, the percentage off and the dollars saved, so a verified
// all-time low on a big-ticket item outranks a routine 60% off a $20 gadget.

export function discountPct(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

export function dollarsSaved(deal) {
  return deal.was - deal.price;
}

export function money(amount) {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

const VERDICT_POINTS = { low: 50, strong: 34, fair: 14 };

export function dealScore(deal) {
  const pct = discountPct(deal);
  const saved = dollarsSaved(deal);
  const verdictPoints = VERDICT_POINTS[deal.verdict] ?? 0;
  const savingPoints = Math.min(24, Math.round(Math.log2(1 + saved) * 3));
  return verdictPoints + pct / 2 + savingPoints;
}

export const VERDICT_LABEL = {
  low: 'ALL-TIME LOW',
  strong: 'STRONG DEAL',
  fair: 'FAIR PRICE',
};
