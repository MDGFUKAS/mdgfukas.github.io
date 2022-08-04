document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementsByClassName('overlay');
  const navBtns = document.getElementsByClassName('NavButtons');

  const coloseBtn = document.getElementsByClassName('close');

  for (let i = 0; i <= navBtns.length -2; i++) {
    navBtns[i].addEventListener('click', () => openModal(overlay[i]))
  }
  for (let n = 0; n <= coloseBtn.length - 1; n++) {
    coloseBtn[n].addEventListener('click', () => closeModal(overlay[n]));
  }
})

function openModal (elem, keyCode) {
  elem.style.display = 'flex';
}

function closeModal (elem, keyCode) {
  elem.style.display = "none"
}

function downloadCV() {
  const url = '../assets/files/Marcos_Guerrero_CV.pdf';
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Marcos Guerrero CV.pdf');
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
}