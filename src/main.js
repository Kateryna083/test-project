import { getPicturesByQuery } from './js/pixabay-api.js';
import {
  renderImgCard,
  clearImages,
  displayMessage,
  toggleLoadMoreButton,
  scrollPage,
} from './js/render-functions.js';

const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = event.currentTarget.elements.query.value.trim().toLowerCase();
  if (!currentQuery) {
    displayMessage('Please enter a search query.', 'error');
    return;
  }

  currentPage = 1;
  clearImages();
  toggleLoadMoreButton(false);

  try {
    const data = await getPicturesByQuery(currentQuery, currentPage);
    if (data.hits.length === 0) {
      displayMessage('Nothing found for your request.', 'warning');
    } else {
      renderImgCard(data.hits);
      toggleLoadMoreButton(
        data.hits.length === 15 && data.totalHits > currentPage * 15
      );
    }
  } catch (error) {
    displayMessage('Failed to fetch images. Please try again.', 'error');
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  try {
    const data = await getPicturesByQuery(currentQuery, currentPage);
    renderImgCard(data.hits);
    scrollPage();
    if (data.hits.length < 15 || currentPage * 15 >= data.totalHits) {
      toggleLoadMoreButton(false);
      displayMessage(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    displayMessage('Failed to fetch images. Please try again.', 'error');
  }
});
