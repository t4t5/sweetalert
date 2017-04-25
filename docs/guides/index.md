<!--
layout: guides
-->

# Installation

## NPM/Yarn

NPM combined with a tool like [Browserify](http://browserify.org) or [Webpack](https://webpack.js.org) is the recommended method of installing SweetAlert.

```bash
npm install sweetalert --save
```

## Bower

```bash
bower install sweetalert
```

## CDN

You can also find SweetAlert on [unpkg](unpkg.com/sweetalert) and [cdnjs](https://cdnjs.com/libraries/sweetalert).

```html
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/sweetalert/dist/sweetalert.css" />
```

# Getting started

After importing the files into your application, you can call the `swal` function (make sure it's called *after* the DOM has loaded!)

```js
swal("Hello!");
```
