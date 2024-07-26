document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://portfolio-js.b.goit.study/api/reviews'; // Правильний URL вашого сервера

  fetch(apiUrl)
    .then(response => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (data.length === 0) throw new Error('Not found');
      renderReviews(data);
      initializeSwiper();
    })
    .catch(error => {
      document.getElementById('error-message').innerText = error.message;
    });

  function renderReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews-container');
    reviews.forEach(review => {
      const reviewElement = document.createElement('li');
      reviewElement.classList.add('swiper-slide');
      reviewElement.innerHTML = `
        <img src="${review.avatar_url}" alt="${review.author}'s avatar" class="review-avatar" />
        <div class="review-author">${review.author}</div>
        <div class="review-text">${review.review}</div>
      `;
      reviewsContainer.appendChild(reviewElement);
    });
  }

  function initializeSwiper() {
    new Swiper('.swiper-container', {
      slidesPerView: 4,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      on: {
        slideChangeTransitionEnd: function () {
          // Enable/disable navigation buttons based on current slide
          const swiper = this;
          const { navigation } = swiper;

          if (swiper.isBeginning) {
            navigation.nextEl.classList.remove('swiper-button-disabled');
            navigation.prevEl.classList.add('swiper-button-disabled');
          } else if (swiper.isEnd) {
            navigation.prevEl.classList.remove('swiper-button-disabled');
            navigation.nextEl.classList.add('swiper-button-disabled');
          } else {
            navigation.nextEl.classList.remove('swiper-button-disabled');
            navigation.prevEl.classList.remove('swiper-button-disabled');
          }
        },
        reachBeginning: function () {
          const { navigation } = this;
          navigation.prevEl.classList.add('swiper-button-disabled');
        },
        reachEnd: function () {
          const { navigation } = this;
          navigation.nextEl.classList.add('swiper-button-disabled');
        },
      },
    });
  }
});
