<p align="center">
  <a href="https://docs.connctd.io">
    <img alt="connctd docs" src="./.github/connctd-docs-banner.png" />
  </a>
</p>

# connctd docs

This project is based on [gatsby.js](https://www.gatsbyjs.org/docs/) and all gatsby related
documentation and plugins are valid for this project.

This repository is split into two packages to separate the content from the styling

- The documentation itself `./docs`
- The gatsby theme and styling for the docs website `./gatsby-theme-connctd-docs`

## Writing docs

Every doc page is a markdown document within `docs/content`. You can edit these markdown files
or create a new one.

Perform once:
```sh
yarn install
```

To see the resulting site:

```sh
yarn workspace docs start
```

In case yarn is complaining about your installed node version checkout https://www.awesomeblog.co/2018/10/managing-your-node-js-versions-on-mac/
