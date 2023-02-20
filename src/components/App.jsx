import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    filter: '',
    images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '32921127-0509bb2923ebc5e2476cd7059';
    let page = 1;

    fetch(
      `${BASE_URL}?q=${this.state.filter}&key=${KEY}&image_type=photo&orientation=horizontal&${page}&per_page=12`
    )
      .then(data => data.json())
      .then(response => {
        this.setState({
          images: response.hits.map(({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })),
        });
      });
  };

  getFilter = newFilter => {
    this.setState({
      filter: newFilter,
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.getFilter} />
        {this.state.images != [] && <ImageGallery images={this.state.images} />}
      </>
    );
  }
}

export default App;
