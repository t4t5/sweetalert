// Fetch polyfill
import 'whatwg-fetch';

// NodeList.forEach() polyfill
import 'nodelist-foreach-polyfill';

import './add-preview-buttons';

import './landing-text-rotater';
/*
 * FOR GUIDES EXAMPLES:
 */
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
    swal.setActionValue(text);
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

window.reactExample = () => {

  swal({
    text: "Write something here:",
    content: el,
    buttons: {
      confirm: {
        value: DEFAULT_INPUT_TEXT,
      },
    },
  })
  .then((value) => {
    swal(`You typed: ${value}`);
  });

};
