import React, { Component	} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = { apiResponse: "" };
}

callAPI() {
    fetch("http://localhost:9000/testBackend")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
    this.callAPI();
}

render() {
  return (
    <header>
      <div>
    <h1>Hello world!</h1>
    <p className="app">{this.state.apiResponse}</p>
    </div>
    </header>
  );
}

}

export default App;
