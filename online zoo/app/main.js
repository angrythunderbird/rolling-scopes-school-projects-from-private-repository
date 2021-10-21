//---Theme toogle

const themeToogler = document.querySelector('.switch__input');
let theme = localStorage.getItem('themeDark');
const logoSvg = document.querySelector('.header__logo-svg');
const map = document.querySelector('.map__inner-img');
const arrow = document.querySelector('.arrow');

if (theme == 'true') {
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add('dark');
  logoSvg.src = 'assets/icons/logo-light-header.svg';
  themeToogler.value = 'dark';
  themeToogler.checked = true;
  console.log(1);
}

console.log(theme);
console.log(localStorage);

function toogle() {
  if (themeToogler.value === 'light') {
    themeToogler.value = 'dark';
    logoSvg.src = 'assets/icons/logo-light-header.svg';
    map.style.filter = `invert(100%)`;
    localStorage.setItem('themeDark', 'true');
  } else {
    themeToogler.value = 'light';
    logoSvg.src = 'assets/icons/logo.svg';
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
    console.log(event.target.value);
  }
});

//---Slider-hero

const sliderHero = document.querySelector('.slider__list--hero');
const rangeHero = document.querySelector('.range__slider--hero');
const sliderItemsHero = sliderHero.querySelectorAll('.slider__item--hero');
const rangeHeroVAlue = document.querySelector('.range__value--hero');
const sliderMaskHero = sliderHero.querySelectorAll('.slider__mask--hero');

console.log(sliderMaskHero.length);

function removeMask(index) {
  sliderMaskHero.forEach((el) => {
    el.classList.remove('d-flex');
    el.classList.add('d-none');
  });

  sliderMaskHero[index].classList.remove('d-none');
  sliderMaskHero[index].classList.add('d-flex');
}

removeMask(parseInt(rangeHero.value));

sliderHero.addEventListener('click', e => {
  if (e.target.dataset.index !== undefined) {
    rangeHero.value = e.target.dataset.index;
    setPosition(parseInt(e.target.dataset.index));
    console.log(e.target.dataset.index);
  }
});

rangeHero.addEventListener('input', (e) => {
  if (e.target.value <= e.target.max && e.target.value >= e.target.min) {
    setPosition(parseInt(e.target.value));
  }
});

function setPosition(index) {
  sliderItemsHero.forEach((el) => {
    if (el.classList.contains('slider__item--active')) {
      el.classList.remove('slider__item--active');
    }
    
    const sliderItemsHeroWidth = 186;
    el.style.transform = `translateX(${-(index - 1) * sliderItemsHeroWidth}px)`;
  });

  sliderItemsHero[index].classList.add('slider__item--active');
  rangeHeroVAlue.innerText = `0${index + 1}/`;
  removeMask(index);
}

//---Slider-works
//TODO input reaction
let slideIndex = 0;
const rangeWorksValue = document.querySelector('.range__value--works');

showSlides();

rangeWorksValue.addEventListener('input', (e) => {
  if (e.target.value <= e.target.max && e.target.value >= e.target.min) {
    petsSetPosition(parseInt((e.target.value) * -1228));
  }
});

function showSlides() {
  let i;
  let sliderItemsWorks = document.querySelectorAll('.slider__item--works');
  const rangeWorks = document.querySelector('.range__slider--works');
  for (i = 0; i < sliderItemsWorks.length; i++) {
    sliderItemsWorks[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > sliderItemsWorks.length) {
    slideIndex = 1;
  }
  sliderItemsWorks[slideIndex - 1].style.display = "block";
  
  rangeWorks.value = slideIndex;
  rangeWorksValue.innerText = `0${slideIndex}/`;
  setTimeout(showSlides, 2000);
}

//---Slider-pets

let petsPosition = 0;
const rangePets = document.querySelector('.range__slider--pets');
const rangePetsValue = document.querySelector('.range__value--pets');
const petsItem = document.querySelectorAll('.slider__item--pets');
const petsPrev = document.querySelector('.pets__arrow--left');
const petsNext = document.querySelector('.pets__arrow--right');

petsNext.addEventListener('click', () => {
  petsPosition -= 1228;
  if (petsPosition < -8596) {
    petsPosition = 0;
  }
  petsSetPosition(petsPosition);
  /* console.log(petsPosition); */
});

petsPrev.addEventListener('click', () => {
  petsPosition += 1228;
  if (petsPosition > 0) {
    petsPosition = -8596;
  }
  petsSetPosition(petsPosition);
  /* console.log(petsPosition); */
});

rangePets.addEventListener('input', (e) => {
  if (e.target.value <= e.target.max && e.target.value >= e.target.min) {
    petsSetPosition(parseInt((e.target.value) * -1228));
  }
});

const petsSetPosition = (petsIndex) => {
  rangePets.value = Math.abs(petsIndex / 1228);
  rangePetsValue.innerText = `0${+rangePets.value + 1}/`;
  petsItem.forEach(el => {
    
    el.style.transform = `translateX(${petsIndex}px)`;
  });
  petsPosition = petsIndex;
  /* console.log(petsPosition);
  console.log(rangePets.value); */
};




