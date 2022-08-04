document.addEventListener('DOMContentLoaded', () => {
  const dataTheme = document.documentElement.getAttribute('data-theme')
  const overlay = document.getElementsByClassName('overlay');
  const navBtns = document.getElementsByClassName('NavButtons')

  console.log(dataTheme)

  const hero = document.getElementById('hero');
  hero.src = `../assets/images/avatar_${dataTheme === 'dark' ? 'dark' : 'light'}.svg`

  const closeImg = document.getElementsByClassName('close');
  // closeImg.forEach(img => img.src = `../assets/icons/close_icon_${dataTheme === 'dark' ? 'dark' : 'light'}.svg`)

  // navBtns[0].addEventListener('click', () => openModal(overlay[0]))

  for (let i = 0; i <= navBtns.length -2; i++) {
    navBtns[i].addEventListener('click', () => openModal(overlay[i]))
  }
  for (let n = 0; n <= closeImg.length - 1; n++) {
    closeImg[n].src = `../assets/icons/close_icon_${dataTheme === 'dark' ? 'dark' : 'light'}.svg`;
    closeImg[n].addEventListener('click', () => closeModal(overlay[n]));
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