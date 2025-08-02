// card-click.js

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.clickable-card');

  cards.forEach(card => {
    // make pointer cursor
    card.style.cursor = 'pointer';

    // ensure it's keyboard focusable
    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
    }

    const navigate = () => {
      const href = card.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    };

    card.addEventListener('click', navigate);

    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate();
      }
    });
  });
});
