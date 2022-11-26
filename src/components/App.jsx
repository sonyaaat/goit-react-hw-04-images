import Button from './Button/Button';
import api from './services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Spinner from './Spinner/Spinner';
import Notiflix from 'notiflix';
import BtnScrollUp from './BtnScrollUp/BtnScrollUp';

const { useState, useEffect } = require('react');
const { default: Searchbar } = require('./Searchbar/Searchbar');

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [ setError] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }

    try {
      setIsLoading(true);
      const response = api
        .fetchImages(query, page)
        .finally(() => setIsLoading(false));
      console.log(response);

      response.then(images => {
        if (images.data.totalHits === 0) {
          Notiflix.Notify.failure('Enter correct request');
          setPhotos([]);
          return;
        }
        images.data.hits.forEach(
          ({ id, webformatURL, largeImageURL, tags }) => {
            setPhotos(prev => [
              ...prev,
              { id, webformatURL, largeImageURL, tags },
            ]);
            setTotalPages(Math.ceil(images.data.totalHits / 12));
            setIsLoading(false);
          }
        );
      });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [query, page]);
  const handleSubmit = name => {
    setQuery(name);
    setPhotos([]);
    setPage(1);
  };
  const loadMore = () => {
    setPage(prev => prev + 1);
  };
  const onClick = photo => {
    setLargeImage(photo);
    setShowModal(true);
  };
  const onModalClose = () => {
    setShowModal(prev => !prev);
  };
  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {showModal && <Modal src={largeImage} onClose={onModalClose} />}
      {photos.length > 0 && <ImageGallery items={photos} onClick={onClick} />}
      {isLoading && <Spinner />}
      {photos.length !== 0 && totalPages > page && (
        <Button onLoadMore={loadMore} />
      )}
      <BtnScrollUp />
    </>
  );
};
export default App;
