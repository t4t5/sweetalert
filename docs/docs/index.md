<!--
layout: docs
-->

# Configuration

- ### `text`

  **Type:** `string`

  **Default:** `""` (*empty string*)

  **Description:**

  The modal's text. It can either be added as a configuration under the key `text` (as in the example below), or passed as the first and only parameter (e.g. `swal("Hello world!")`), or the second one if you have multiple string parameters (e.g. `swal("A title", "Hello world!")`).

  **Example:**
  ```js
  swal({
    text: "Hello world!",
  });
  ```
  <preview-button></preview-button>


- ### `title`

  **Type:** `string`
  
  **Default:** `""` (*empty string*)

  **Description:**

  The title of the modal. It can either be added as a configuration under the key `title` (as in the example below), or passed as the first string parameter – as long as it's not the only one – of the `swal` function (e.g. `swal("Here's a title!", "Here's some text")`).

  **Example:**
  ```js
  swal({
    title: "Here's a title!",
  });
  ```
  <preview-button></preview-button>


- ### `icon`

  **Type:** `string`

  **Default:** `""` (*empty string*)

  **Description:**

  An icon for the modal. SweetAlert comes with 4 built-in icons that you can use:

  - `"warning"`
  - `"error"`
  - `"success"`
  - `"info"`

  It can either be added as a configuration under the key `icon`, or passed as the third string parameter of the `swal` function (e.g. `swal("Title", "Text", "success")`).

  **Example:**
  ```js
  swal({
    icon: "success",
  });
  ```
  <preview-button></preview-button>


- ### `button`

  **Type:** `string|boolean|ButtonOptions`

  **Default:**
  ```js
  {
    text: "OK",
    value: true,
    visible: true,
    class: ""
  }
  ```

  **Description:**

  The confirm button that's shown by default. You can change its text by setting `button` to a string, or you can tweak more setting by passing a `ButtonOptions` object. Setting it to `false` hides the button.

  **Examples:**
  ```js
  swal({
    button: "Coolio",
  });
  ```
  <preview-button></preview-button>

  ```js
  swal({
    button: {
      text: "Hey ho!",
    },
  });
  ```
  <preview-button></preview-button> 

  ```js
  swal("Hello world!", {
    button: false,
  });
  ```
  <preview-button></preview-button> 


- ### `buttons`

  **Type:** `boolean|string[]|ButtonOptions[]|ButtonList`

  **Default:**
  ```js
  {
    cancel: {
      text: "Cancel",
      value: null,
      visible: false,
      class: "",
    },
    confirm: {
      text: "OK",
      value: true,
      visible: true,
      class: "",
    }
  }
  ```
  
  **Description:**
  
  Specify the exact amount of buttons and their behaviour. If you use an array, you can set the elements as strings (to set only the text), a list of `ButtonOptions`, or a combination of both. You can also set one of the elements to `true` to simply get the default options.

  If you want more than just the predefined cancel and confirm buttons, you need to specify a `ButtonList` object, with keys (the button's namespace) pointing to `ButtonOptions`.
  
  You can also specify `false` to hide all buttons (same behaviour as the `button` option).

  **Examples:**

  ```js
  swal({
    buttons: ["Stop", "Do it!"],
  });
  ```
  <preview-button></preview-button>

  ```js
  swal({
    buttons: [true, "Do it!"],
  });
  ```
  <preview-button></preview-button>

  ```js
  swal("Hello world!", {
    buttons: false,
  });
  ```
  <preview-button></preview-button>

  ```js
  swal({
    buttons: {
      cancel: true,
      confirm: true,
    },
  });
  ```
  <preview-button></preview-button>

  ```js
  swal({
    buttons: {
      cancel: true,
      confirm: "Confirm",
      roll: {
        text: "Do a barrell roll!",
        value: "roll",
      },
    },
  });
  ```
  <preview-button></preview-button>


- ### `content`
  

# Methods

| Name | Description | Example |
| ---- | ----------- | ------- |
| close | Closes the currently open SweetAlert | `swal.close()` |


# Theming
