import { initEffects, resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showAlert } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
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

const showImagePreview = (file) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    previewImage.src = reader.result;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });
  });

  reader.readAsDataURL(file);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const openForm = () => {
  const file = uploadInput.files[0];

  if (file && file.type.startsWith('image/')) {
    showImagePreview(file);
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  }
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetEffects();
  previewImage.src = 'img/upload-default-image.jpg';
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape' && !hashtagInput.matches(':focus') && !commentInput.matches(':focus')) {
    evt.preventDefault();
    closeForm();
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmitButton();

  try {
    const formData = new FormData(evt.target);
    await sendData(formData);
    closeForm();
    showAlert('Фотография успешно загружена!');
  } catch (err) {
    showAlert(err.message);
  } finally {
    unblockSubmitButton();
  }
};

uploadInput.addEventListener('change', openForm);
cancelButton.addEventListener('click', closeForm);
document.addEventListener('keydown', onEscKeydown);
uploadForm.addEventListener('submit', onFormSubmit);

initEffects();
