
const nextBtn = document.querySelector('.btn-next');
const filters = document.querySelectorAll('label');
const resetBtn = document.querySelector('.btn-reset');
const targetImage = document.querySelector('.main-img');
const uploadBtn = document.querySelector('.btn-load--input');
const downloadBtn = document.querySelector('.btn-save');
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const filtersArr = [];

filters.forEach(el => {
  filtersArr.push(el);
});

/* console.log(filtersArr); */

function fullscreen() {
  const fullscreenBtn = document.querySelector('.openfullscreen');

  fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreen) {
      document.exitFullscreen();
    }

    document.documentElement.requestFullscreen();
  });
}

function changePicture() {
  let pictureIndex = 1;

  nextBtn.addEventListener('click', () => {
    const currTime = new Date().getHours();
    let imgLinkTemplate;
    let currPart;

    if (6 <= currTime && currTime < 12) {
      currPart = 'morning';
    }
    if (12 <= currTime && currTime < 18) {
      currPart = 'day';
    }
    if (18 <= currTime && currTime < 24) {
      currPart = 'evening';
    }
    if (0 <= currTime && currTime < 6) {
      currPart = 'night';
    }

    if ((String(pictureIndex)).length === 1) {
      imgLinkTemplate = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currPart}/0${pictureIndex}.jpg`;
    } else {
      imgLinkTemplate = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currPart}/${pictureIndex}.jpg`;
    }

    targetImage.setAttribute('src', imgLinkTemplate);

    if (pictureIndex === 20) {
      pictureIndex = 0;
    }
    pictureIndex++;
  });
}

function handleInputsValue() {
  filters.forEach(el => {
    const input = el.querySelector('input');
    const result = el.querySelector('output');
    const filterName = el.getAttribute('filter-name');

    input.addEventListener('input', () => {

      result.value = input.value;

      switch (filterName) {
        case "blur":
          targetImage.style.setProperty(`--${filterName}`, `${result.value}px`);
          break;
        case "hue":
          targetImage.style.setProperty(`--${filterName}`, `${result.value}deg`);
          break;
        default:
          targetImage.style.setProperty(`--${filterName}`, `${result.value}%`);
      }
    });
  });
}

function loadPicture() {
  uploadBtn.addEventListener('change', readFile, false);

  function readFile() {
    let uploadImg = this.files[0];

    let reader = new FileReader();

    reader.readAsDataURL(uploadImg);

    reader.onload = function () {
      const uploadUrl = URL.createObjectURL(uploadImg);
      targetImage.setAttribute('src', uploadUrl);
    };

    uploadBtn.value = null;
  }
}

function resetFilters() {
  resetBtn.addEventListener('click', () => {
    filters.forEach(el => {
      const input = el.querySelector('input');
      const result = el.querySelector('output');

      input.value = input.defaultValue;
      result.value = input.defaultValue;
      targetImage.style = 'unset';
    });
  });
}

function drawImage() {
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = targetImage.src;
  /* console.log(img.src); */
  img.onload = function () {

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = `blur(${filtersArr[0].children[0].value}px) invert(${filtersArr[1].children[0].value}%)
  sepia(${filtersArr[2].children[0].value}%) saturate(${filtersArr[3].children[0].value}%)
   hue-rotate(${filtersArr[4].children[0].value}deg)`;
    /* console.log(ctx.filter); */
    ctx.drawImage(img, 0, 0);
    let downloadTempLink = document.createElement('a');
    downloadTempLink.download = 'download.png';
    downloadTempLink.href = canvas.toDataURL();
    downloadTempLink.click();
    downloadTempLink.delete;
  };
}

downloadBtn.addEventListener('click', function () {
  drawImage();
});

fullscreen();
changePicture();
handleInputsValue();
loadPicture();
resetFilters();
/* downloadImg(); */