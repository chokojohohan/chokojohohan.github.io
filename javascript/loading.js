/**
 * ロゴ付きローディング表示（トップページ index.html の #splash 用）
 * ・読み込み直後に少しだけロゴを表示してからフェードアウトして消します。
 */
const splash = document.getElementById('splash');

if (splash) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const displayDuration = prefersReducedMotion ? 50 : 650;

    const hideSplash = () => {
        splash.classList.add('is-hidden');
        const removeSplash = () => splash.remove();
        splash.addEventListener('transitionend', removeSplash, { once: true });
        window.setTimeout(removeSplash, prefersReducedMotion ? 120 : 550);
    };

    window.setTimeout(hideSplash, displayDuration);
}
