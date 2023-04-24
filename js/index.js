import keyboardKeys from './keyboardKeys.js';
import keyboardEn from './keyboardEn.js';
import keyboardEnShift from './keyboardEnShift.js';
import keyboardRu from './keyboardRu.js';
import keyboardRuShift from './keyboardRuShift.js';

// document.onkeydown = (e) => {
//   console.log('e.key:', e.key);
//   console.log('e.code:', e.code);
// };

// document.addEventListener('mousedown', (e) => {
//   console.log(e.target);
// });

let lang = 'en';
let isCtrlPressed = false;
let isAltPressed = false;

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
  keyboardLang.textContent = 'Для переключения языка комбинация: left ctrl + left alt';
  footer.appendChild(desc);
  footer.appendChild(keyboardLang);
  body.append(footer);
}
createBodyTemplate();

const keyboardBtns = document.querySelector('.keyboard__keys_wrapper');
const keyboardTextarea = document.querySelector('.keyboard__textarea');

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

function changeLanguage() {
  if (lang === 'en') {
    createKeyboard(keyboardEn);
  } else if (lang === 'ru') {
    createKeyboard(keyboardRu);
  }
}

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  keyboardTextarea.focus();

  if (e.code === 'ControlLeft') {
    isCtrlPressed = true;
  } else if (e.code === 'AltLeft') {
    isAltPressed = true;
  } else {
    isCtrlPressed = false;
    isAltPressed = false;
  }

  if (isCtrlPressed && isAltPressed) {
    if (lang === 'en') {
      lang = 'ru';
      changeLanguage();
      document.querySelector('.ControlLeft').classList.add('active');
      document.querySelector('.AltLeft').classList.add('active');
      localStorage.setItem('language', 'ru');
    } else {
      lang = 'en';
      changeLanguage();
      localStorage.setItem('language', 'en');
    }
    isCtrlPressed = false;
    isAltPressed = false;
  }

  if (e.key === 'Shift') {
    if (lang === 'en') {
      createKeyboard(keyboardEnShift);
    } else if (lang === 'ru') {
      createKeyboard(keyboardRuShift);
    }
  }

  // document.querySelector(`.keyboard__key.${e.code}`).classList.add('active');

  document.querySelectorAll('.keyboard__key').forEach((el) => {
    if (el.classList.contains(`${e.code}`)) {
      el.classList.add('active');
      if (e.key === 'Space') {
        keyboardTextarea.value += ' ';
      } else if (e.key === 'Tab') {
        keyboardTextarea.value += '    ';
      } else if (e.key === 'Enter') {
        keyboardTextarea.value += '\n';
      } else if (e.key === 'Backspace') {
        keyboardTextarea.value = keyboardTextarea.value.slice(0, keyboardTextarea.value.length - 1);
      } else if (e.key === 'Alt' || e.key === 'Control' || e.key === 'Meta' || e.key === 'Shift' || e.key === 'CapsLock' || e.key === 'Delete') {
        keyboardTextarea.value += '';
      } else {
        keyboardTextarea.value += el.textContent;
      }
      keyboardTextarea.selectionStart = keyboardTextarea.value.length;
    }
  });
});

document.addEventListener('keyup', (e) => {
  // document.querySelector(`.keyboard__key.${e.code}`).classList.remove('active');
  document.querySelectorAll('.keyboard__key').forEach((el) => {
    if (el.classList.contains(`${e.code}`)) {
      el.classList.remove('active');
    }
  });

  changeLanguage();
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('language') === 'en') {
    lang = 'en';
    changeLanguage();
  } else if (localStorage.getItem('language') === 'ru') {
    lang = 'ru';
    changeLanguage();
  } else {
    createKeyboard(keyboardEn);
  }
});
