const fetchImages = (filter, page, per_page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '32921127-0509bb2923ebc5e2476cd7059';

  return fetch(
    `${BASE_URL}?q=${filter}&key=${KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=${per_page}`
  )
    .then(data => data.json())
    .then(response =>
      response.hits.length !== 0
        ? Promise.resolve(response)
        : Promise.reject(new Error('No such images found'))
    );
};

export default fetchImages;
