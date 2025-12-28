const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = (templateId, closeButtonClass) => {
  const template = document.querySelector(`#${templateId}`);
  const messageElement = template.content.cloneNode(true).querySelector(`.${templateId}`);
  const closeButton = messageElement.querySelector(closeButtonClass);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentClick = (evt) => {
    if (!messageElement.contains(evt.target)) {
      closeMessage();
    }
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onCloseButtonClick = () => {
    closeMessage();
  };

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(messageElement);
};

const showSuccess = () => {
  showMessage('success', '.success__button');
};

const showError = () => {
  showMessage('error', '.error__button');
};

export { showSuccess, showError };
