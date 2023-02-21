import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

class App extends Component {
  state = {
    filter: '',
    images: [],
    page: 1,
    per_page: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.fetchImages();
      this.increasePage();
    }
  }

  filterHandler = newFilter => {
    this.resetImages();
    this.setState({
      filter: newFilter,
    });
  };

  loadMoreHandler = () => {
    this.fetchImages();
    this.increasePage();
  };

  fetchImages = () => {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '32921127-0509bb2923ebc5e2476cd7059';

    fetch(
      `${BASE_URL}?q=${this.state.filter}&key=${KEY}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.state.per_page}`
    )
      .then(data => data.json())
      .then(response => {
        const newImages = response.hits.map(
          ({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })
        );

        this.setState({
          images: [...this.state.images, ...newImages],
        });
      });
  };

  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  resetImages = () => {
    this.setState({
      images: [],
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.filterHandler} />
        <main>
          {this.state.images.length !== 0 && (
            <>
              <ImageGallery images={this.state.images} />
              <Button loadMore={this.loadMoreHandler} />
            </>
          )}
        </main>
      </>
    );
  }
}

export default App;
