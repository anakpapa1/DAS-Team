document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add('flip');

      if (!hasFlippedCard) {
          // first click
          hasFlippedCard = true;
          firstCard = this;

          return;
      }

      // second click
      secondCard = this;

      checkForMatch();
  }

  function checkForMatch() {
      let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

      isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetBoard();
  }

  function unflipCards() {
      lockBoard = true;

      setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');

          resetBoard();
      }, 1500);
  }

  function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
  }

  function shuffleCards() {
      cards.forEach(card => {
          let randomPos = Math.floor(Math.random() * cards.length);
          card.style.order = randomPos;
      });
  }

  // Shuffle cards when the page loads
  shuffleCards();

  // Add click event to each card
  cards.forEach(card => card.addEventListener('click', flipCard));
});