import { renderThumbnails } from './thumbnail.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');
const filtersForm = filtersElement.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');

let currentFilter = 'filter-default';
let photos = [];

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

const getRandomPhotos = () => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = () => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (filterId) => {
  let filteredPhotos = [];

  switch (filterId) {
    case 'filter-random':
      filteredPhotos = getRandomPhotos();
      break;
    case 'filter-discussed':
      filteredPhotos = getDiscussedPhotos();
      break;
    default:
      filteredPhotos = [...photos];
  }

  const picturesContainer = document.querySelector('.pictures');
  if (picturesContainer) {
    picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
    renderThumbnails(filteredPhotos, picturesContainer);
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const onFilterChange = debounce((evt) => {
  const clickedButton = evt.target;

  if (clickedButton.tagName !== 'BUTTON' || clickedButton.id === currentFilter) {
    return;
  }

  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;

  applyFilter(currentFilter);
}, RERENDER_DELAY);

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;
  showFilters();
  filtersForm.addEventListener('click', onFilterChange);
};

export { initFilters };
