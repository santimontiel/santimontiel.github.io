# Installation Guide

This project is an [Astro](https://astro.build) site. This guide covers setting up
everything needed to run it locally, on Ubuntu/WSL2 (or any Linux/macOS machine).

## Prerequisites

- A POSIX shell (bash/zsh)
- `curl` (used to install nvm)

No `sudo`/root access is required — Node.js is installed per-user via `nvm`.

## 1. Install nvm (Node Version Manager)

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Reload your shell config so `nvm` is available (or just open a new terminal):

```sh
source ~/.bashrc   # or ~/.zshrc if you use zsh
```

## 2. Install Node.js

Astro 7 requires **Node.js >= 22.12** (see `engines` in `package.json`). This
installs the latest LTS release (v24.x at time of writing) and its bundled `npm`:

```sh
nvm install --lts
```

Verify:

```sh
node -v   # e.g. v24.19.0
npm -v    # e.g. 11.17.0
```

## 3. Install project dependencies

From the repository root:

```sh
npm install
```

This installs Astro and the other packages listed in `package.json`
(`@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`, `sharp`, etc).

> **Note:** `sharp` and `esbuild` ship install/postinstall scripts. `npm install`
> runs them by default; if your npm config blocks lifecycle scripts, allow them
> explicitly (`npm approve-builds` or `npm approve-scripts --allow-scripts-pending`),
> otherwise image optimization (`sharp`) may not work correctly.

## 4. Run the project

| Command           | Action                                            |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start the local dev server at `localhost:4321`      |
| `npm run build`    | Build the production site to `./dist/`              |
| `npm run preview`  | Preview the production build locally                |
| `npm run astro ...`| Run any Astro CLI command (e.g. `astro check`)       |

Example — start the dev server:

```sh
npm run dev
```

Then open http://localhost:4321 in your browser.

## Troubleshooting

- **`node`/`npm` not found after installing nvm**: make sure you sourced
  `~/.bashrc`/`~/.zshrc` (or opened a new shell) after running the nvm install
  script, and that this snippet exists in your shell rc file:

  ```sh
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  ```

- **`npm audit` reports vulnerabilities**: these come from transitive build
  dependencies (e.g. `esbuild`, `tsconfck`) and don't affect the built static
  site. Run `npm audit` for details if you want to review them.
