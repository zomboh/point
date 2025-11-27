<img width="250" height="100" alt="POInt" src="https://github.com/user-attachments/assets/317d1b3d-2bc7-47af-932d-2ae02a118a8c" />

# point
A little web app that allows you to interact with a map.

Try online at: https://point.zombotronik.workers.dev

## Features
- The usual mouse controls to navigate the map.
- Click on a POI, get a popup with some info.

## How to install
This is a regular node project. It was developed on the latest versions of node (v25.2.1) and npm (11.6.2).
Make sure you have an up-to-date environment and simply run `npm install`.

## How to run and build
- First, create a `.env` file at the root of the project with `VITE_SITUM_API_KEY="<your_api_key_here>"` replacing the text inside the quotes with your private api key.
- Use `npm run dev` to run the local environment. This will serve the app in the default Vite's serving location of `localhost:5173` but since it's ran with the `--host` option, you'll be able to test the app on any device in your local network. Simply access `<your serving machine's ip>:5173`.
- Use `npm run build` to make a production build that will be output to your `./dist` folder.

If you want to deploy the app, the easiest way is to just link github with Cloudflare and let a worker handle it. It'll correctly set the build environment for you, except for two things:
- **Supply the following deploy command to the worker so it deploys successfully**: `npx wrangler deploy --assets=./dist --compatibility-date 2025-11-25`.
- **Add a "VITE_SITUM_API_KEY" environment variable with your private api key value to your worker settings**.

**Point** is deployment environment agnostic, so it doesn't include the wrangler dependency by default.

