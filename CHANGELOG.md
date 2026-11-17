# Changes
## 1.0.1 (unreleased)


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


## 1.0.0 (2024-02-22)

- Initial version [py76be]
