# RSS aggregator

### Hexlet tests and linter status:
[![Actions Status](https://github.com/reznikovAndrey/frontend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/reznikovAndrey/frontend-project-lvl3/actions) [![Eslint check](https://github.com/reznikovAndrey/frontend-project-lvl3/workflows/linter-check/badge.svg)](https://github.com/reznikovAndrey/frontend-project-lvl3/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/690dbafac612e56ab85e/maintainability)](https://codeclimate.com/github/reznikovAndrey/frontend-project-lvl3/maintainability)

RSS - special format that describes news feeds, articles announcements etc. It`s the easiest way for websites (usually blogs) to allow users to subscribe for feeds changes. For this, special services called RSS aggregators are used.

This project is simple implementation of RSS aggregator, that allow user to subscribe for interesting feeds. RSS aggregator automatically monitor each feed updates and show new posts or articles for the user. By clicking on each post user can see modal preview, after it post would be marked as readed.

You can check deployed project on [Vercel](https://frontend-project-lvl3-six-bay.vercel.app/).

P.S. You can use [this](https://github.com/mbertolacci/lorem-rss) for testing all project features.

Used technologies:
- Vanilla JS: DOM API, Promises.
- [onChange](https://github.com/sindresorhus/on-change#on-change) for manipulations with state.
- [yup](https://github.com/jquense/yup#yup) for validation.
- [i18next](https://www.i18next.com/) for manipulation with text.
- [axios](https://axios-http.com/) for HTTP requests.
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) for layout.
- [Webpack](https://webpack.js.org/) for building.

## Installation
Clone project
```sh
git clone git@github.com:reznikovAndrey/frontend-project-lvl3.git
```

Go in project dir
```sh
cd frontend-project-lvl3
```

Install dependecies
```sh
make install
```

In case of development:
```sh
make develop
```
Or production build:
```sh
make build
```

### Authors:
- Andrey Reznikov
