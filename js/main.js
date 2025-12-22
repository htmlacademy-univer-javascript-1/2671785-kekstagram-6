import { getData } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { showAlert } from './util.js';

const getDataSuccess = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  if (picturesContainer) {
    renderThumbnails(photos, picturesContainer);
  }
};

const getDataError = (error) => {
  showAlert(error.message);
};

getData()
  .then(getDataSuccess)
  .catch(getDataError);
