import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const DEFAULT_TEXT = "Hello!";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: DEFAULT_TEXT,
    };
  }

  changeText(e) {
    let text = e.target.value;
    console.log("Changed", text);

    this.setState({
      text,
    });

    swal.setValueFor('confirm', text);
  }

  render() {
    return (
      <input 
        value={this.state.text} 
        className="swal-input"
        onChange={this.changeText.bind(this)} />
    )
  }
}

let wrapper = document.createElement('div');
ReactDOM.render(<App />, wrapper);
let el = wrapper.firstChild;

//swal("You've arrived", "Hoe lovely", "success");

/*
swal("You've arrived!", "How lovely. Let me take your coat.", "success")
.then((value) => {
  console.log("Promise resolved", value);
  if (value) {
    return swal("Try again");
  }
})
.then((value) => {
  console.log("Promise resolved", value);
});
*/
//ReactDOM.render(<App />, document.getElementById('app'));
