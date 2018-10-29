<p align="center">
  <a href="http://sweetalert.js.org">
    <img alt="SweetAlert" src="https://raw.githubusercontent.com/t4t5/sweetalert/e3c2085473a0eb5a6b022e43eb22e746380bb955/assets/logotype.png" width="300">
  </a>
</p>

<p align="center">
  A beautiful replacement for JavaScript's "alert"
</p>

<p align="center">
  <a href="https://badge.fury.io/js/sweetalert"><img src="https://badge.fury.io/js/sweetalert.svg" alt="npm version" height="18"></a>
  <a href="https://travis-ci.org/t4t5/sweetalert"><img src="https://travis-ci.org/t4t5/sweetalert.svg" alt="Build status" /></a>
  <a href="https://www.npmjs.com/package/sweetalert">
    <img src="https://img.shields.io/npm/dm/sweetalert.svg" />
  </a>
  <a href="https://github.com/t4t5/sweetalert/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/t4t5/sweetalert.svg" />
  </a> 
  <a href="#backers" alt="sponsors on Open Collective"><img src="https://opencollective.com/SweetAlert/backers/badge.svg" /></a> <a href="#sponsors" alt="Sponsors on Open Collective"><img src="https://opencollective.com/SweetAlert/sponsors/badge.svg" /></a>
</p>

<p align="center">
  <img alt="A success modal" src="https://raw.githubusercontent.com/t4t5/sweetalert/e3c2085473a0eb5a6b022e43eb22e746380bb955/assets/swal.gif">
</p>


## Installation

```bash
$ npm install --save sweetalert
```

## Usage

```javascript
import swal from 'sweetalert';

swal("Hello world!");
```

## Upgrading from 1.X

Many improvements and breaking changes have been introduced in the 2.0 release. Make sure you read the [upgrade guide](https://sweetalert.js.org/guides/#upgrading-from-1x) to avoid nasty suprises!

## Guides

- [Installation](https://sweetalert.js.org/guides/#installation)
- [Getting started](https://sweetalert.js.org/guides/#getting-started)
- [Advanced examples](https://sweetalert.js.org/guides/#advanced-examples)
- [Using with libraries](https://sweetalert.js.org/guides/#using-with-libraries)
- [Upgrading from 1.X](https://sweetalert.js.org/guides/#upgrading-from-1x)

## Documentation

- [Configuration](https://sweetalert.js.org/docs/#configuration)
- [Methods](https://sweetalert.js.org/docs/#methods)
- [Theming](https://sweetalert.js.org/docs/#theming)

## Examples

### An error message:
```javascript
swal("Oops!", "Something went wrong!", "error");
```

### A warning message, with a function attached to the confirm message:
  - Using promises:
  ```javascript
  swal({
    title: "Are you sure?",
    text: "Are you sure that you want to leave this page?",
    icon: "warning",
    dangerMode: true,
  })
  .then(willDelete => {
    if (willDelete) {
      swal("Deleted!", "Your imaginary file has been deleted!", "success");
    }
  });
  ```
  - Using async/await:
  ```javascript
  const willDelete = await swal({
    title: "Are you sure?",
    text: "Are you sure that you want to delete this file?",
    icon: "warning",
    dangerMode: true,
  });

  if (willDelete) {
    swal("Deleted!", "Your imaginary file has been deleted!", "success");
  }
  ```
  
### A prompt modal, where the user's input is logged:
  - Using promises:
  ```javascript
  swal("Type something:", {
    content: "input",
  })
  .then((value) => {
    swal(`You typed: ${value}`);
  });
  ```
  - Using async/await:
  ```javascript
  const value = await swal("Type something:", {
    content: "input",
  });

  swal(`You typed: ${value}`);
  ```

### In combination with Fetch:
  - Using promises:
  ```javascript
  swal({
    text: "Wanna log some information about Bulbasaur?",
    button: {
      text: "Search!",
      closeModal: false,
    },
  })
  .then(willSearch => {
    if (willSearch) {
      return fetch("http://pokeapi.co/api/v2/pokemon/1");
    }
  })
  .then(result => result.json())
  .then(json => console.log(json))
  .catch(err => {
    swal("Oops!", "Seems like we couldn't fetch the info", "error");
  });
  ```
  - Using async/await:
  ```javascript
  const willSearch = await swal({
    text: "Wanna log some information about Bulbasaur?",
    button: {
      text: "Search!",
      closeModal: false,
    },
  });
  
  if (willSearch) {
    try {
      const result = await fetch("http://pokeapi.co/api/v2/pokemon/1");
      const json = await result.json();
      console.log(json);
    } catch (err) {
      swal("Oops!", "Seems like we couldn't fetch the info", "error");
    }
  }
  ```

## Using with React

SweetAlert has tools for [integrating with your favourite rendering library.](https://sweetalert.js.org/guides/#using-with-libraries).

If you're using React, you can install [SweetAlert with React](https://www.npmjs.com/package/@sweetalert/with-react) in addition to the main library, and easily add React components to your alerts like this:

```javascript
import React from 'react'
import swal from '@sweetalert/with-react'

swal(
  <div>
    <h1>Hello world!</h1>
    <p>
      This is now rendered with JSX!
    </p>
  </div>
)
```

[Read more about integrating with React](http://localhost:3000/guides#using-react)

## Contributing

### If you're changing the core library:
1. Make changes in the `src` folder.
2. Preview changes by running `npm run docs`
3. Submit pull request

### If you're changing the documentation:
1. Make changes in the `docs-src` folder.
2. Preview changes by running `npm run docs`
3. Run `npm run builddocs` to compile the changes to the `docs` folder
4. Submit pull request

## Contributors

This project exists thanks to all the people who contribute. [[Contribute](https://github.com/t4t5/sweetalert#contributing)].
<a href="https://github.com/t4t5/sweetalert/graphs/contributors"><img src="https://opencollective.com/SweetAlert/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/SweetAlert#backer)]

<a href="https://opencollective.com/SweetAlert#backers" target="_blank"><img src="https://opencollective.com/SweetAlert/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/SweetAlert#sponsor)]

<a href="https://opencollective.com/SweetAlert/sponsor/0/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/SweetAlert/sponsor/1/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/SweetAlert/sponsor/2/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/SweetAlert/sponsor/3/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/SweetAlert/sponsor/4/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/SweetAlert/sponsor/5/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/SweetAlert/sponsor/6/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/SweetAlert/sponsor/7/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/SweetAlert/sponsor/8/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/SweetAlert/sponsor/9/website" target="_blank"><img src="https://opencollective.com/SweetAlert/sponsor/9/avatar.svg"></a>


