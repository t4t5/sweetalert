> If you are looking for the non-Bootstrap version refer to the original
> [SweetAlert project](https://github.com/t4t5/sweetalert).

# SweetAlert for Bootstrap

An awesome _replacement_ for JavaScript's `alert()` made for Bootstrap.


## Usage

Refer to the original [SweetAlert](http://tristanedwards.me/sweetalert) project
on how to use it.

The main difference here is that instead of using the `confirmButtonColor`
you will have to use the `confirmButtonClass`. It can take any of the default
Bootstrap classes for buttons like: `btn-danger`, `btn-success`, etc. The rest
remain exactly the same.

Also if you are using Less in your project, then instead of including the
`*.css` files include the
[`sweet-alert.less`](https://github.com/lipis/bootstrap-sweetalert/blob/master/lib/sweet-alert.less)
in your building process. That way it will use the Bootstrap's variables to
match your theme perfectly.


## Development

```shell
$ npm install
$ grunt
```
