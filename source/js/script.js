/* eslint-env es6 */
'use strict';

// ////////////////// модальное окно формы
const getScrollWidth = () => {
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const onEscKeydownCloseModal = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const body = document.querySelector('.page');
const buttonsOpenModal = document.querySelectorAll('.modal-btn');
const buyModal = document.querySelector('.modal-buy');
const modalForm = document.querySelector('.form-modal');

const inputTelModalForm = modalForm.querySelector('.form-modal__input--tel');
const inputMailFormModal = modalForm.querySelector('.form-modal__input--mail');
const errorInputTel = modalForm.querySelector('.main-input__error--tel');
const errorInputMail = modalForm.querySelector('.main-input__error--mail');

const successModalMessage = document.querySelector('.success-message');
const closeSuccesMesBtn = document.querySelector('.success-message__close');

const inputTelIvalid = () => {
  inputTelModalForm.setCustomValidity('Данные не верны');
  inputTelModalForm.style.border = '1px solid #fe7865';
  errorInputTel.style.opacity = '1';
};

const inputTelvalid = () => {
  inputTelModalForm.style.border = '';
  errorInputTel.style.opacity = '';
  inputTelModalForm.setCustomValidity('');
};

const inputMailInvalid = () => {
  inputMailFormModal.style.border = '1px solid #fe7865';
  errorInputMail.style.opacity = '1';
};

const inputMailValid = () => {
  inputMailFormModal.style.border = '';
  errorInputMail.style.opacity = '';
};

const onInputTel = () => {
  inputTelModalForm.addEventListener('input', () => {
    if (inputTelModalForm.value.length < 10) {
      inputTelIvalid();
    } else {
      inputTelvalid();
    }
  });
};

const onIputMail = () => {
  inputMailFormModal.addEventListener('input', () => {
    if (inputMailFormModal.validity.valid === false) {
      inputMailInvalid();
    } else {
      inputMailValid();
    }
  });
};

const lockBody = (lockPad) => {
  body.classList.add('lock');
  body.style.paddingRight = `${lockPad}` + 'px';
};

const unlockBody = () => {
  body.classList.remove('lock');
  body.style.paddingRight = '';
};

const onClickAwayCloseModal = (evt) => {
  if (!evt.target.closest('.modal-buy__content')) {
    closeModal();
  }
};

const clickAwayCloseSuccessMessage = (evt) => {
  if (!evt.target.closest('.success-message--visible')) {
    hideSuccessModalMessage();
    document.removeEventListener('click', clickAwayCloseSuccessMessage);
    closeSuccesMesBtn.removeEventListener('click', hideSuccessModalMessage);
  }
};

const closeModal = () => {
  buyModal.setAttribute('aria-hidden', 'true');
  unlockBody();
  modalForm.reset();
  document.removeEventListener('keydown', onEscKeydownCloseModal);
  document.removeEventListener('click', onClickAwayCloseModal);
  inputMailValid();
  inputTelvalid();
};

const onBtnCloseModal = (btnClose) => {
  if (modalForm) {
    btnClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeModal();
    }, {once: true});
  }
};

const addListenerOnOpenModal = () => {
  setTimeout(() => {
    document.addEventListener('click', onClickAwayCloseModal);
    document.addEventListener('keydown', onEscKeydownCloseModal);
  }, 200);
};

const openModal = () => {
  buyModal.setAttribute('aria-hidden', 'false');
  inputTelModalForm.focus();
  let bodyLockPadding = getScrollWidth();
  lockBody(bodyLockPadding);

  const btnClose = modalForm.querySelector('.modal-buy__close');
  onBtnCloseModal(btnClose);

  addListenerOnOpenModal();
  onInputTel();
  onIputMail();
};

const hideSuccessModalMessage = () => {
  successModalMessage.classList.remove('success-message--visible');
};

const showSuccessPopupMessage = () => {
  successModalMessage.classList.add('success-message--visible');
  closeSuccesMesBtn.addEventListener('click', hideSuccessModalMessage);
  document.addEventListener('click', clickAwayCloseSuccessMessage);
};

const onSuccessSubmit = () => {
  closeModal();
  showSuccessPopupMessage();
};

const onSubmitSendData = () => {
  modalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    localStorage.setItem('tel', inputTelModalForm.value);
    localStorage.setItem('mail', inputMailFormModal.value);
    onSuccessSubmit();
  });
};

const onBtnShowModal = () => {
  buttonsOpenModal.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal();
      onSubmitSendData();
    });
  });
};

onBtnShowModal();

// //////////////// конец модальное окно формы

//  ////////////// меню бургер
const headerMenu = document.querySelector('.header-menu');
const menuButton = document.querySelector('.menu-button');


const showMenu = () => {
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'закрыть меню');
  headerMenu.classList.remove('header-menu--closed');
  headerMenu.classList.add('header-menu--opened');
};

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'открыть меню');
  headerMenu.classList.add('header-menu--closed');
  headerMenu.classList.remove('header-menu--opened');
};

// //////////////// КОНЕЦ меню бургер

// //////////////// табы
const aboutTapBar = document.querySelector('.about-tapbar');
const tapBarBts = aboutTapBar.querySelectorAll('.about-tapbar__item');
const slides = document.querySelectorAll('.country-list-item');
let slideActive = document.querySelector('.country-list-item--active');

const changeActiveSlide = (value) => {
  slides.forEach(slide => {
    let dataSlide = slide.getAttribute('data-name');
    if (dataSlide === value) {
      slide.classList.add('country-list-item--active');
    } else {
      slide.classList.remove('country-list-item--active');
    }
  });
};

const changeActiveBtn = (value, btns) => {
  slideActive = document.querySelector('.country-list-item--active');
  let dataSlideActive = slideActive.getAttribute('data-name');
  btns.forEach(btn => {
    if (dataSlideActive !== value) {
      btn.classList.remove('about-tapbar__item--active');
    }
  });
};

const onTapBarClick = (evt) => {
  slideActive = document.querySelector('.country-list-item--active');
  let dataTap = evt.target.getAttribute('data-tap');
  changeActiveBtn(dataTap, tapBarBts);
  if (!evt.target.classList.contains('about-tapbar__item--active')) {
    changeActiveSlide(dataTap);
    evt.target.classList.add('about-tapbar__item--active');
  }
};
// ////////////////  КОНЕЦ табы

// //////////////// форма обратной связи
const contactForm = document.querySelector('.contact__form');
const contactTelInput = contactForm.querySelector('.contact__input--tel');
const contactMailInput = contactForm.querySelector('.contact__input--mail');
const errorInputTelContact = contactForm.querySelector('.main-input__error--tel');
const errorInputMailContact = contactForm.querySelector('.main-input__error--mail');

const inputTelContactIvalid = () => {
  contactTelInput.setCustomValidity('Данные не верны');
  contactTelInput.style.border = '1px solid #fe7865';
  errorInputTelContact.style.opacity = '1';
};

const inputTelContactvalid = () => {
  contactTelInput.style.border = '';
  contactTelInput.setCustomValidity('');
  errorInputTelContact.style.opacity = '';
};

const inputMailContactInvalid = () => {
  contactMailInput.style.border = '1px solid #fe7865';
  errorInputMailContact.style.opacity = '1';
};

const inputMailContactValid = () => {
  contactMailInput.style.border = '';
  errorInputMailContact.style.opacity = '';
};

const onInputTelContact = () => {
  contactTelInput.addEventListener('input', () => {
    if (contactTelInput.value.length < 10) {
      inputTelContactIvalid();
    } else {
      inputTelContactvalid();
    }
  });
};

const onIputMailContact = () => {
  contactMailInput.addEventListener('input', () => {
    if (contactMailInput.validity.valid === false) {
      inputMailContactInvalid();
    } else {
      inputMailContactValid();
    }
  });
};

const onSubmitContactForm = () => {
  contactForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    localStorage.setItem('contactTel', contactTelInput.value);
    localStorage.setItem('contactMail', contactMailInput.value);
    contactForm.reset();
    showSuccessPopupMessage();
  });
};


// //////////////// КОНЕЦ форма обратной связи

document.addEventListener('DOMContentLoaded', () => {

  headerMenu.classList.remove('header-menu--no-js');
  headerMenu.classList.add('header-menu--closed');

  menuButton.addEventListener('click', () => {
    if (headerMenu.classList.contains('header-menu--closed')) {
      showMenu();
    } else {
      closeMenu();
    }
  });
  if (aboutTapBar) {
    tapBarBts.forEach(btn => {
      btn.addEventListener('click', onTapBarClick);
    });
  }

  onInputTelContact();
  onIputMailContact();
  onSubmitContactForm();
});
