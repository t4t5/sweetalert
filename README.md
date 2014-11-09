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
  closeOnConfirm: false
}, function(){
  swal("Deleted!",
  "Your imaginary file has been deleted.",
  "success");
});
```

[View more examples](http://tristanedwards.me/sweetalert)

#Related projects

* [SweetAlert for Android](https://github.com/pedant/sweet-alert-dialog)
* [SweetAlert for Bootstrap](https://github.com/lipis/bootstrap-sweetalert)

