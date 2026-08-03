# PopVault demo

A clickable demo app for pitching PopVault Insurance to carriers. Built with
React + Vite + Tailwind. No backend, no real payments — all data is fake and
lives in `src/state.jsx`.

## Setup (run this on your own machine)

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## How it's structured

- `src/App.jsx` — the phone-frame shell and screen router. You shouldn't need
  to touch this much once it's working.
- `src/state.jsx` — shared app state (which screen you're on, the fake
  collection data, questionnaire answers, calculated pricing). Think of this
  like a single microflow variable bundle that every page can read and write.
- `src/screens/` — one file per screen. This is where you'll spend most of
  your time. Each screen is a normal React component.
- `src/components/` — small reusable pieces (header bar, buttons) shared
  across screens.
- `src/lib/` — calculation logic (e.g. the pricing engine) will live here.
- `src/data/` — sample/fake data (e.g. the simulated Collectr import).

## Navigation

Screens don't use URLs/routes — there's a simple `screen` value in state and
a `navigate('screen-key')` function to change it. See `SCREENS` in
`state.jsx` for the full list of valid screen keys.

```jsx
import { useAppState } from '../state.jsx'

function MyScreen() {
  const { navigate } = useAppState()
  return <button onClick={() => navigate('quote-summary')}>Next</button>
}
```

## Current status

All 7 screens exist as placeholders so the full journey is clickable
end-to-end. Next: build out each screen for real, starting with the
Questionnaire screen (the live-pricing showcase).
