# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

This top-level folder is a workspace, not a single project: it contains
`PopVault Insurance Business Plan 2.pdf` (background reading, not code) and
`popvault-demo/`, which is the actual application. All code work happens
inside `popvault-demo/`.

## What this app is

A clickable demo app for pitching PopVault Insurance to carriers. React +
Vite + Tailwind, no backend, no real payments — all data is fake and lives in
`popvault-demo/src/state.jsx`.

## Commands (run from `popvault-demo/`)

```bash
npm install
npm run dev      # start dev server, usually http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

There is no lint or test setup in this project.

## Architecture

- `src/App.jsx` — the phone-frame shell. Holds `SCREEN_MAP`, which maps a
  `screen` key to its component. This is the only place that needs updating
  when a screen is added.
- `src/state.jsx` — single React context (`AppStateProvider` /
  `useAppState`) acting as the app's "fake backend": current screen,
  navigation history, collection data, questionnaire answers, and computed
  pricing. Every screen reads/writes this instead of passing props down.
  `SCREENS` is the ordered list of valid screen keys.
- `src/screens/` — one component per step in the journey (Welcome,
  ImportMethod, SuggestedValue, Questionnaire, QuoteSummary, BindPay,
  PolicyIssued, Dashboard). Most work happens here.
- `src/components/` — small reusable UI pieces (header bar, buttons) shared
  across screens.
- `src/lib/pricing.js` — the toy rating engine (`calculatePricing`). Not
  actuarially meaningful, just reactive enough to make the live price
  readout respond to questionnaire inputs.
- `src/data/collectrSample.js` — fake payload standing in for a real
  "Collectr" import API response, plus a manual-entry fallback.

## Navigation model

Screens don't use URLs/routes. Navigation is driven by `state.screen` plus a
`navigate('screen-key')` function from `useAppState()`:

```jsx
import { useAppState } from '../state.jsx'

function MyScreen() {
  const { navigate } = useAppState()
  return <button onClick={() => navigate('quote-summary')}>Next</button>
}
```

`back()` pops `state.history`. `update(patch)` merges into top-level state;
`updateSlice(key, patch)` merges into a nested slice (e.g.
`updateSlice('questionnaire', { natCatZone: 'high' })`).

## Current status

All 7 screens exist as placeholders so the full journey is clickable
end-to-end. Next planned work: build out each screen for real, starting with
the Questionnaire screen (the live-pricing showcase).
