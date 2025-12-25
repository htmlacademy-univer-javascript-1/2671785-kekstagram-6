const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;
const commentsList = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let currentPhoto = null;
let shownComments = 0;
const COMMENTS_PER_PAGE = 5;

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return commentElement;
};

const showCommentsPage = () => {
  const commentsToShow = currentPhoto.comments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);

  commentsToShow.forEach((comment) => {
    commentsList.appendChild(createComment(comment));
  });

  shownComments += commentsToShow.length;

  commentsCount.innerHTML = `${shownComments} из <span class="comments-count">${currentPhoto.comments.length}</span> комментариев`;

  if (shownComments >= currentPhoto.comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoaderClick = () => {
  showCommentsPage();
};

const openFullscreen = (photo) => {
  currentPhoto = photo;
  shownComments = 0;

  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__img img').alt = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  commentsList.innerHTML = '';

  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  showCommentsPage();

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeFullscreen = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  currentPhoto = null;
  shownComments = 0;
};

closeButton.addEventListener('click', closeFullscreen);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    closeFullscreen();
  }
});

export { openFullscreen };
