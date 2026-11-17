### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-eu -o pipefail -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

# Keep this in sync with the tag in mrs.developer.json.
VOLTO_VERSION=19.7.1
PLONE_VERSION=6
DOCKER_IMAGE=plone/server-dev:${PLONE_VERSION}
DOCKER_IMAGE_ACCEPTANCE=plone/server-acceptance:${PLONE_VERSION}

ADDON_NAME=volto-py76-base
IMAGE_NAME=ghcr.io/py76be/py76-base-frontend
IMAGE_TAG=latest

.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Dev Helpers

.PHONY: clean
clean: ## Clean environment
	@echo "$(RED)==> Cleaning Volto core and node_modules$(RESET)"
	rm -rf core node_modules packages/*/node_modules

.PHONY: install
install: ## Install the frontend: check out Volto core and install packages
	@echo "$(GREEN)==> Install frontend$(RESET)"
	pnpm dlx mrs-developer missdev --no-config --fetch-https
	pnpm i
	$(MAKE) build-deps

.PHONY: start
start: ## Start the frontend in development mode
	pnpm start

.PHONY: build
build: ## Build a production bundle
	pnpm build

.PHONY: start-prod
start-prod: ## Start the production bundle
	pnpm start:prod

core/packages/registry/dist: $(shell find core/packages/registry/src -type f 2>/dev/null)
	pnpm --filter @plone/registry build

core/packages/components/dist: $(shell find core/packages/components/src -type f 2>/dev/null)
	pnpm --filter @plone/components build

.PHONY: build-deps
build-deps: core/packages/registry/dist core/packages/components/dist ## Build dependencies

.PHONY: i18n
i18n: ## Sync i18n
	pnpm --filter $(ADDON_NAME) i18n

.PHONY: i18n-ci
i18n-ci: ## Check if i18n is not synced
	pnpm --filter $(ADDON_NAME) i18n && git diff -G'^[^\"POT]' --exit-code

.PHONY: format
format: ## Format the codebase according to our standards
	pnpm prettier:fix
	pnpm lint:fix
	pnpm stylelint:fix

.PHONY: lint
lint: ## Lint, or catch and remove problems, in code base
	pnpm lint
	pnpm prettier
	pnpm stylelint

.PHONY: test
test: ## Run unit tests
	pnpm test

.PHONY: ci-test
ci-test: ## Run unit tests in CI
	# Unit Tests need the i18n to be built
	VOLTOCONFIG=$(CURRENT_DIR)/volto.config.js pnpm --filter @plone/volto i18n
	CI=1 pnpm test --run

.PHONY: backend-docker-start
backend-docker-start: ## Start a Docker-based backend for development
	@echo "$(GREEN)==> Start Docker-based Plone Backend$(RESET)"
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone $(DOCKER_IMAGE)

## Storybook
.PHONY: storybook
storybook: ## Start Storybook server on port 6006
	pnpm run storybook

.PHONY: storybook-build
storybook-build: ## Build Storybook
	mkdir -p $(CURRENT_DIR)/.storybook-build
	pnpm run storybook-build -o $(CURRENT_DIR)/.storybook-build

## Docker
.PHONY: build-image
build-image: ## Build Docker Image
	@DOCKER_BUILDKIT=1 docker build . -t $(IMAGE_NAME):$(IMAGE_TAG) -f Dockerfile --build-arg VOLTO_VERSION=$(VOLTO_VERSION)

## Acceptance
.PHONY: acceptance-frontend-dev-start
acceptance-frontend-dev-start: ## Start acceptance frontend in development mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm start

.PHONY: acceptance-frontend-prod-start
acceptance-frontend-prod-start: ## Start acceptance frontend in production mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: acceptance-backend-start
acceptance-backend-start: ## Start backend acceptance server
	docker run -it --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: test-acceptance
test-acceptance: ## Start Cypress in interactive mode
	pnpm --filter @plone/volto exec cypress open --config-file $(CURRENT_DIR)/cypress.config.js --config specPattern=$(CURRENT_DIR)'/cypress/tests/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Run Cypress tests in headless mode
	pnpm --filter @plone/volto exec cypress run --config-file $(CURRENT_DIR)/cypress.config.js --config specPattern=$(CURRENT_DIR)'/cypress/tests/**/*.{js,jsx,ts,tsx}'
