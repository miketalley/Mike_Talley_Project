# Lord of the Rings Quote Quiz

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To run locally:

Create a `.env` file in the root of the project with your API access token (this can be obtained at [https://the-one-api.dev/account](https://the-one-api.dev/account))

```
LOTR_ACCESS_TOKEN=<paste your api token here>
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

To test...

1. Open [http://localhost:3000](http://localhost:3000) with your browser
2. Click "Play" to start the game
3. Fill in the text input guesses for both character and movie
4. Click "Submit"

## Issues

- Currently will not build on production due to [a Next.js bug](https://answers.netlify.com/t/next-app-edge-function-bundling-error/89530/4)
- Special characters are not fuzzy matched by the API, and do not show up in the search unless typed exactly (e.g. `Éowyn` vs `Eowyn`)

## Links

- [The One API](https://the-one-api.dev/)
