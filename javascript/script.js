/**
 * 共通インタラクション
 *
 * 【このファイルの役割（HTML側の書き方と対応）】
 * 1. 前のページへ戻るボタン：ボタンに data-history-back 属性を付けると動作（403/404ページ等）
 * 2. スクロール連動表示　　：#header / #page-top / .bgextend / .slide-in / .fadeUpTrigger を自動表示
 * 3. 続きを読む折りたたみ　：<div class="open-box" data-show-more> ＋ <button class="open-label">
 * 4. 画像・動画拡大モーダル：画像リンクに data-lightbox="グループ名"、動画リンクに class="video-open"
 */

// 1. 前のページへ戻るボタン制御（403/404ページ等）
document.querySelectorAll('[data-history-back]').forEach((btn) => {
    btn.addEventListener('click', () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    });
});

// 2. スクロール関連（画面上端の見えない基準要素を使って、スクロール量を軽量に判定）
const createTopSentinel = (heightPx) => {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.left = '0';
    sentinel.style.width = '1px';
    sentinel.style.height = `${heightPx}px`;
    sentinel.style.pointerEvents = 'none';
    sentinel.style.visibility = 'hidden';
    document.body.append(sentinel);
    return sentinel;
};

const topHeader = document.getElementById('header');
if (topHeader) {
    const headerSentinel = createTopSentinel(300);
    const headerObserver = new IntersectionObserver(
        (entries) => {
            const passedThreshold = !entries[0].isIntersecting;
            topHeader.classList.toggle('is-visible', passedThreshold);
        },
        { threshold: 0 }
    );
    headerObserver.observe(headerSentinel);
}

const pageTop = document.getElementById('page-top');
if (pageTop) {
    const pageTopSentinel = createTopSentinel(400);
    const pageTopObserver = new IntersectionObserver(
        (entries) => {
            if (!entries[0].isIntersecting) {
                pageTop.classList.remove('DownMove');
                pageTop.classList.add('UpMove');
            } else if (pageTop.classList.contains('UpMove')) {
                pageTop.classList.remove('UpMove');
                pageTop.classList.add('DownMove');
            }
        },
        { threshold: 0 }
    );
    pageTopObserver.observe(pageTopSentinel);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = [
    { selector: '.bgextend', activeClass: 'bgLRextend' },
    { selector: '.slide-in', activeClass: 'slideAnime' },
    { selector: '.fadeUpTrigger', activeClass: 'fadeUp' },
];

if (!prefersReducedMotion) {
    const classByElement = new Map();
    revealTargets.forEach(({ selector, activeClass }) => {
        document.querySelectorAll(selector).forEach((el) => {
            classByElement.set(el, activeClass);
        });
    });

    if (classByElement.size > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const activeClass = classByElement.get(entry.target);
                    if (!activeClass) return;
                    // 一度表示された要素や既に上へ通過した要素は表示済みのまま固定し、上スクロール時の再再生を防ぐ
                    if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
                        entry.target.classList.add(activeClass);
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '0px 0px -50px 0px',
                threshold: 0,
            }
        );

        classByElement.forEach((_, el) => revealObserver.observe(el));
    }
}

// 3. 続きを読む（先頭フェード付き折りたたみ制御）
document.querySelectorAll('[data-show-more]').forEach((box) => {
    const panel = box.querySelector('[data-open-panel]');
    const button = box.querySelector('.open-label');
    if (!panel || !button) return;

    const setExpanded = (expanded) => {
        panel.classList.toggle('is-open', expanded);
        button.setAttribute('aria-expanded', String(expanded));
        button.textContent = expanded ? 'タップで閉じる' : 'タップで開く';
    };

    button.addEventListener('click', () => {
        const nextExpanded = button.getAttribute('aria-expanded') !== 'true';
        setExpanded(nextExpanded);
    });

    // キーボードフォーカスが折りたたみ内のリンクに入った場合は自動展開
    panel.addEventListener('focusin', () => {
        if (!panel.classList.contains('is-open') && window.getComputedStyle(button).display !== 'none') {
            setExpanded(true);
        }
    });
});

// 4. ネイティブ <dialog> モーダル制御
// 画像を拡大したいときは <a href="画像パス" data-lightbox="グループ名" data-title="キャプション"> を付けます。
// 同じグループ名なら「← 前へ」「次へ →」で切り替えでき、別名にすれば1枚ずつ表示されます。
const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox]'));
const videoTriggers = Array.from(document.querySelectorAll('.video-open'));

if (lightboxTriggers.length > 0 || videoTriggers.length > 0) {
    const dialog = document.createElement('dialog');
    dialog.id = 'media-dialog';
    dialog.className = 'media-dialog';
    dialog.setAttribute('closedby', 'any');
    dialog.setAttribute('aria-label', 'メディアビューア');

    dialog.innerHTML = `
        <div class="media-dialog-frame">
            <form method="dialog">
                <button type="submit" class="media-dialog-close" aria-label="閉じる">×</button>
            </form>
            <div class="media-dialog-stage"></div>
            <p id="media-dialog-caption" class="media-dialog-caption"></p>
            <div class="media-dialog-nav" hidden>
                <button type="button" data-dialog-prev aria-label="前の画像へ">← 前へ</button>
                <span data-dialog-counter aria-live="polite"></span>
                <button type="button" data-dialog-next aria-label="次の画像へ">次へ →</button>
            </div>
        </div>
    `;
    document.body.append(dialog);

    const stage = dialog.querySelector('.media-dialog-stage');
    const captionEl = dialog.querySelector('#media-dialog-caption');
    const navBar = dialog.querySelector('.media-dialog-nav');
    const prevBtn = dialog.querySelector('[data-dialog-prev]');
    const nextBtn = dialog.querySelector('[data-dialog-next]');
    const counterEl = dialog.querySelector('[data-dialog-counter]');

    let currentGroup = [];
    let currentIndex = 0;

    const showImageAt = (index) => {
        if (currentGroup.length === 0) return;
        currentIndex = ((index % currentGroup.length) + currentGroup.length) % currentGroup.length;
        const item = currentGroup[currentIndex];
        const src = item.src || '';
        const title = item.title || '';

        dialog.dataset.mode = 'image';
        const img = document.createElement('img');
        img.src = src;
        img.alt = title;
        stage.replaceChildren(img);
        captionEl.textContent = title;
        dialog.setAttribute('aria-labelledby', 'media-dialog-caption');
        dialog.removeAttribute('aria-label');

        if (currentGroup.length > 1) {
            navBar.hidden = false;
            counterEl.textContent = `${currentIndex + 1} / ${currentGroup.length}`;
        } else {
            navBar.hidden = true;
            counterEl.textContent = '';
        }
    };

    const openVideoModal = (src, title) => {
        currentGroup = [];
        navBar.hidden = true;
        counterEl.textContent = '';
        captionEl.textContent = '';
        dialog.dataset.mode = 'video';
        dialog.removeAttribute('aria-labelledby');
        dialog.setAttribute('aria-label', title || '動画の再生');

        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.preload = 'metadata';

        stage.replaceChildren(video);
        dialog.showModal();
    };

    lightboxTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const groupName = trigger.dataset.lightbox;
            const elements = lightboxTriggers.filter((el) => el.dataset.lightbox === groupName);
            currentGroup = elements.map((el) => ({
                src: el.getAttribute('href') || el.dataset.src || '',
                title: el.dataset.title || el.querySelector('img')?.alt || '',
            }));
            const idx = Math.max(0, elements.indexOf(trigger));
            showImageAt(idx);
            dialog.showModal();
        });
    });

    videoTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const src = trigger.getAttribute('href') || '';
            const title = trigger.dataset.title || '紹介動画';
            openVideoModal(src, title);
        });
    });

    prevBtn.addEventListener('click', () => showImageAt(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImageAt(currentIndex + 1));

    // closedby="any" 非対応ブラウザ用バックドロップクリックフォールバック
    if (!('closedBy' in HTMLDialogElement.prototype)) {
        const outside = (e) => {
            const r = dialog.getBoundingClientRect();
            return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
        };
        let pressedOutside = false;
        dialog.addEventListener('pointerdown', (event) => {
            pressedOutside = outside(event);
        });
        dialog.addEventListener('pointerup', (event) => {
            if (pressedOutside && outside(event)) {
                dialog.close();
            }
        });
    }

    dialog.addEventListener('keydown', (event) => {
        if (currentGroup.length <= 1) return;
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showImageAt(currentIndex - 1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            showImageAt(currentIndex + 1);
        }
    });

    dialog.addEventListener('close', () => {
        const video = stage.querySelector('video');
        if (video) {
            video.pause();
            video.removeAttribute('src');
            video.load();
        }
        stage.replaceChildren();
        delete dialog.dataset.mode;
    });
}
