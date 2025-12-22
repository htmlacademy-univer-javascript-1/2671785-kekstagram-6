import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnail.js';

// Генерируем данные
const photos = generatePhotos();

// Находим контейнер для миниатюр
const picturesContainer = document.querySelector('.pictures');

// Отрисовываем миниатюры
renderThumbnails(photos, picturesContainer);
