import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    filter: '',
  };

  getFilter = newFilter => {
    this.setState({
      filter: newFilter,
    });
  };

  render() {
    return <Searchbar onSubmit={this.getFilter} />;
  }
}

export default App;
