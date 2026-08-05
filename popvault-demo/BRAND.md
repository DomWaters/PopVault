# PopVault Brand & Styling Guide

This covers the guidance that isn't captured by Tailwind tokens. For the
tokens themselves (colors, fonts, radii), see `tailwind.config.js` — that
file is the source of truth; don't duplicate values here.

## Voice & tone

This is a pitch demo shown to insurance carriers, not a consumer app. Copy
should read as confident and modern, closer to a fintech product than a
traditional insurance portal. Avoid jokey copy, avoid jargon carriers
wouldn't recognize, and keep microcopy short — screens are phone-sized.

## Color usage

Palette lives under the `vault` namespace in `tailwind.config.js`
(`vault-ink`, `vault-card`, `vault-panel`, `vault-line`, `vault-mute`,
`vault-text`, `vault-purple`, `vault-purpledark`, `vault-mint`,
`vault-coral`, `vault-amber`, `vault-danger`). Don't introduce colors
outside this palette — if a screen needs a new shade, add it to the
`vault` extension first.

Suggested roles:
- `purple` / `purpledark` — primary actions, active/selected states
- `mint` — success, positive pricing movement, confirmations
- `coral` — highlights, callouts, secondary emphasis
- `amber` — warnings, attention-needed states
- `danger` — errors, destructive actions
- `ink` / `card` / `panel` / `line` — background layering (darkest to
  lightest), matches the dark, phone-frame aesthetic
- `mute` / `text` — secondary vs. primary text

## Layout conventions

The whole app renders inside a fixed phone frame (`.phone-shell` /
`.phone-screen` / `.phone-notch` in `src/index.css`) — screens should be
designed for that fixed viewport, not for arbitrary browser widths.
Transitions between screens use the `.screen-enter` fade/slide; reuse it
rather than inventing a new transition per screen.

**Primary button placement**: the `solid` `PrimaryButton` (and its
`outline` companion when paired, e.g. a secondary "skip"/"back" action)
always sits pinned to the bottom of the screen, with consistent space
above it separating it from the scrollable content — never inline with
content or floating mid-screen. Implemented as: the screen wrapper stays
`flex flex-col h-full`, content lives in a `flex-1` child, and the button
(or the wrapping `<div>` when there are two stacked buttons, e.g.
`Welcome`/`ImportMethod`) always carries `mt-6` — `PrimaryButton` accepts
a `className` prop for exactly this. Don't recreate the gap with `pb-*`
on the content div above it; that double-stacks with the button's own
`mt-6`.

## Logo / wordmark

No logo asset exists yet. Placeholder — fill in once assets land:

- **Files**: where the source/exported logo files live (e.g.
  `src/assets/logo.svg`) and which formats are provided (SVG, PNG, favicon)
- **Variants**: full logo vs. mark-only, light vs. dark-background versions
- **Minimum size**: smallest size the logo should render at before
  legibility breaks down
- **Clear space**: minimum padding to keep around the logo relative to
  other elements
- **Placement**: where it appears in the app (e.g. `ScreenHeader`, splash/
  `Welcome` screen) and how
- **Don't**: recolor, stretch, rotate, or add effects (shadows, outlines)
  to the mark

## Do / don't

- Do reuse `PrimaryButton` and `ScreenHeader` from `src/components/` rather
  than hand-rolling buttons or headers per screen.
- Do keep new colors inside the `vault` palette.
- Don't add styling that assumes a browser chrome or scrollbars — this is
  a phone-frame demo, scrollbars are hidden by design (`.screen-scroll`).
