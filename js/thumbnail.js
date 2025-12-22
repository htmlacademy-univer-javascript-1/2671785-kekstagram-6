// Функция создания миниатюры
const createThumbnail = (photo) => {
  // Находим шаблон
  const pictureTemplate = document.querySelector('#picture').content;
  const thumbnail = pictureTemplate.querySelector('.picture').cloneNode(true);

  // Заполняем данные
  const img = thumbnail.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  return thumbnail;
};

// Функция отрисовки всех миниатюр
const renderThumbnails = (photos, container) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};

export { renderThumbnails };
