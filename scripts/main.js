import enlng from './langs/en.json' assert { type: 'json'}
import eslng from './langs/es.json' assert { type: 'json'}

console.log(JSON.parse(JSON.stringify(eslng)))

const es = {
  GREETINGS: ['Hola Mundo!', 'Soy Marcos Guerrero', 'Desarrollador Front End', 'Desarrollador Movil'],
  BUTTONS: ['About Me', 'Tecnologías && lenguajes', 'Experiencia', 'Contacto', 'Descargar CV']
};

const en = {
  GREETINGS: ['Hello World!', "I'm Marcos Guerrero", 'Front End Developer', 'Mobile Developer'],
  BUTTONS: ['About Me', 'Technologies && languages', 'Experience', 'Contact', 'Download CV']
};

const getLang =
  localStorage.getItem('language') === 'es' || navigator?.languages[0] === 'es' || navigator.language === 'es'
    ? 'es'
    : localStorage.getItem('language') === 'en-US' || navigator?.languages[0] === 'en-US' || navigator.language === 'en-US'
    ? 'en'
    : 'en';

const lang = getLang === 'es' ? es : en;

const carouselText = [
  { text: lang.GREETINGS[0] },
  { text: lang.GREETINGS[1] },
  { text: lang.GREETINGS[2] },
  { text: lang.GREETINGS[3] },
];

// https://medium.com/front-end-weekly/how-to-create-typing-effect-in-css-and-js-3252dd807f0a

document.addEventListener('DOMContentLoaded', async function () {

  const dataTheme = document.documentElement.getAttribute('data-theme')
  const main = document.getElementsByTagName('main')[0];
  main.style.display = 'block';

  // clear the innerhtml in noscript if javascript is enable
  const ns = document.getElementsByTagName('noscript')[0];
  ns.innerText = 'you need to enable javascript to continue browsing this site 🤒';

  // check the browser color-scheme
  const el = document.getElementsByClassName('slider')[0];

  if (!localStorage.theme) {
    if (window && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      el.setAttribute('aria-checked', 'true');
    }
  } else {
    document.documentElement.setAttribute('data-theme', localStorage.theme);
    el.setAttribute('aria-checked', String(localStorage.theme === 'dark'));
  }

  // toggle theme function

  el.addEventListener('click', () => handleCheck());
  el.addEventListener('keydown', (e) => handleCheck(e.keyCode));

  function handleCheck(keyCode) {
    const checked = el.getAttribute('aria-checked');

    const spaceKeyCode = 32;
    if (keyCode && keyCode !== spaceKeyCode) {
      return;
    } else if (checked === 'true') {
      el.setAttribute('aria-checked', 'false');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.theme = 'light';
    } else {
      el.setAttribute('aria-checked', 'true');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.theme = 'dark';
    }
  }

  // set flag
  const flag = document.getElementById('flag-selected');
  const lng = document.getElementById('lang-selected');
  const flagpath = `../assets/icons/${getLang === 'es' ? 'es_flag' : 'en_flag'}.svg`;
  flag.src = flagpath;

  lng.innerText = getLang === 'es' ? 'ES' : 'EN';

  const flagBtn = document.getElementById('flag-select-button');
  flagBtn.addEventListener('click', () => handleCheckflag());
  flagBtn.addEventListener('keydown', (e) => handleCheckflag(e));

  function handleCheckflag(keyCode) {
    const spaceKeyCode = 32;
    if (keyCode && keyCode !== spaceKeyCode) {
      return;
    } else if (flagBtn.getAttribute('aria-expanded')) {
      flagBtn.removeAttribute('aria-expanded');
      return;
    } else {
      flagBtn.setAttribute('aria-expanded', 'true');
      return;
    }
  }

  const flagItem = document.getElementsByClassName('lang-item');
  flagItem[0].addEventListener('click', () => setLang());
  flagItem[0].addEventListener('keydown', (e) => setLang('en', e));

  flagItem[1].addEventListener('click', () => setLang('es'));
  flagItem[1].addEventListener('keydown', (e) => setLang('es', e));

  function setLang(lng, keyCode) {
    const spaceKeyCode = 32;
    if (keyCode && keyCode !== spaceKeyCode) {
      return;
    } else if (lng === 'es') {
      localStorage.language = 'es';
      flagBtn.removeAttribute('aria-expanded');
      window.location.reload();
    } else {
      localStorage.language = 'en';
      flagBtn.removeAttribute('aria-expanded');
      window.location.reload();
    }
  }

  const fText = document.getElementById('feature-text');
  carousel(carouselText, fText);
});

async function typeSentence(sentence, eleRef, delay = 100) {
  const letters = sentence.split('');
  let i = 0;
  while (i < letters.length) {
    await waitForMs(delay);
    // eleRef.appendChild(letters[i]);
    eleRef.insertAdjacentHTML('beforeend', letters[i]);
    i++;
  }
  return;
}

async function deleteSentence(eleRef) {
  const sentence = eleRef.innerHTML;
  const letters = sentence.split('');
  let i = 0;
  while (letters.length > 0) {
    await waitForMs(40);
    letters.pop();
    eleRef.innerHTML = letters.join('');
  }
}

async function carousel(carouselList, eleRef) {
  var i = 0;
  while (true) {
    updateFontColor(eleRef, carouselList[i].color);
    await typeSentence(carouselList[i].text, eleRef);
    await waitForMs(1500);
    await deleteSentence(eleRef);
    await waitForMs(500);
    i++;
    if (i >= carouselList.length) {
      i = 0;
    }
  }
}

function updateFontColor(eleRef, color) {
  eleRef.style.color = color ?? undefined;
}

function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
