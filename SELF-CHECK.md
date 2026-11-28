# SELF-CHECK — TrueTag improvement pass, 28 Nov 2026

Graded against the judge's five criteria as printed in the kit RULES.txt, in
the judge's own order. Standing version graded R2 at 1,553 of 5,014
(score 433,173). This pass changed presentation and screenshot composition
only: all 34 deals, prices, links, check times, sources and verdicts are
byte-identical to the standing entry (app/data.js untouched), and search,
filters, sorts and detail pages were re-verified working (headless Chrome:
0 page errors; "Switch" search → 3 deals; Audio + 40%+ filter → 6 deals;
AirPods detail shows the Target cross-store comparison).

## 1. Working deal finder shown in screenshots — WAS lemah, NOW kuat
- Standing cover: the giant hero filled the whole 1280×800 frame; exactly
  one deal card was visible, cut in half. The judge's first criterion asks
  for many deals visible, and the cover is the large image on the sheet.
- Now: compact two-line hero, slim spotlight banner, denser cards. The
  cover shows the brand bar, the stats strip (34 / 9 all-time lows /
  $1,200), one complete spotlight deal, the full search + filter controls,
  "Showing 34 of 34 checked deals", and a complete first row of 4 deal
  cards (product, store, sale price, usual price, saving, verdict chip).
- Shot 2 frames the controls with the Audio chip active and "40% off or
  more" selected over 6 resulting cards — filters visibly working.
- Shot 3 (unchanged view, re-rendered): full deal detail with verdict
  evidence, check time, source and the cross-store comparison.
- Shot 4: the phone frame previously showed only the hero; it now shows
  the controls and a complete deal card at phone size.

## 2. Real, checked deals — kuat (unchanged), one honest caveat
- Every card names product, store, both prices, a computed discount (the
  arithmetic is done in scoring.js from the two prices, so the numbers
  always add up), check time and the source the price was read in.
- Verdicts stay honest: 9 ALL-TIME LOW, 22 STRONG DEAL, 3 FAIR PRICE
  listed on purpose.
- Caveat: prices were checked Fri Nov 27, 2026, 18:15 UTC and were NOT
  re-read in this session; Black Friday prices move. The site says so
  itself ("if a store page disagrees with a card, the store page wins").
  This is the entry's known residual risk under the finalist review, and
  it is identical in the standing version.

## 3. Usefulness to a shopper — kuat
- Default order is "Best first" by the shopper score in scoring.js
  (verdict, % off, $ saved), the spotlight leads with the top deal, the
  one cross-store product (AirPods Pro 3, Amazon $149 vs Target $149.99)
  is compared on its detail page, and every card and detail links to the
  product at its store. Deal notes carry the sale windows.
- Minor gap: no promo codes — none were part of the verified deal data,
  and inventing one would break criterion 2.

## 4. Ease of use and look — sedang → membaik
- Original identity kept (TrueTag, ink black / cream / coral, three-colour
  verdict system); hierarchy is now brand → stats → top deal → controls →
  grid, and the phone layout shows the finder itself, not just a headline.
- Trade-off, stated plainly: the cover is framed with a small scroll, so
  the big slogan line sits above the frame; the brand bar, tagline note
  and stats carry the identity in the cover instead.

## 5. Speed and structure — kuat
- First load: 7 files, 12,827 bytes gzip-9 (standing: 12,776; +51 bytes
  for the denser layout). No framework, no webfonts, no images; source
  stays split one job per file (data / scoring / filters / render / main /
  style), which is what the outline shows.

## Verdict
This version beats the standing one on the decisive first criterion
(what the screenshots show) and on criterion 4, and ties it on 2, 3 and 5.
The improvement is real but presentational: it cannot fix the one thing
both versions share — prices checked on Nov 27 in a sale that runs to
Dec 2. main.ts output verified deterministic: two runs produced
byte-identical dossier.json (sha256 af224ed7…) and identical app/ and
screenshots/ trees; dossier 452,967 bytes, under the 1.5 MiB cap; all four
screenshots within the 256 KiB / 1280px / ≥360px specs.
