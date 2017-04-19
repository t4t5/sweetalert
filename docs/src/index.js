import { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Hello!",
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
      <input value={this.state.text} onChange={this.changeText.bind(this)} />
    )
  }
}

let wrapper = document.createElement('div');
ReactDOM.render(<App />, wrapper);
let el = wrapper.firstChild;

swal(el)
.then((value) => {
  console.log("Promise resolved", value);
});

//ReactDOM.render(<App />, document.getElementById('app'));
