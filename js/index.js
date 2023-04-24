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
let isShiftPressed = false;
let isCapsPressed = false;

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
const textarea = document.querySelector('.keyboard__textarea');

function checkCursor(text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
  if (start === end) {
    textarea.selectionEnd = end + text.length;
  } else {
    textarea.selectionEnd = end;
  }
}

function pressBackspace() {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (start > 0) {
    const enteredText = textarea.value.slice(0, end - 1) + textarea.value.substring(end);
    textarea.value = enteredText;
    textarea.selectionStart = start - 1;
    textarea.selectionEnd = end - 1;
  }
}

function pressDel() {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (start < textarea.value.length) {
    const enteredText = textarea.value.slice(0, end) + textarea.value.substring(end + 1);
    textarea.value = enteredText;
    textarea.selectionStart = start;
    textarea.selectionEnd = end;
  }
}

function pressFnBtn(button) {
  if (button === 'Tab') {
    checkCursor('    ');
  } else if (button === 'Enter') {
    checkCursor('\n');
  } else if (button === 'Back') {
    pressBackspace();
  } else if (button === 'Del') {
    pressDel();
  } else if (button === 'Alt' || button === 'Ctrl' || button === 'Win' || button === 'Shift' || button === 'CapsLock') {
    textarea.value += '';
  } else {
    checkCursor(button);
  }
}

function pressKey() {
  document.querySelectorAll('.keyboard__key').forEach((el) => {
    el.addEventListener('click', () => {
      textarea.focus();
      const button = el.textContent;
      pressFnBtn(button);
    });
  });
}

function createKeyboard(template) {
  keyboardBtns.innerHTML = '';
  for (let i = 0; i < template.length; i += 1) {
    const key = document.createElement('button');
    key.classList.add('keyboard__key');
    key.classList.add(`${keyboardKeys[i]}`);
    key.textContent = template[i];
    keyboardBtns.append(key);
  }
  pressKey();
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
  textarea.focus();

  if (e.code === 'ControlLeft') {
    isCtrlPressed = true;
  } else if (e.code === 'AltLeft') {
    isAltPressed = true;
  } else if (e.key === 'Shift') {
    isShiftPressed = true;
  } else {
    isCtrlPressed = false;
    isAltPressed = false;
    isShiftPressed = false;
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
      document.querySelector('.ControlLeft').classList.add('active');
      document.querySelector('.AltLeft').classList.add('active');
      localStorage.setItem('language', 'en');
    }
    isCtrlPressed = false;
    isAltPressed = false;
  }

  if (isShiftPressed) {
    if (lang === 'en') {
      createKeyboard(keyboardEnShift);
    } else if (lang === 'ru') {
      createKeyboard(keyboardRuShift);
    }
    isShiftPressed = false;
  }

  document.querySelectorAll('.keyboard__key').forEach((el) => {
    if (el.classList.contains(`${e.code}`)) {
      el.classList.add('active');
      const button = el.textContent;
      pressFnBtn(button);
    }
  });
  if (e.key === 'CapsLock') {
    if (isCapsPressed) {
      if (lang === 'en') {
        createKeyboard(keyboardEn);
        document.querySelector('.CapsLock').classList.remove('caps_active');
      } else if (lang === 'ru') {
        createKeyboard(keyboardRu);
        document.querySelector('.CapsLock').classList.remove('caps_active');
      }
      isCapsPressed = false;
    } else {
      if (lang === 'en') {
        createKeyboard(keyboardEnShift);
        document.querySelector('.CapsLock').classList.add('caps_active');
      } else if (lang === 'ru') {
        createKeyboard(keyboardRuShift);
        document.querySelector('.CapsLock').classList.add('caps_active');
      }
      isCapsPressed = true;
    }
    document.querySelector('.CapsLock').classList.add('active');
  }
});

document.addEventListener('keyup', (e) => {
  document.querySelectorAll('.keyboard__key').forEach((el) => {
    if (el.classList.contains(`${e.code}`)) {
      el.classList.remove('active');
    }
  });

  if (e.key === 'Shift') {
    changeLanguage();
  }
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
