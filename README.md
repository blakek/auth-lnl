# [🔐 Authentication & Authorization](https://blakek.github.io/auth-lnl/)

> A Lunch & Learn about authentication and authorization

## What is This?

It's a presentation mainly talking about Basic Auth and OAuth 2.0. Also, there
are a couple _really_ simple demos showing how each could be used.

Note, if you were using these in production, you'd likely use a package to get
started instead of rolling your own like the demos. However, I wanted to show it
is really easy to get started. Also, it shows everything instead of hiding logic
behind packages. A lot will probably be missed if you didn't have the context
within the talk, but that's fine!

## Do It Yourself

This uses [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/), so
`yarn` is required. You can check out [the Yarn docs on how to install
Yarn](https://yarnpkg.com/en/docs/install) on your machine.

Run these in your terminal to get started…

**First time setup:**

```sh
yarn install
```

**Making changes or presenting:**

```sh
yarn start
```

**Building for GitHub Pages:**

```sh
yarn build
```
