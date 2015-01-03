#SweetAlert2

An awesome replacement for JavaScript's alert.

[See it in action!](https://limonte.github.io/sweetalert2/)

![A success modal](https://raw.github.com/limonte/sweetalert2/master/sweetalert.gif)

#Usage

You can install SweetAlert2 through bower:

```bash
bower install sweetalert2
```

Alternatively, download the package and reference the JavaScript and CSS files manually:

```html
<script src="dist/sweetalert2.min.js"></script>
<link rel="stylesheet" type="text/css" href="dist/sweetalert2.css">
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
}, function() {
  swal("Deleted!",
  "Your imaginary file has been deleted.",
  "success");
});
```

[View more examples](https://limonte.github.io/sweetalert2/)

#Related projects

* [SweetAlert](https://github.com/t4t5/sweetalert)
* [SweetAlert for Android](https://github.com/pedant/sweet-alert-dialog)
* [SweetAlert for Bootstrap](https://github.com/lipis/bootstrap-sweetalert)

