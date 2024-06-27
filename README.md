# client

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Needed instalations 
- WSL for windows
- Node js
- npm
- vue js
- IDE Setup 
- Access to Github 
- Git

## Project Setup
You first have to clone the repository into your machine via this link https://github.com/Nilssteingraeber/PrepperApp

Once it is cloned you can open the WSL terminal and change your folder to the folder where the cloned repository is:
cd /cloned/repository/folder

After that you should open the code with wsl using this command:
code . 

This will open your IDE Setup, in our case we are using VSCode. Once vsCode is opened, open a new terminal and type this command:
cd client 
and then this :
npm run dev 


```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
