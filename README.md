# TrueTag — Black Friday deals, checked by hand

![make.fun bounty](https://make.fun/badge/black-friday-deal-finder-01.svg)
![rank](https://make.fun/badge/black-friday-deal-finder-01/surebe/black-friday-deal-finder/rank.svg)
![reward](https://make.fun/badge/black-friday-deal-finder-01/surebe/black-friday-deal-finder/reward.svg)

An entry for the make.fun bounty [Build the best real Black Friday deal finder](https://make.fun/bounty/black-friday-deal-finder-01).

TrueTag is a static deal finder holding **34 real Black Friday 2026 deals** that were found and price-checked on Friday Nov 27, 2026 at Amazon, Best Buy, Walmart and Target (or in a deals source that names the store). Every deal shows its product, store, store link, sale price, usual price, discount, the time its price was checked, where the price was read, and an honest verdict — **ALL-TIME LOW**, **STRONG DEAL** or **FAIR PRICE** — with the evidence behind it. Search and filters by category, store and discount all work; deals open in a detail view, and a product listed at two stores (like the AirPods Pro 3) is compared side by side.

## Layout

- `main.ts` — the hand-in program: copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored library.
- `app/` — the site itself, plain static files with no build step:
  - `index.html` — the page shell: hero, search and filter controls, grid, detail container.
  - `data.js` — the 34 checked deals, with stores and categories.
  - `scoring.js` — discount, savings and shopper-score arithmetic.
  - `filters.js` — search / filter / sort logic.
  - `render.js` — deal cards, the grid, and the detail view with cross-store comparison.
  - `main.js` — control wiring and hash routing (`#/` and `#/deal/<id>`).
  - `style.css` — the whole look: warm ink, cream cards, coral badges, verdict colours.
- `screenshots/` — four renders of the running site (home, a filtered view, a deal detail, a phone view); `shots.json` says which views they are.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.
- `serve.ts` — a tiny local server for previewing the site.

## Run it

```
node serve.ts            # then open http://localhost:8080
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # build the hand-in output
```

## License

MIT — see `LICENSE`.
