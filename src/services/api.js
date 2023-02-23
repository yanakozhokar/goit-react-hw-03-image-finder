const fetchImages = () => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '32921127-0509bb2923ebc5e2476cd7059';

  fetch(
    `${BASE_URL}?q=${this.state.filter}&key=${KEY}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.state.per_page}`
  ).then(data => data.json());
};

export default fetchImages;
