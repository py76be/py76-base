# Py76 Base frontend

The frontend uses [Volto](https://github.com/plone/volto) 19.
All project code and configuration lives in the add-on in `packages/volto-py76-base`.

This is a [pnpm](https://pnpm.io/) workspace, following the layout of [Cookieplone](https://github.com/plone/cookieplone-templates).
Volto core is checked out into the `core` folder with [mrs-developer](https://github.com/collective/mrs-developer).
The Volto version is set in `mrs.developer.json`.
Keep `VOLTO_VERSION` in the `Makefile` and the `Dockerfile` in sync with it.

## Prerequisites

- Node 22 or 24
- pnpm, enabled with `corepack enable pnpm`

## Commands

Run `make help` to see all commands.

- `make install`: check out Volto core and install all packages.
- `make start`: start the frontend in development mode at http://localhost:3000.
- `make build`: build a production bundle.
- `make start-prod`: run the production bundle.
- `make test`: run the unit tests (Vitest).
- `make lint`: check the code with ESLint, Prettier and Stylelint.
- `make format`: fix the code with ESLint, Prettier and Stylelint.
- `make i18n`: sync the translations of the add-on.
- `make build-image`: build the Docker image.
- `make test-acceptance`: run the Cypress acceptance tests in interactive mode.

## Upgrading Volto

1. Change the `tag` in `mrs.developer.json`, and `VOLTO_VERSION` in the `Makefile` and the `Dockerfile`.
2. Run `make clean install`.
3. Commit the changed `pnpm-lock.yaml`.
