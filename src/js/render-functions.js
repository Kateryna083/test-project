import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let lightbox;

export function renderImgCard(images) {
  const markup = images
    .map(
      ({ largeImageURL, webformatURL, likes, views, comments, downloads }) =>
        `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="" class="card-img"/>
        </a>
        <ul class="gallery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${likes}</p>
          </li>
          <li>
            <p class="count-text">Views</p>
            <p class="count">${views}</p>
          </li>
          <li>
            <p class="count-text">Comments</p>
            <p class="count">${comments}</p>
          </li>
          <li>
            <p class="count-text">Downloads</p>
            <p class="count">${downloads}</p>
          </li>
        </ul>
      </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearImages() {
  gallery.innerHTML = '';
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function displayMessage(message, type = 'info') {
  iziToast[type]({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    message: message,
    position: 'topRight',
    timeout: 2000,
  });
}

export function toggleLoadMoreButton(show) {
  loadMoreButton.style.display = show ? 'block' : 'none';
}

export function scrollPage() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
