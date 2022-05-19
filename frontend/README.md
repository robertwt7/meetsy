# Next.js with MUI

## How to use

Clone this repo

Install it and run:

```sh
cp .env.example .env.local
npm install
npm run dev
```

You also need to generate secret for JWT and Session as mentioned in [next-auth](https://next-auth.js.org/configuration/options#secret)

To get started you can generate a random string

```sh
openssl rand -base64 32
```

## The idea behind the example

The project uses [Next.js](https://github.com/zeit/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5.
If you prefer, you can [use styled-components instead](https://mui.com/guides/interoperability/#styled-components).

## The link component

Next.js has [a custom Link component](https://nextjs.org/docs/api-reference/next/link).
The example folder provides adapters for usage with MUI.
More information [in the documentation](https://mui.com/guides/routing/#next-js).

## What's next?

<!-- #default-branch-switch -->

You now have a working example project.
You can head back to the documentation, continuing browsing it from the [templates](https://mui.com/getting-started/templates/) section.
