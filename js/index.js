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

const { body } = document;

const createBodyTemplate = () => {
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
};
createBodyTemplate();

const keyboardBtns = document.querySelector('.keyboard__keys_wrapper');
const textarea = document.querySelector('.keyboard__textarea');

const createKeyButtons = () => {
  for (let i = 0; i < keyboardKeys.length; i += 1) {
    const key = document.createElement('button');
    key.classList.add('keyboard__key');
    key.classList.add(`${keyboardKeys[i]}`);
    keyboardBtns.append(key);
  }
};
createKeyButtons();

const keyBtn = document.querySelectorAll('.keyboard__key');
const capsLock = document.querySelector('.CapsLock');
const shiftLeft = document.querySelector('.ShiftLeft');
const shiftRight = document.querySelector('.ShiftRight');
const ctrlLeft = document.querySelector('.ControlLeft');
const altLeft = document.querySelector('.AltLeft');

const createKeyboard = (template) => {
  for (let i = 0; i < keyBtn.length; i += 1) {
    keyBtn[i].textContent = '';
    keyBtn[i].textContent = template[i];
  }
};

const changeLanguage = () => {
  if (lang === 'en') {
    createKeyboard(keyboardEn);
  } else if (lang === 'ru') {
    createKeyboard(keyboardRu);
  }
};

const checkCursor = (text) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
  if (start === end) {
    textarea.selectionEnd = end + text.length;
  } else {
    textarea.selectionEnd = end;
  }
};

const pressBackspace = () => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (start > 0) {
    const enteredText = textarea.value.slice(0, end - 1) + textarea.value.substring(end);
    textarea.value = enteredText;
    textarea.selectionStart = start - 1;
    textarea.selectionEnd = end - 1;
  }
};

const pressDel = () => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (start < textarea.value.length) {
    const enteredText = textarea.value.slice(0, end) + textarea.value.substring(end + 1);
    textarea.value = enteredText;
    textarea.selectionStart = start;
    textarea.selectionEnd = end;
  }
};

const pressCapsLock = () => {
  if (isCapsPressed) {
    if (lang === 'en') {
      createKeyboard(keyboardEn);
      capsLock.classList.remove('caps_active');
    } else if (lang === 'ru') {
      createKeyboard(keyboardRu);
      capsLock.classList.remove('caps_active');
    }
    isCapsPressed = false;
  } else {
    if (lang === 'en') {
      createKeyboard(keyboardEnShift);
      capsLock.classList.add('caps_active');
    } else if (lang === 'ru') {
      createKeyboard(keyboardRuShift);
      capsLock.classList.add('caps_active');
    }
    isCapsPressed = true;
  }
};

const pressFnBtn = (button) => {
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
};

const pressKey = () => {
  keyBtn.forEach((el) => {
    el.addEventListener('click', () => {
      textarea.focus();
      const button = el.textContent;
      pressFnBtn(button);
      if (el.textContent === 'CapsLock') {
        pressCapsLock();
      }
    });
  });
};
pressKey();

const pressShift = () => {
  if (isShiftPressed) {
    if (isCapsPressed) {
      if (lang === 'en') {
        createKeyboard(keyboardEn);
      } else if (lang === 'ru') {
        createKeyboard(keyboardRu);
      }
    } else if (!isCapsPressed) {
      if (lang === 'en') {
        createKeyboard(keyboardEnShift);
      } else if (lang === 'ru') {
        createKeyboard(keyboardRuShift);
      }
    }
    isShiftPressed = false;
  }
};

const pushShift = (e) => {
  if (e.target.textContent === 'Shift') {
    isShiftPressed = true;
  }
  pressShift();
};

const releaseShift = (e) => {
  if (e.target.textContent === 'Shift') {
    isShiftPressed = false;
  }
  if (!isCapsPressed) {
    if (lang === 'en') {
      createKeyboard(keyboardEn);
    } else if (lang === 'ru') {
      createKeyboard(keyboardRu);
    }
  } else if (isCapsPressed) {
    if (lang === 'en') {
      createKeyboard(keyboardEnShift);
    } else if (lang === 'ru') {
      createKeyboard(keyboardRuShift);
    }
  }
};

shiftLeft.addEventListener('mousedown', pushShift);
shiftLeft.addEventListener('mouseup', releaseShift);
shiftRight.addEventListener('mousedown', pushShift);
shiftRight.addEventListener('mouseup', releaseShift);

const keyDown = (e) => {
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
      if (isCapsPressed) {
        createKeyboard(keyboardRuShift);
      } else {
        createKeyboard(keyboardRu);
      }
      ctrlLeft.classList.add('active');
      altLeft.classList.add('active');
      localStorage.setItem('language', 'ru');
    } else {
      lang = 'en';
      if (isCapsPressed) {
        createKeyboard(keyboardEnShift);
      } else {
        createKeyboard(keyboardEn);
      }
      ctrlLeft.classList.add('active');
      altLeft.classList.add('active');
      localStorage.setItem('language', 'en');
    }
    isCtrlPressed = false;
    isAltPressed = false;
  }

  pressShift();

  keyBtn.forEach((el) => {
    if (el.classList.contains(`${e.code}`)) {
      el.classList.add('active');
      const button = el.textContent;
      pressFnBtn(button);
    }
  });

  if (e.key === 'CapsLock') {
    pressCapsLock();
    capsLock.classList.add('active');
  }
};

const keyUp = (e) => {
  keyBtn.forEach((el) => {
    if (el.classList.contains(`${e.code}`)) {
      el.classList.remove('active');
    }
  });

  if (e.key === 'Shift') {
    if (!isCapsPressed) {
      if (lang === 'en') {
        createKeyboard(keyboardEn);
      } else if (lang === 'ru') {
        createKeyboard(keyboardRu);
      }
    } else if (isCapsPressed) {
      if (lang === 'en') {
        createKeyboard(keyboardEnShift);
      } else if (lang === 'ru') {
        createKeyboard(keyboardRuShift);
      }
    }
  }
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

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
