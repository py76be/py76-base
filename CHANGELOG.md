# Changes
## 1.0.1 (unreleased)


- Update frontend to Volto 19.7.1.
  The frontend is now a pnpm workspace with the Cookieplone layout:
  the add-on lives in `frontend/packages/volto-py76-base`,
  and Volto core is checked out in `frontend/core` by `mrs-developer`.
  Node 22 or 24 and pnpm are required, yarn is no longer used.
  Unit tests run with Vitest.
  Update the add-ons for Volto 19: `@eeacms/volto-accordion-block` 13.1.1,
  `@eeacms/volto-matomo` 7.0.1, `@kitconcept/volto-slider-block` 7.1.0,
  and `volto-subblocks` 2.1.1.
  Keep `volto-form-block` at 3.7.2, matching `collective.volto.formsupport` 2.7.0.
  Override `chalk` to version 4 for `@plone/babel-preset-razzle`:
  with chalk 5 the development server crashes on files with an anonymous
  default export, like in `volto-form-block`.

- Update backend to Plone 6.2.3.
  Python 3.11 or higher is now required.
  Use `zope.pytestlayer` instead of the deprecated `gocept.pytestlayer`.
  Depend on the `plone.volto:initial` profile instead of `plone.volto:default`,
  which no longer sets up the content types, for example the
  `plone.constraintypes` behavior on Document.

- Respect the language chosen when creating a site: the `py76_base:default`
  profile no longer sets the default and available languages.
  Default to English in `create_site.py` and in the Volto settings.
  Volto now supports English, Dutch, German and French.

- Switch the UI to the base language when visiting content in an unsupported
  regional variant, for example English for `en-gb` content.
  Volto only does this when doing server side rendering.


## 1.0.0 (2024-02-22)

- Initial version [py76be]
