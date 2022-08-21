document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementsByClassName('overlay');
  const navBtns = document.getElementsByClassName('NavButtons');
  const downloadBtns = document.getElementsByClassName('download_button')
  const wsTextArea = document.getElementById('ws_contact_message');

  const coloseBtn = document.getElementsByClassName('close');

  for (let i = 0; i <= navBtns.length -1; i++) {
    navBtns[i].addEventListener('click', () => openModal(overlay[i]))
  }
  for (let n = 0; n <= coloseBtn.length - 1; n++) {
    coloseBtn[n].addEventListener('click', () => closeModal(overlay[n]));
  }

  // navBtns[4].addEventListener('click', () => downloadCV())

  downloadBtns[0].addEventListener('click', () => downloadCV('es'))
  downloadBtns[1].addEventListener('click', () => downloadCV('en'))

  wsTextArea.addEventListener('input', function () {
    this.style.height = 'auto'
    this.style.height = `${this.value === "" ? 40 : this.scrollHeight}px`;
  }, false)
})

function openModal (elem, keyCode) {
  elem.style.display = 'flex';
}

function closeModal (elem, keyCode) {
  elem.style.display = "none"
}

function downloadCV(lang, keyCode) {
  const url = `../assets/files/Marcos_Guerrero_CV-${lang}.pdf`;
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Marcos Guerrero CV ${lang.toUpperCase()}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
}