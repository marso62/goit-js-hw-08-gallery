'use strict'
import gallery from './gallery-items.js'

// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

const bodyContent = document.querySelector('.js-gallery')
const allImage = createMinGallery(gallery)
bodyContent.insertAdjacentHTML('afterbegin', allImage)

// создаем галлерею по шаблону
function createMinGallery(transactions) {
  return transactions.map(i => rowGallery(i)).join('')
}

// создаем шаблон скрипта
function rowGallery({ preview, description, original }) {
  const rov = `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `
  return rov
}

// модальное окно
const lightboxGallery = document.querySelector('.js-lightbox')
const lightboxImage = document.querySelector('.lightbox__image')
const overlay = document.querySelector('.lightbox__overlay')
const button = document.querySelector('.lightbox__button')
bodyContent.addEventListener('click', openLightbox)

//  откpыть
function openLightbox(event) {
  event.preventDefault()
  lightboxGallery.classList.add('is-open')
  addBigImg(event.target)
}

function addBigImg(img) {
  lightboxImage.setAttribute('src', img.dataset.source)
}

// закрыть
function closeLightbox() {
  lightboxGallery.classList.remove('is-open')
  lightboxImage.setAttribute('src', '')
}

// слушатели
button.addEventListener('click', closeButton)
function closeButton({ target, currentTarget }) {
  if (target === currentTarget) {
    closeLightbox()
  }
}

overlay.addEventListener('click', сloseOverlay)
// не пойму, работает или нет
function сloseOverlay({ target, currentTarget }) {
  if (target === currentTarget) {
    closeLightbox()
  }
}

window.addEventListener('keydown', handleEsc)
function handleEsc(event) {
  if (event.code === 'Escape') {
    closeLightbox()
  }
}
