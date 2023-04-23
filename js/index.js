import keyboardKeys from './keyboardKeys.js';
import keyboardEn from './keyboardEn.js';
import keyboardRu from './keyboardRu.js';

// document.onkeydown = (e) => {
//   console.log('e.key:', e.key);
//   console.log('e.code:', e.code);
// };

// document.addEventListener('mousedown', (e) => {
//   console.log(e.target);
// });

let lang = 'en';
const keyPressed = [];

const body = document.querySelector('body');

function createBodyTemplate() {
  const header = document.createElement('header');
  header.classList.add('header');
  const h1 = document.createElement('h1');
  h1.classList.add('header__title');
  h1.textContent = 'Virtual keyboard';
  header.appendChild(h1);
  body.append(header);

  const main = document.createElement('main');
  main.classList.add('keyboard');
  const textarea = document.createElement('textarea');
  textarea.classList.add('keyboard__textarea');
  main.appendChild(textarea);
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard__keys_wrapper');
  main.appendChild(keyboardWrapper);
  body.append(main);

  const footer = document.createElement('footer');
  footer.classList.add('footer');
  const desc = document.createElement('p');
  desc.classList.add('footer__description');
  desc.textContent = 'Клавиатура создана в операционной системе Windows';
  const keyboardLang = document.createElement('p');
  keyboardLang.classList.add('footer__lang');
  keyboardLang.textContent = 'Для переключения языка комбинация: left shift + left alt';
  footer.appendChild(desc);
  footer.appendChild(keyboardLang);
  body.append(footer);
}
createBodyTemplate();

const keyboardBtns = document.querySelector('.keyboard__keys_wrapper');
// const keyboardTextarea = document.querySelector('.keyboard__textarea');

function createKeyboard(template) {
  keyboardBtns.innerHTML = '';
  for (let i = 0; i < template.length; i += 1) {
    const key = document.createElement('button');
    key.classList.add('keyboard__key');
    key.classList.add(`${keyboardKeys[i]}`);
    key.textContent = template[i];
    keyboardBtns.append(key);
  }
}
createKeyboard(keyboardEn);

document.addEventListener('keydown', (e) => {
  keyPressed.push(e.code);
  if (e.code === 'ShiftLeft' && keyPressed.includes('AltLeft')) {
    if (lang === 'en') {
      lang = 'ru';
      createKeyboard(keyboardRu);
    } else {
      lang = 'en';
      createKeyboard(keyboardEn);
    }
  }
  const keyBtn = document.querySelectorAll('.keyboard__key');
  for (let i = 0; i < keyBtn.length; i += 1) {
    if (keyBtn[i].classList.contains(`${e.code}`)) {
      keyBtn[i].classList.add('active');
    }
  }
});
document.addEventListener('keyup', (e) => {
  keyPressed.length = 0;
  const keyBtn = document.querySelectorAll('.keyboard__key');
  for (let i = 0; i < keyBtn.length; i += 1) {
    if (keyBtn[i].classList.contains(`${e.code}`)) {
      keyBtn[i].classList.remove('active');
    }
  }
});
