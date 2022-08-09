const en = {
  GREETINGS: ['Hello World!', "I'm Marcos Guerrero", 'Front End Developer', 'Mobile Developer'],
  BUTTONS: ['About Me', 'Technologies && languages', 'Experience', 'Contact', 'Download CV'],
  ABOUT_ME:
    "Hello! I am Marcos, a self-taught and quite dedicated developer with +2 years of experience, I am focused on developing web and mobile applications with javascript, I am currently working at <a href='https://www.linkedin.com/company/neurons-agency/' rel='noopener noreferer' target='_blank'>@neurons_agency</a> as a mid-senior Front-end developer with react and javascript",
  ROLE: 'Front-end Developer',
  CONTACT_ME: {
    labels: ['Your Name', 'Email', 'Why do you contact me?'],
    send: 'Send',
    subject: 'Hi! I need comunication with you.',
    message: (name, email, message) =>
      `Hello Marcos! \n\n${name} contact you from ${email} \n\nAnd says the following: \n${message || '(No body message)'}`,
  },
};

const es = {
  GREETINGS: ['Hola Mundo!', 'Soy Marcos Guerrero', 'Desarrollador Front End', 'Desarrollador Movil'],
  BUTTONS: ['About Me', 'Tecnologías && lenguajes', 'Experiencia', 'Contacto', 'Descargar CV'],
  ABOUT_ME:
    "¡Hola! Soy Marcos, un desarrollador autodidacta y bastante dedicado cuento con +2 años de experiencia, estoy enfocado en desarrollar aplicaciones web y moviles con javascript, actualmente me encuentro trabajando en <a href='https://www.linkedin.com/company/neurons-agency/' rel='noopener noreferer' target='_blank'>@neurons_agency</a> como desarrollador Front-end semi-senior con react y javascript",
  ROLE: 'Desarrollador Front-end',
  CONTACT_ME: {
    labels: ['Tu Nombre', 'Correo', '¿Por que me contactas?'],
    send: 'Enviar',
    subject: '¡Hola! Necesito comunicarme contigo.',
    message: (name, email, message) =>
      `Hola Marcos! \n\n${name} te contacta desde ${email} \n\ny dice lo siguiente: \n${message || '(Mensaje sin cuerpo)'}`,
  },
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
  const main = document.getElementsByTagName('main')[0];
  main.style.display = 'block';

  // clear the innerhtml in noscript if javascript is enable
  const ns = document.getElementsByTagName('noscript')[0];
  ns.innerText = 'you need to enable javascript to continue browsing this site 🤒';

  // check the browser color-scheme
  const el = document.getElementsByClassName('slider')[0];
  const hero = document.getElementById('hero');
  const closeBtn = document.getElementsByClassName('close');

  if (!localStorage.theme) {
    if (window && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      el.setAttribute('aria-checked', 'true');
      localStorage.theme = 'dark';
      hero.src = '../assets/images/avatar_dark.svg';
      for (let i = 0; i <= closeBtn.length - 1; i++) {
        closeBtn[i].firstElementChild.setAttribute('src', '../assets/icons/close_icon_dark.svg');
      }
    }
  } else {
    document.documentElement.setAttribute('data-theme', localStorage.theme);
    hero.src = `../assets/images/avatar_${localStorage.theme === 'dark' ? 'dark' : 'light'}.svg`;
    for (let i = 0; i <= closeBtn.length - 1; i++) {
      closeBtn[i].firstElementChild.setAttribute(
        'src',
        `../assets/icons/close_icon_${localStorage.theme === 'dark' ? 'dark' : 'light'}.svg`
      );
    }
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

    const dataTheme = document.documentElement.getAttribute('data-theme');

    hero.src = `../assets/images/avatar_${dataTheme === 'dark' ? 'dark' : 'light'}.svg`;
    for (let i = 0; i <= closeBtn.length - 1; i++) {
      closeBtn[i].firstElementChild.setAttribute(
        'src',
        `../assets/icons/close_icon_${dataTheme === 'dark' ? 'dark' : 'light'}.svg`
      );
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

  const navBtns = document.getElementsByClassName('NavButtons');
  for (let i = 0; i <= navBtns.length - 1; i++) {
    navBtns[i].innerText = lang.BUTTONS[i];
  }

  const aboutMe = document.getElementById('about-me');
  aboutMe.innerHTML = lang.ABOUT_ME;

  const techTitle = document.getElementsByClassName('modals-title');
  techTitle[0].innerText = lang.BUTTONS[1];
  techTitle[1].innerText = lang.BUTTONS[2];

  const workRole = document.getElementsByClassName('work-role');
  for (let i = 0; i <= workRole.length - 1; i++) {
    workRole[i].innerText = lang.ROLE;
  }

  // const swap = document.getElementsByClassName('swap_button');
  // swap[0].addEventListener('click', () => {
  //   document.getElementsByClassName('contact_form')[0].removeAttribute('aria-expanded')
  //   document.getElementsByClassName('contact_ws')[0].setAttribute('aria-expanded', 'true')
  // })
  // swap[1].addEventListener('click', () => {
  //   document.getElementsByClassName('contact_ws')[0].removeAttribute('aria-expanded')
  //   document.getElementsByClassName('contact_form')[0].setAttribute('aria-expanded', 'true')
  // })

  const msgLabel = document.getElementsByClassName('message_label');
  for (let i = 0; i <= msgLabel.length - 1; i++) {
    msgLabel[i].innerText = lang.CONTACT_ME.labels[i];
  }

  const sendBtn = document.getElementsByClassName('send_button');
  sendBtn[0].innerText = lang.CONTACT_ME.send;

  sendBtn[0].addEventListener('click', sendEmail)

  function sendEmail () {
    const name = document.getElementById('contact_name').value;
    const email = document.getElementById('contact_email').value;
    const message = document.getElementById('contact_message').value;

    if (name && email) {
      const formatedMessage = lang.CONTACT_ME.message(name, email, message);
      sendEmailFinale(formatedMessage)
    } else {
      alert('missing fields')
    }
  };

  function sendEmailFinale(message) {
    const myEmail = 'mguerrerofinol';
    const subject = '';
    let url = `mailto:${myEmail}@gmail.com?cc=${''}&subject=${subject}&body=${message}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click()
    link.parentNode.removeChild(link)
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
