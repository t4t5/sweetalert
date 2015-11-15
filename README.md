SweetAlert [![Build Status](https://travis-ci.org/t4t5/sweetalert.svg?branch=master)](https://travis-ci.org/t4t5/sweetalert)
==========

An awesome replacement for JavaScript's alert.

![A success modal](https://raw.github.com/t4t5/sweetalert/master/sweetalert.gif)

[See it in action!](http://t4t5.github.io/sweetalert)

[Learn how to use it!](https://www.ludu.co/lesson/how-to-use-sweetalert)


Usage
-----

You can install SweetAlert through bower:

```bash
bower install sweetalert
```

Or through npm:

```bash
npm install sweetalert
```

Alternatively, download the package and reference the JavaScript and CSS files manually:

```html
<script src="dist/sweetalert.min.js"></script>
<link rel="stylesheet" type="text/css" href="dist/sweetalert.css">
```
**Note:** If you're using an older version than v1.0.0, the files are `lib/sweet-alert.min.js` and `lib/sweet-alert.css`


Tutorial
--------

The easiest way to get started is follow the [SweetAlert tutorial on Ludu](https://www.ludu.co/lesson/how-to-use-sweetalert)!


Examples
--------

The most basic message:

```javascript
swal("Hello world!");
```

A message signaling an error:

```javascript
swal("Oops...", "Something went wrong!", "error");
```

A warning message, with a function attached to the "Confirm"-button:

```javascript
swal({
  title: "Are you sure?",
  text: "You will not be able to recover this imaginary file!",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes, delete it!",
  closeOnConfirm: false,
  html: false
}, function(){
  swal("Deleted!",
  "Your imaginary file has been deleted.",
  "success");
});
```

A prompt modal where the user's input is logged:

```javascript
swal({
  title: "An input!",
  text: 'Write something interesting:',
  type: 'input',
  showCancelButton: true,
  closeOnConfirm: false,
  animation: "slide-from-top"
}, function(inputValue){
  console.log("You wrote", inputValue);
});
```

Ajax request example:

```javascript
swal({
  title: 'Ajax request example',
  text: 'Submit to run ajax request',
  type: 'info',
  showCancelButton: true,
  closeOnConfirm: false,
  disableButtonsOnConfirm: true,
  confirmLoadingButtonColor: '#DD6B55'
}, function(inputValue){
  setTimeout(function() {
    swal('Ajax request finished!');
  }, 2000);
});
```

[View more examples](http://t4t5.github.io/sweetalert)


Themes
------

SweetAlert can easily be themed to fit your site's design. SweetAlert comes with three example themes that you can try out: **facebook**, **twitter** and **google**. They can be referenced right after the intial sweetalert-CSS:
```html
<link rel="stylesheet" href="dist/sweetalert.css">
<link rel="stylesheet" href="themes/twitter/twitter.css">
```


Browser compatibility
---------------------

SweetAlert works in most major browsers (yes, even IE). Some details:

- **IE8**: (Dropped since v1.0.0-beta)
- **IE9**: Works, but icons are not animated.
- **IE10+**: Works!
- **Safari 4+**: Works!
- **Firefox 3+**: Works!
- **Chrome 14+**: Works!
- **Opera 15+**: Works!


Contributing
------------

If you want to contribute:

- Fork the repo

- Make sure you have [Node](http://nodejs.org/), [NPM](https://www.npmjs.com/) and [Gulp](http://gulpjs.com/) installed. When in the SweetAlert directory, run `npm install` to install the dependencies. Then run `gulp` while working to automatically minify the SCSS and JS-files.

- Keep in mind that SweetAlert uses Browserify in order to compile ES6-files. For easy debugging, make sure you reference the file `dist/sweetalert-dev.js` instead of `sweetalert.js`.

- After you're done, make a pull request and wait for approval! :)


Related projects
----------------

* [SweetAlert for Android](https://github.com/pedant/sweet-alert-dialog)
* [SweetAlert for Bootstrap](https://github.com/lipis/bootstrap-sweetalert)
* [SweetAlert for AngularJS](https://github.com/oitozero/ngSweetAlert)
* [SweetAlert for RubyOnRails](https://github.com/sharshenov/sweetalert-rails)
