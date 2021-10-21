//---Theme toogle

const themeToogler = document.querySelector('.switch__input');
const logoSvg = document.querySelector('.header__logo-svg');
const map = document.querySelector('.map__inner-img');
let theme = localStorage.getItem('themeDark');

if (theme == 'true') {
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add('dark');
  themeToogler.value = 'dark';
  themeToogler.checked = true;
  logoSvg.src = '../../assets/icons/logo-light-header.svg';
  map.style.filter = `invert(100%)`;
  /* console.log(1); */
}

function toogle() {
  if (themeToogler.value === 'light') {
    themeToogler.value = 'dark';
    logoSvg.src = '../../assets/icons/logo-light-header.svg';
    map.style.filter = `invert(100%)`;
    localStorage.setItem('themeDark', 'true');
  } else {
    themeToogler.value = 'light';
    logoSvg.src = '../../assets/icons/logo.svg';
    map.style.filter = `invert(0%)`;
    localStorage.setItem('themeDark', 'false');
  }
  /* console.log(themeToogler.value); */
}

themeToogler.addEventListener('change', (event) => {
  toogle();

  if (event.target.nodeName === 'INPUT') {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(event.target.value);
  }
});

//---Slider-map

const sliderMap = document.querySelector('.slider__list--world-map');
const rangeMap = document.querySelector('.range__slider--world-map');
const sliderItemsMap = sliderMap.querySelectorAll('.slider__item--world-map');
const sliderImgMap = sliderMap.querySelectorAll('.slider__animal--world-map');
const rangeMapVAlue = document.querySelector('.range__value--world-map');
const mapLeft = document.querySelector('.world-map__arrow--left');
const mapRight = document.querySelector('.world-map__arrow--right');
const mapLinks = document.querySelectorAll('.map__btn-link');
const mapMainLink = document.querySelector('.landing-map__link');

mapLeft.addEventListener('click', () => {
  let prevPos = +rangeMap.value - 1;
  if (prevPos < 0) {
    prevPos = 7;
  }
  rangeMap.value = prevPos;
  setPosition(prevPos);
});

mapRight.addEventListener('click', () => {
  let nextPos = +rangeMap.value + 1;
  if (nextPos > 7) {
    nextPos = 0;
  }
  rangeMap.value = nextPos;
  setPosition(nextPos);
});

sliderMap.addEventListener('click', e => {
  const currentEl = e.target.parentNode;
  if (currentEl.dataset.index !== undefined) {
    rangeMap.value = currentEl.dataset.index;
    setPosition(parseInt(currentEl.dataset.index));
    /* console.log(currentEl.dataset.index); */
  }
});

rangeMap.addEventListener('input', e => {
  if (e.target.value <= e.target.max && e.target.value >= e.target.min) {
    setPosition(parseInt(e.target.value));
  }
});

removePinHover(parseInt(rangeMap.value));

mapLinks.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    currentPin = parseInt(el.dataset.number);
    mapMainLink.href = el.href;
    setPosition(currentPin);
  });
});



function removePinHover(index) {
  mapLinks.forEach((el) => {
    if (parseInt(el.dataset.number) === index) {
      el.classList.add('map__btn-link--active');
      mapMainLink.href = el.href;
    } else {
      el.classList.remove('map__btn-link--active');
    }
  });
}

function setPosition(index) {
  sliderItemsMap.forEach((el) => {
    if (el.classList.contains('slider__item--round')) {
      el.classList.remove('slider__item--round');
    }
    if (el.firstElementChild.classList.contains('slider__gradient--show')) {
      el.firstElementChild.classList.remove('slider__gradient--show');
    }
  });
  
  removePinHover(index);
  sliderItemsMap[index].classList.add('slider__item--round');
  sliderItemsMap[index].firstElementChild.classList.add('slider__gradient--show');
  rangeMapVAlue.innerText = `0${index + 1}/`;
  
}

