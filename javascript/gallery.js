/**
 * トップページの横スクロールカルーセル（スライダー）制御
 * ・HTML側の <div data-carousel> 内にある <li> を数えて、下部のドットを自動生成します。
 * ・index.html でスライド(<li>)を増やしても、JS側の編集は不要です。
 */
const carousels = document.querySelectorAll('[data-carousel]');
const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

carousels.forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');
    const statusEl = carousel.querySelector('[data-carousel-status]');
    const alignMode = carousel.dataset.carouselAlign || 'start';
    const shouldAutoplay = carousel.dataset.autoplay === 'true';

    if (!track) return;
    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    let activeIndex = 0;
    let autoplayTimer = null;
    const dotButtons = [];

    const scrollBehavior = () => (prefersReducedMotionQuery.matches ? 'auto' : 'smooth');

    const scrollToSlide = (index, announce = true) => {
        const clamped = ((index % slides.length) + slides.length) % slides.length;
        const target = slides[clamped];
        if (!target) return;

        let targetLeft;
        if (alignMode === 'center') {
            targetLeft = target.offsetLeft - (track.clientWidth - target.clientWidth) / 2;
        } else {
            targetLeft = target.offsetLeft;
        }

        track.scrollTo({
            left: Math.max(0, targetLeft),
            behavior: scrollBehavior(),
        });

        updateActiveUI(clamped, announce);
    };

    const getClosestSlideIndex = () => {
        const refPoint = alignMode === 'center'
            ? track.scrollLeft + track.clientWidth / 2
            : track.scrollLeft + 2;

        let bestIdx = 0;
        let bestDist = Infinity;

        slides.forEach((slide, idx) => {
            const slideRef = alignMode === 'center'
                ? slide.offsetLeft + slide.clientWidth / 2
                : slide.offsetLeft;
            const dist = Math.abs(slideRef - refPoint);
            if (dist < bestDist) {
                bestDist = dist;
                bestIdx = idx;
            }
        });

        return bestIdx;
    };

    const updateActiveUI = (index, announce = false) => {
        activeIndex = index;
        dotButtons.forEach((btn, idx) => {
            if (idx === index) {
                btn.setAttribute('aria-current', 'true');
            } else {
                btn.removeAttribute('aria-current');
            }
        });
        if (announce && statusEl) {
            statusEl.textContent = `${slides.length}件中 ${index + 1}件目を表示中`;
        }
    };

    if (dotsContainer) {
        dotsContainer.replaceChildren();
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `${idx + 1}件目のスライドへ移動`);
            if (idx === 0) dot.setAttribute('aria-current', 'true');
            dot.addEventListener('click', () => scrollToSlide(idx, true));
            dotButtons.push(dot);
            dotsContainer.append(dot);
        });
    }

    prevBtn?.addEventListener('click', () => {
        scrollToSlide(activeIndex - 1, true);
    });

    nextBtn?.addEventListener('click', () => {
        scrollToSlide(activeIndex + 1, true);
    });

    track.addEventListener('scrollend', () => {
        const idx = getClosestSlideIndex();
        updateActiveUI(idx, false);
    });

    const stopAutoplay = () => {
        if (autoplayTimer !== null) {
            window.clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    };

    const startAutoplay = () => {
        stopAutoplay();
        if (!shouldAutoplay || prefersReducedMotionQuery.matches || document.hidden) return;
        autoplayTimer = window.setInterval(() => {
            scrollToSlide(activeIndex + 1, false);
        }, 3800);
    };

    if (shouldAutoplay) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        carousel.addEventListener('focusin', stopAutoplay);
        carousel.addEventListener('focusout', startAutoplay);
        carousel.addEventListener('pointerdown', stopAutoplay, { passive: true });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });
        prefersReducedMotionQuery.addEventListener('change', () => {
            if (prefersReducedMotionQuery.matches) stopAutoplay();
            else startAutoplay();
        });
        startAutoplay();
    }

    // 初期状態がセンターアライメントの場合は先頭を中央寄せ
    if (alignMode === 'center') {
        const first = slides[0];
        const initialLeft = Math.max(0, first.offsetLeft - (track.clientWidth - first.clientWidth) / 2);
        track.scrollTo({ left: initialLeft, behavior: 'instant' });
    }
    updateActiveUI(0, false);
});
