import { getData } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { initFilters } from './filters.js';
import { showAlert } from './util.js';

const getDataSuccess = (loadedPhotos) => {
  const picturesContainer = document.querySelector('.pictures');
  if (picturesContainer) {
    renderThumbnails(loadedPhotos, picturesContainer);
    initFilters(loadedPhotos);
  }
};

const getDataError = (error) => {
  showAlert(error.message);
};

getData()
  .then(getDataSuccess)
  .catch(getDataError);
