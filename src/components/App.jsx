import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    filter: '',
    images: [],
    page: 1,
    per_page: 12,
    status: 'idle',
    loading: false,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.setState({
        status: 'pending',
      });
      this.setLoader();
      this.fetchImages();
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
    this.increasePage();
    this.setLoader();
    this.fetchImages();
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
      })
      .finally(this.setState({ loading: false }));
  };

  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  setLoader = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const { status, loading, error } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.filterHandler} />

        <main>
          {status === 'pending' && loading && <Loader />}

          {status === 'resolved' && (
            <>
              <ImageGallery images={this.state.images} />
              {loading ? (
                <Loader />
              ) : (
                <Button loadMore={this.loadMoreHandler} />
              )}
            </>
          )}

          {status === 'rejected' && <p className="notFound">{error.message}</p>}
        </main>
      </>
    );
  }
}

export default App;
