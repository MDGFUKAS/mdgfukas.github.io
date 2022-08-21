const en = {
  GREETINGS: ['Hello World!', "I'm Marcos Guerrero", 'Front End Developer', 'Mobile Developer'],
  BUTTONS: ['About Me', 'Technologies && languages', 'Experience', 'Contact', 'Download CV'],
  ABOUT_ME:
    "Hello! I am Marcos, a self-taught and quite dedicated developer with +2 years of experience, I am focused on developing web and mobile applications with javascript, I am currently working at <a href='https://www.linkedin.com/company/neurons-agency/' rel='noopener noreferer' target='_blank'>@neurons_agency</a> as a mid-senior Front-end developer with react and javascript",
  ROLE: 'Front-end Developer',
  CONTACT_ME: {
    EMAIL: {
      labels: ['Your Name', 'Email', 'Why do you contact me?'],
      send: 'Send',
      subject: 'Hi! I need comunication with you.',
      message: (name, email, message) =>
        `Hello Marcos! \n\n${name} contact you from ${email} \n\nAnd says the following: \n${message || '(No body message)'}`,
    },
    WS: {
      title: 'Write your message',
      placeholder: 'Tell me anything!',
    },
    BUTTONS: ['Or write me on WhatsApp 👉', 'Or send me a message 👉'],
    warning: 'Missing Fields',
  },
  DOWNLOAD_CV: {
    title: 'Download CV',
    btnEs: 'Download (ES)',
    btnEn: 'Download (EN)',
  },
  FOOTER: {
    title: 'My Networks',
  },
};

const es = {
  GREETINGS: ['Hola Mundo!', 'Soy Marcos Guerrero', 'Desarrollador Front End', 'Desarrollador Movil'],
  BUTTONS: ['About Me', 'Tecnologías && lenguajes', 'Experiencia', 'Contacto', 'Descargar CV'],
  ABOUT_ME:
    "¡Hola! Soy Marcos, un desarrollador autodidacta y bastante dedicado cuento con +2 años de experiencia, estoy enfocado en desarrollar aplicaciones web y moviles con javascript, actualmente me encuentro trabajando en <a href='https://www.linkedin.com/company/neurons-agency/' rel='noopener noreferer' target='_blank'>@neurons_agency</a> como desarrollador Front-end semi-senior con react y javascript",
  ROLE: 'Desarrollador Front-end',
  CONTACT_ME: {
    EMAIL: {
      labels: ['Tu Nombre', 'Correo', '¿Por que me contactas?'],
      send: 'Enviar',
      subject: '¡Hola! Necesito comunicarme contigo.',
      message: (name, email, message) =>
        `Hola Marcos! \n\n${name} te contacta desde ${email} \n\ny dice lo siguiente: \n${message || '(Mensaje sin cuerpo)'}`,
    },
    WS: {
      title: 'Escribe tu mensaje',
      placeholder: '¡Dime lo que sea!',
    },
    BUTTONS: ['O escribeme por Whatsapp 👉', 'O enviame un mensaje 👉'],
    warning: 'Debe llenar los campos',
  },
  DOWNLOAD_CV: {
    title: 'Descargar CV',
    btnEs: 'Descargar (ES)',
    btnEn: 'Descargar (EN)',
  },
  FOOTER: {
    title: 'Mis Redes',
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
  const netImg = document.getElementsByClassName('networks_img');
  const closeBtn = document.getElementsByClassName('close');

  if (!localStorage.theme) {
    if (window && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      el.setAttribute('aria-checked', 'true');
      localStorage.theme = 'dark';
      hero.src = '../assets/images/avatar_dark.svg';
      netImg[0].src = '../assets/icons/linkedin_light.svg';
      netImg[1].src = '../assets/icons/github_light.svg';
      for (let i = 0; i <= closeBtn.length - 1; i++) {
        closeBtn[i].firstElementChild.setAttribute('src', '../assets/icons/close_icon_dark.svg');
      }
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#37A71F');
    }
  } else {
    document.documentElement.setAttribute('data-theme', localStorage.theme);
    hero.src = `../assets/images/avatar_${localStorage.theme === 'dark' ? 'dark' : 'light'}.svg`;
    netImg[0].src = `../assets/icons/linkedin_${localStorage.theme === 'dark' ? 'dark' : 'light'}.svg`;
    netImg[1].src = `../assets/icons/github_${localStorage.theme === 'dark' ? 'dark' : 'light'}.svg`;
    for (let i = 0; i <= closeBtn.length - 1; i++) {
      closeBtn[i].firstElementChild.setAttribute(
        'src',
        `../assets/icons/close_icon_${localStorage.theme === 'dark' ? 'dark' : 'light'}.svg`
      );
    }
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', `${localStorage.theme === 'dark' ? '#37A71F' : '#167F00'}`);
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
    document.querySelector('meta[name="theme-color"]').setAttribute('content', `${dataTheme === 'dark' ? '#37A71F' : '#167F00'}`);
  }

  // Change language Function

  const flag = document.getElementById('flag-selected');
  const lng = document.getElementById('lang-selected');
  flag.src = `../assets/icons/${getLang === 'es' ? 'es_flag' : 'en_flag'}.svg`;

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
  flagItem[0].addEventListener('click', () => (getLang === 'es' ? setLang() : void 0));
  flagItem[0].addEventListener('keydown', (e) => (getLang === 'es' ? setLang('en', e) : void 0));

  flagItem[1].addEventListener('click', () => (getLang === 'es' ? void 0 : setLang('es')));
  flagItem[1].addEventListener('keydown', (e) => (getLang === 'es' ? void 0 : setLang('es', e)));

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

  // Home Navbar translations

  const navBtns = document.getElementsByClassName('NavButtons');
  for (let i = 0; i <= navBtns.length - 1; i++) {
    navBtns[i].innerText = lang.BUTTONS[i];
  }

  // About Me

  const aboutMe = document.getElementById('about-me');
  aboutMe.innerHTML = lang.ABOUT_ME;

  // Technologies

  const techTitle = document.getElementsByClassName('modals-title');
  techTitle[0].innerText = lang.BUTTONS[1];
  techTitle[1].innerText = lang.BUTTONS[2];

  // Experience

  const workRole = document.getElementsByClassName('work-role');
  for (let i = 0; i <= workRole.length - 1; i++) {
    workRole[i].innerText = lang.ROLE;
  }

  // Contact

  const swap = document.getElementsByClassName('swap_button');
  swap[0].addEventListener('click', () => {
    document.getElementsByClassName('contact_form')[0].removeAttribute('aria-expanded');
    document.getElementsByClassName('contact_ws')[0].setAttribute('aria-expanded', 'true');
  });
  swap[1].addEventListener('click', () => {
    document.getElementsByClassName('contact_ws')[0].removeAttribute('aria-expanded');
    document.getElementsByClassName('contact_form')[0].setAttribute('aria-expanded', 'true');
  });

  swap[0].setAttribute('data-message', lang.CONTACT_ME.BUTTONS[0]);
  swap[1].setAttribute('data-message', lang.CONTACT_ME.BUTTONS[1]);

  // Contact Form Email

  const msgLabel = document.getElementsByClassName('message_label');
  for (let i = 0; i <= msgLabel.length - 1; i++) {
    msgLabel[i].innerText = lang.CONTACT_ME.EMAIL.labels[i];
  }

  const sendBtn = document.getElementsByClassName('send_button');
  sendBtn[0].innerText = lang.CONTACT_ME.EMAIL.send;

  sendBtn[0].addEventListener('click', sendEmail);

  function sendEmail() {
    const name = document.getElementById('contact_name').value;
    const email = document.getElementById('contact_email').value;
    const message = document.getElementById('contact_message').value;

    if (name && email) {
      const formatedMessage = lang.CONTACT_ME.EMAIL.message(name, email, message);
      sendEmailFinale(formatedMessage);
    } else {
      alert(lang.CONTACT_ME.warning);
    }
  }

  function sendEmailFinale(message) {
    const myEmail = 'mguerrerofinol';
    const subject = '';
    let url = `mailto:${myEmail}@gmail.com?cc=${''}&subject=${subject}&body=${message}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  // Contact Send Whatsapp

  const sendWsBtn = document.getElementsByClassName('send_ws_button');
  const wsTitle = document.getElementById('ws_title_msg');
  const wsTextArea = document.getElementById('ws_contact_message');

  wsTitle.innerHTML = lang.CONTACT_ME.WS.title;
  wsTextArea.setAttribute('placeholder', lang.CONTACT_ME.WS.placeholder);

  sendWsBtn[0].addEventListener('click', () => proccesMessage());

  function proccesMessage() {
    const message = wsTextArea.value;

    if (message) {
      sendWhatsAppMsg(message);
    } else {
      alert(lang.CONTACT_ME.warning);
    }
  }

  function sendWhatsAppMsg(msg) {
    const formatedMsg = msg.replace(/\s+/g, '%20');
    const myNum = '584246773090';
    const url = `https://wa.me/${myNum}?text=${formatedMsg}`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  // Download CV

  const downloadTitle = document.getElementById('download-title');
  downloadTitle.innerHTML = lang.DOWNLOAD_CV.title;

  const downloadBtns = document.getElementsByClassName('download_button');
  downloadBtns[0].innerHTML = lang.DOWNLOAD_CV.btnEs;
  downloadBtns[1].innerHTML = lang.DOWNLOAD_CV.btnEn;

  // Footer

  const footerTitle = document.getElementById('footer_title');
  footerTitle.innerHTML = lang.FOOTER.title;

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
