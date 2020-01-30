# Contributing

Thank you for your interest! Contributions are very welcome.

## Getting Started

This project uses
- [Yarn](https://yarnpkg.com/) as package manager
- [Babel](https://babeljs.io/) to support JSX and modern JS features like import/export
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to check for and automatically fix code style issues
- [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to create a pre-commit hook which automatically fixes code style issues in changed files on commit

Before doing anything else, clone (or fork and clone) this repository, `cd` into it and run `yarn` to install all dependencies.

After installing all dependencies, it's time to get to work. The following commands can be useful (run with `yarn <command>`):
- `build`: build the code inside src/ to dist/ using Babel
- `dev`: trigger a build whenever a file is changed inside src/
- `lint`: lint the code using ESLint and Prettier
- `fix`: auto-fix code style issues using ESLint and Prettier

To install the plugin locally for development, run `ipm link --dev`. Make sure "Development Mode" is turned on inside Inkdrop (Preferences > General). You'll need to reload Inkdrop (Developer > Reload) every time you rebuild the extension through `yarn build` or after changing a source file while `yarn dev` is running. Alternatively you can install the [Auto Reload](https://my.inkdrop.app/plugins/auto-reload) plugin to automatically reload Inkdrop whenever a plugin is modified.

## Maintainer Tasks

Some tasks only have to be performed by the maintainer:
- To update dependencies, run `yarn upgrade-interactive --latest` and select the dependencies to update.
- To release a new version, run `yarn release`. This removes the dist/ directory, builds the code and runs `ipm publish` with the arguments and options provided to `yarn release`. Run `ipm help publish` to see all the supported arguments and options. After releasing the new version, go to the repository's releases on GitHub, create a new release, link it to the newly created tag and write some information about the update.
