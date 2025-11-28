<img width="250" height="100" alt="POInt" src="https://github.com/user-attachments/assets/317d1b3d-2bc7-47af-932d-2ae02a118a8c" />

# point
A little web app that allows you to interact with a map.

Try online at: https://point.zombotronik.workers.dev

## How to install
This is a regular node project. It was developed on the latest versions of node (v25.2.1) and npm (11.6.2).
Make sure you have an up-to-date environment and simply run `npm install`.

## How to run and build
- First, create a `.env` file at the root of the project with `VITE_SITUM_API_KEY="<your_api_key_here>"` replacing the text inside the quotes with your private api key.
- Use `npm run dev` to run the local environment. This will serve the app in both `localhost:5173` and `<your_machine_ip>:5173`, the latter allowing you to test the app in any device of your local network. Both links are printed in the terminal after running the command.
- Use `npm run build` to make a production build that will be output to your `./dist` folder.

If you want to deploy the app, the easiest way is to just link github with Cloudflare and let a worker handle it. It'll correctly set the build environment for you, except for two things:
- **Supply the following deploy command to the worker so it deploys successfully**: `npx wrangler deploy --assets=./dist --compatibility-date 2025-11-25`.
- **Add a "VITE_SITUM_API_KEY" environment variable with your private api key value to your worker settings**.

**Point** is deployment environment agnostic, so it doesn't include the wrangler dependency by default.

## Tech
- `Vite`
- `React`
- `Typescript`
- `DaisyUI` (based on `tailwind css`)
- `Maplibre-gl` and `react-maplibre`
- ...last but not least, `Situm SDK js`

I chose this tech because:
- It aligned with Situm's use of React and Typescript.
- It provided me with a good starting point for developing. Vite's React typescript template is a nice boilerplate. The HMR is probably the fastest I've ever experienced, and ESLint coupled with VSCode allowed me to develop with confidence.

It was very important for me to have a good boilerplate and help from a linter, mainly because **it is the first time I use any of these technologies**. It was hard transitioning from my imperative brain to a declarative one, but I think I surpassed the POInt of no return now and there's no going back ;)

## Things I know I could improve
**So many**. Off the top of my head:
- **UI/UX**: *Tons* of stuff here... there's basically almost no UI/UX, I was too busy getting used to the new tech :( - "loading" states with their corresponding loading bars and smooth transitions between views, animations in general (*animating the map when clicking on a POI! Which you can do with the `FlyTo` method in maplibre, maybe next time*), better POI popup UI design, center the map taking the POI info popup into account (*pretty important!*), etc...).
- **Unit tests**: No time for this. I would use **Jest** and some React bindings I saw around.
- **Search in the POI list**: no time for this. Google Gemini suggested a pretty clean and straightforward to implement this, but it felt like cheating so I preferred to keep it as is. Only very simple questions were asked to AI during development to help with stuff I was not familiar with (*e.g.: This is how I want to model this data, how would I define that in a typescript interface?*).
- **Manage state with Redux**: I don't think it's necessary for such a simple app, but it'd be nice to learn how to do it. I was already too busy getting used to a lot of new tech. Next time!
- **Types**: I fixed everything the linter complained about, but I'm still getting used to working with types.
- **Design patterns and good practices in general**: Again, first time using all of this tech stack. Not familiar at all with React's/typescript best practices, and I'm super rusty with coding in general.

**All in all... I learned a ton and had a lot of fun!**

