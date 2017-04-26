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

## Showing an alert

After importing the files into your application, you can call the `swal` function (make sure it's called *after* the DOM has loaded!)

```js
swal("Hello world!");
```
<preview-button></preview-button>

If you pass two arguments, the first one will be the modal's title, and the second one its text.

```js
swal("Here's the title!", "...and here's the text!");
```
<preview-button></preview-button>

And with a third argument, you can add an icon to your alert! There are 4 predefined ones: `"warning"`, `"error"`, `"success"` and `"info"`.

```js
swal("Good job!", "You clicked the button!", "success");
```
<preview-button></preview-button>

## Using options

The last example can also be rewritten using an object as the only parameter:

```js
swal({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success",
});
```

With this format, we can specify many more options to customize our alert. For example we can change the text on the confirm button to `"Aww yiss!"`:

```js
swal({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success",
  button: "Aww yiss!",
});
```
<preview-button></preview-button>

You can even combine the first syntax with the second one, which might save you some typing:

```js
swal("Good job!", "You clicked the button!", "success", {
  button: "Aww yiss!",
});
```

For a full list of all the available options, check out the [API docs](/api)!

## Using promises

SweetAlert uses [promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) to keep track of how the user interacts with the alert.

If the user clicks the confirm button, the promise resolves to `true`. If the alert is dismissed (by clicking outside of it), the promise resolves to `null`.

```js
swal("Click on either the button or outside the modal.")
.then((value) => {
  swal(`The returned value is: ${value}`);
});
```
<preview-button></preview-button>

This comes in handy if you want to warn the user before they perform a dangerous action. We can make our alert even better by setting some more options:
- `icon` can be set to the predefined `"warning"` to show a nice warning icon.
- By setting `buttons` (plural) to `true`, SweetAlert will show a cancel button in addition to the default confirm button.
- By setting `dangerMode` to `true`, the focus will automatically be set on the cancel button instead of the confirm button, and the confirm button will be red instead of blue to emphasize the dangerous action.

```js
swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this imaginary file!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Poof! Your imaginary file has been deleted!", {
      icon: "success", 
    });
  } else {
    swal("Your imaginary file is safe!"); 
  }
});
```
<preview-button></preview-button>


# Advanced examples

## Customizing buttons

We've already seen how we can set the text on the confirm button using `button: "Aww yiss!"`. 

If we also want to show and customize the *cancel button*, we can instead set `buttons` to an *array of strings*, where the first value is the cancel button's text and the second one is the confirm button's text:

```js
swal("Are you sure you want to do this?", {
  buttons: ["Oh noez!", "Aww yiss!"],
});
```
<preview-button></preview-button>

If you want one of the buttons to just have their default text, you can set the value to `true` instead of a string:

```js
swal("Are you sure you want to do this?", {
  buttons: ["Oh noez!", true],
});
```
<preview-button></preview-button>

So what if you need *more* than just a cancel and a confirm button? Don't worry, SweetAlert's got you covered!

By specifying an object for `buttons`, you can set exactly as many buttons as you like, and specify the value that they resolve to when they're clicked!

In the example below, we set 3 buttons:
- `cancel`, which by default resolves to `null` and has a custom `"Run away!"` text.
- `catch`, which will resolve to the `value` we've specified (`"catch"`) and has the custom text `"Throw Pokéball!"`.
- `defeat`. Here, we specify `true` to let SweetAlert set some default configurations for the button. In this case, it will set the `text` to `"Defeat"` (capitalized) and the resolved value to `defeat`. Had we set the `cancel` button to `true`, it would still resolve to `null` as expected.

```js
swal("A wild Pikachu appeared! What do you want to do?", {
  buttons: {
    cancel: "Run away!",
    catch: {
      text: "Throw Pokéball!",
      value: "catch",
    },
    defeat: true,
  },
})
.then((value) => {
  switch (value) {

    case "defeat":
      swal("Pikachu fainted! You gained 500 XP!");
      break;

    case "catch":
      swal("Gotcha!", "Pikachu was caught!", "success");
      break;

    default:
      swal("Got away safely!");
  }
});
```
<preview-button></preview-button>

You can check out all the available button options in the [API docs](/api).

## AJAX requests

Since SweetAlert is promise-based, it makes sense to pair with AJAX functions that are also promise-based. Below is an example of using `fetch` to search for artists on the Spotify API. Note that we're using `content: "input"` in order to both show an input-field *and* retrieve its value when the user clicks the confirm button:

```js
swal({
  text: 'Search for an artist. e.g. "Michael Jackson".',
  content: "input",
})
.then((name) => {
  if (!name) throw null;

  return fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`);
})
.then((results) => {
  return results.json();
})
.then((json) => {
  const artist = json.artists.items[0];

  if (!artist) {
    return swal("No artist was found!");
  }

  const fullName = artist.name;
  const imageURL = artist.images[0].url;

  swal({
    title: "Top result:",
    text: fullName,
    icon: imageURL,
  });
})
.catch((err) => {
  if (err) {
    swal("Oh noes!", "The AJAX request failed!", "error");
  }
});
```
<preview-button></preview-button>

## Using DOM nodes as content

Sometimes, you might run into a scenario where it would be nice to use the out-of-the box functionality that SweetAlert offers, but with some custom UI that goes beyond just styling buttons and text. For that, there's the `content` option. 

In the previous example, we saw how we could set `content` to `"input"` to get an `<input />` element in our modal that changes the resolved value of the confirm button based on its value.
`"input"` is a predefined option that exists for convenience, but you can also set `content` to any DOM node!

Let's see how we can recreate the functionality of the following modal...

```js
swal("Write something here:", {
  content: "input",
})
.then((value) => {
  swal(`You typed: ${value}`);
});
```
<preview-button></preview-button>

...using a custom DOM node!

We're going to use [React](https://facebook.github.io/react) here, since it's a well-known UI library that can help us understand how to create more complex SweetAlert interfaces in the future. If you're using something other than React, you can check out the [Library integration section](#library-integration)!

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const DEFAULT_INPUT_TEXT = "";

class MyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: DEFAULT_INPUT_TEXT,
    };
  }

  changeText(e) {
    let text = e.target.value;

    this.setState({
      text,
    });

    /*
     * This will update the value that the confirm
     * button resolves to:
     */
    swal.setValueFor('confirm', text);
  }

  render() {
    return (
      <input 
        value={this.state.text} 
        onChange={this.changeText.bind(this)}
      />
    )
  }
}

// We want to retrieve MyInput as a pure DOM node:
let wrapper = document.createElement('div');
ReactDOM.render(<MyInput />, wrapper);
let el = wrapper.firstChild;

swal({
  text: "Write something here:",
  content: el,
  buttons: {
    confirm: {
      /*
       * We need to initialize the value of the button to
       * an empty string instead of "true":
       */
      value: DEFAULT_INPUT_TEXT,
    },
  },
})
.then((value) => {
  swal(`You typed: ${value}`);
});
```
<preview-button data-function="reactExample"></preview-button>

This might look very complex at first, but it's actually pretty simple. All we're doing is creating an input tag as a React component. We then extract its DOM node and pass it into under the `swal` function's `content` option to render it as an unstyled element.

The only code that's specific to SweetAlert is the `swal.setValueFor()` and the `swal()` call at the end. The rest is just basic React and JavaScript.

<figure align="center">
  <img src="/assets/images/modal-fb-example@2x.png" alt="Facebook modal" width="400" />
  <figcaption>
    Using this technique, we can create modals with more interactive UIs, such as this one from Facebook.
  </figcaption>
</figure>


# Upgrading from 1.X

SweetAlert 2.0 introduces some important breaking changes in order to make the library easier to use and more flexible.

The most important change is that callback functions have been deprecated in favour of [promises](#using-promises).

Below are some additional deprecated options along with their replacements:

- `type` and `imageUrl` have been replaced with a single `icon` option. If you're using the shorthand version (`swal("Hi", "Hello world", "warning")`) you don't have to change anything.
- When using a single string parameter (e.g. `swal("Hello world!")`), that parameter will be the modal's `text` instead of its `title`.
- `customClass` is now just `class`.
- `imageSize` is no longer used. Instead, you should specify dimension restrictions in CSS if necessary. If you have a special use case, you can give your modal a custom class.
- `showCancelButton` and `showConfirmButton` are no longer needed. Instead, you can set `buttons: true` to show both buttons, or `buttons: false` to hide all buttons. By default, only the confirm button is shown.
- `confirmButtonText` and `cancelButtonText` are no longer needed. Instead, you can set `button: "foo"` to set the text on the confirm button to "foo", or `buttons: ["foo", "bar"]` to set the text on the cancel button to "foo" and the text on the confirm button to "bar".
- `confirmButtonColor` is no longer used. Instead, you should specify all stylistic changes through CSS. As a useful shorthand, you can set `dangerMode: true` to make the confirm button red. Otherwise, you can specify a class in the [button object](/api).
- `type: "input"`, `inputType`, `inputValue` and `inputPlaceholder` have all been replaced with the `content` option. You can either specify `content: "input"` to get the default options, or you can customize it further using the [content object](/api).

