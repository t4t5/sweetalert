#SweetAlert

An awesome replacement for JavaScript's alert.

[See it in action!](http://tristanedwards.me/sweetalert)

![A success modal](https://raw.github.com/t4t5/sweetalert/master/sweetalert.gif)

#Usage

You can install SweetAlert through bower:

```bash
bower install sweetalert
```

Alternatively, download the package and reference the JavaScript and CSS files manually:

```html
<script src="lib/sweet-alert.min.js"></script>
<link rel="stylesheet" type="text/css" href="lib/sweet-alert.css">
```

#Examples

The most basic message:

```javascript
sweetAlert("Hello world!");
```

A message signaling an error:

```javascript
sweetAlert("Oops...", "Something went wrong!", "error");
```

A warning message, with a function attached to the "Confirm"-button..

```javascript
sweetAlert({
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

[View more examples](http://tristanedwards.me/sweetalert)


#Browser compatibility

SweetAlert works in all major browsers (yes, even IE). Some details:

- **IE8**: Works, but icons (checkmark, x-mark...) are hidden.
- **IE9**: Works, but icons are not animated.
- **IE10+**: Works!
- **Safari 4+**: Works!
- **Firefox 3+**: Works!
- **Chrome 14+**: Works!
- **Opera 15+**: Works!


#Contributing

If you want to contribute:

- Fork the repo

- Make sure you have [Node](http://nodejs.org/), [NPM](https://www.npmjs.com/) and [Gulp](http://gulpjs.com/) installed. When in the SweetAlert directory, run the command:
```
npm install
```
to install the dependencies and make Gulp automatically minify the SCSS and JS-files.

- After you're done, make a pull request and wait for approval! :)



#Related projects

* [SweetAlert for Android](https://github.com/pedant/sweet-alert-dialog)
* [SweetAlert for Bootstrap](https://github.com/lipis/bootstrap-sweetalert)
* [SweetAlert for AngularJS](https://github.com/oitozero/ngSweetAlert)

