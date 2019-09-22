import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  // componentDidMount() {
  //   this.getData();
  //   if (!this.state.intervalIsSet) {
  //     let interval = setInterval(this.getDataFromDb, 1000);
  //     this.setState({ intervalIsSet: interval });
  //   }
  // }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getData = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => {this.setState({ data: res.a })})
  };

  render() {
    //const data = ;
    console.log(this.state);
    return (<div><button onClick={() => {this.getData()}}>
              ADD
            </button>
            <div>Your json: {this.state.data}</div>
          </div>);
  };
}

export default App;