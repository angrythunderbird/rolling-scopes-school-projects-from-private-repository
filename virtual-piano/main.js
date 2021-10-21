const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
let keyPush = false;
const notesBtn = document.querySelector('.btn-notes');
const lettersBtn = document.querySelector('.btn-letters');
const fullScrBtn = document.querySelector('.fullscreen');

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

function pianoPlay(element) {
  element.classList.add('piano-key-active');
  const note = element.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
}

piano.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('piano-key')) {
    pianoKeys.forEach((item) => {
      if (item.classList.contains('piano-key-active')) {
        item.classList.remove('piano-key-active');
      }
    });
    keyPush = true;
    pianoPlay(event.target);
  }
});

document.addEventListener('mouseup', (event) => {
  if (event.target.classList.contains('piano-key-active')) {
    event.target.classList.remove('piano-key-active');
  }
  keyPush = false;
});

document.addEventListener('mouseover', (event) => {
  if (keyPush === true) {
    pianoKeys.forEach((item) => {
      if (item.classList.contains('piano-key-active')) {
        item.classList.remove('piano-key-active');
      }
    });
    pianoPlay(event.target);
  }
});

document.addEventListener('keydown', (event) => {
  const currentButton = String(event.code[3]);
  pianoKeys.forEach((item) => {
    if (currentButton === item.getAttribute('data-letter')) {
      pianoPlay(item);
    }
  });
});

document.addEventListener('keyup', (event) => {
  const currentButton = String(event.code[3]);
  pianoKeys.forEach((item) => {
    if (currentButton === item.getAttribute('data-letter')) {
      item.classList.remove('piano-key-active');
    }
  });
});

notesBtn.addEventListener('click', (event) => {
  notesBtn.classList.add('btn-active');
  lettersBtn.classList.remove('btn-active');
  pianoKeys.forEach(item => {
    item.classList.remove('piano-key-letter');
  });
});

lettersBtn.addEventListener('click', (event) => {
  lettersBtn.classList.add('btn-active');
  notesBtn.classList.remove('btn-active');
  pianoKeys.forEach(item => {
    item.classList.add('piano-key-letter');
  });
});

fullScrBtn.addEventListener('click', (evt) => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});