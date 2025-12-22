const uploadForm = document.querySelector('.img-upload__form');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');

let currentScale = 100;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const EFFECTS = {
  none: { filter: '', unit: '', min: 0, max: 100, step: 1 },
  chrome: { filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1 },
  sepia: { filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1 },
  marvin: { filter: 'invert', unit: '%', min: 0, max: 100, step: 1 },
  phobos: { filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1 },
  heat: { filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1 }
};

let currentEffect = 'none';

const updateScale = () => {
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
};

const onScaleSmallerClick = () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

const onScaleBiggerClick = () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};

const initSlider = () => {
  if (!noUiSlider) {
    return;
  }

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    connect: 'lower'
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;

    if (currentEffect !== 'none') {
      const effect = EFFECTS[currentEffect];
      const actualValue = (value / 100) * (effect.max - effect.min) + effect.min;
      previewImage.style.filter = `${effect.filter}(${actualValue}${effect.unit})`;
    }
  });
};

const updateSlider = () => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    previewImage.style.filter = '';
    return;
  }

  effectLevel.classList.remove('hidden');

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  });

  const value = 100;
  effectLevelValue.value = value;
  const actualValue = (value / 100) * (effect.max - effect.min) + effect.min;
  previewImage.style.filter = `${effect.filter}(${actualValue}${effect.unit})`;
};

const onEffectChange = (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = evt.target.value;
    updateSlider();
  }
};

const initEffects = () => {
  if (effectLevelSlider && noUiSlider) {
    initSlider();
  }

  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  effectsList.addEventListener('change', onEffectChange);

  updateScale();
  updateSlider();
};

const resetEffects = () => {
  currentScale = 100;
  currentEffect = 'none';
  updateScale();

  const noneEffect = uploadForm.querySelector('#effect-none');
  if (noneEffect) {
    noneEffect.checked = true;
  }

  updateSlider();
};

export { initEffects, resetEffects };
