# deploy

Builds the PopVault app and deploys it to GitHub Pages so it's publicly accessible at a shareable URL.

## One-time setup (first deploy only)

1. Install the GitHub Pages deploy package:

```bash
cd popvault-demo && npm install --save-dev gh-pages
```

2. Add these two scripts to `popvault-demo/package.json` under `"scripts"`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Add a `homepage` field to `popvault-demo/package.json`:

```json
"homepage": "https://DomWaters.github.io/PopVault"
```

4. Add `base` to `popvault-demo/vite.config.js`:

```js
base: '/PopVault/',
```

## Deploy steps (every time)

1. Ensure all changes are committed and pushed to GitHub.
2. Run the deploy from the `popvault-demo` folder:

```bash
cd popvault-demo && npm run deploy
```

3. This builds the app to `dist/` and pushes it to the `gh-pages` branch on GitHub automatically.

4. On first deploy, go to **GitHub → PopVault repo → Settings → Pages** and set the source branch to `gh-pages`.

The app will be live at: **https://DomWaters.github.io/PopVault**

## Usage

> /deploy
