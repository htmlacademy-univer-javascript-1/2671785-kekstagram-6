const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const body = document.body;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text'
});

const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.toLowerCase().split(' ').filter(Boolean);

  if (hashtags.length > 5) {
    return false;
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    if (!hashtagRegex.test(hashtag)) {
      return false;
    }

    if (hashtags.indexOf(hashtag) !== i) {
      return false;
    }
  }

  return true;
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(hashtagInput, validateHashtags, 'Некорректный хэш-тег');
pristine.addValidator(commentInput, validateComment, 'Комментарий не более 140 символов');

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape' && !hashtagInput.matches(':focus') && !commentInput.matches(':focus')) {
    evt.preventDefault();
    closeForm();
  }
};

uploadInput.addEventListener('change', openForm);
cancelButton.addEventListener('click', closeForm);
document.addEventListener('keydown', onEscKeydown);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
