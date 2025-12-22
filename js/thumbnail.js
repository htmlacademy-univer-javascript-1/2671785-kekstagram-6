import { openFullscreen } from './fullscreen.js';

const createThumbnail = (photo) => {
  const template = document.querySelector('#picture');
  const thumbnail = template.content.querySelector('.picture').cloneNode(true);

  const img = thumbnail.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullscreen(photo);
  });

  return thumbnail;
};

const renderThumbnails = (photos, container) => {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};

export { renderThumbnails };
