//---Theme toogle

const themeToogler = document.querySelector('.switch__input');
const logoSvg = document.querySelector('.header__logo-svg');
let theme = localStorage.getItem('themeDark');

if (theme == 'true') {
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add('dark');
  themeToogler.value = 'dark';
  themeToogler.checked = true;
  logoSvg.src = '../../../assets/icons/logo-light-header.svg';
}

function toogle() {
  if (themeToogler.value === 'light') {
    themeToogler.value = 'dark';
    logoSvg.src = '../../../assets/icons/logo-light-header.svg';
    localStorage.setItem('themeDark', 'true');
  } else {
    themeToogler.value = 'light';
    logoSvg.src = '../../../assets/icons/logo.svg';
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

//---Video-changer

const smallIframe = document.querySelectorAll('.zoos__video-mask');
const mainIframe = document.querySelector('.zoos__video-main');
let tempLink = '';
smallIframe.forEach((item) => {
  item.addEventListener('click', () => {
    /* console.log(item.previousElementSibling); */
    tempLink = item.previousElementSibling.src;
    item.previousElementSibling.src = mainIframe.src;
    mainIframe.src = tempLink;
  });
});