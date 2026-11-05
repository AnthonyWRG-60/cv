const AUTOPLAY_MS = 4500;

function initCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const dotsBox = carousel.querySelector('.carousel-dots');
    const total = track.children.length;
    let current = 0;
    let timer = null;

    carousel.classList.toggle('is-single', total < 2);

    const dots = Array.from({ length: total }, (_, index) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Imagen ${index + 1}`);
        dot.addEventListener('click', () => show(index, true));
        dotsBox.appendChild(dot);
        return dot;
    });

    function show(index, restart = false) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
        if (restart) startAutoplay();
    }

    function startAutoplay() {
        clearInterval(timer);
        if (total > 1) {
            timer = setInterval(() => show(current + 1), AUTOPLAY_MS);
        }
    }

    carousel.querySelector('.prev').addEventListener('click', () => show(current - 1, true));
    carousel.querySelector('.next').addEventListener('click', () => show(current + 1, true));

    show(0);
    startAutoplay();
}

document.querySelectorAll('[data-carousel]').forEach(initCarousel);
