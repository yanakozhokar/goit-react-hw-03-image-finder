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
    status: 'idle',
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.fetchImages();
      this.increasePage();
    }
  }

  filterHandler = newFilter => {
    this.setState({
      filter: newFilter,
      images: [],
      page: 1,
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
      .then(response =>
        response.hits.length !== 0
          ? Promise.resolve(response)
          : Promise.reject(new Error('No such images found'))
      )
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
          status: 'resolved',
        });
      })
      .catch(error => {
        this.setState({
          error,
          status: 'rejected',
        });
      });
  };

  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, error } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.filterHandler} />
        <main>
          {status === 'pending' && <p className="downloading">Загружаем</p>}

          {status === 'resolved' && (
            <>
              <ImageGallery images={this.state.images} />
              <Button loadMore={this.loadMoreHandler} />
            </>
          )}

          {status === 'rejected' && <p className="notFound">{error.message}</p>}
        </main>
      </>
    );
  }
}

export default App;
