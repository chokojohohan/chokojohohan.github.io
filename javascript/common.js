/**
 * 全ページ共通パーツの自動生成 ＆ ハンバーガーメニュー制御
 *
 * 【このファイルの役割】
 * 1. <header> 内のロゴ生成
 * 2. ハンバーガーメニューボタン（.openbtn）とナビゲーション（#g-nav）の生成・開閉
 * 3. 「ページの先頭へ戻る」ボタン（#page-top）の生成
 * 4. <footer> 内の学校ロゴ・クレジット（指定ページのみ）・著作権表示の生成
 *
 * ★ メニュー項目の追加やコピーライトの年号更新は、このファイルだけを編集すれば全8ページに反映されます！
 */

// ★ コピーライトの表記年（毎年1月などにここだけ書き換えてください）
const COPYRIGHT_TEXT = '© 2024-2026 Choko Computer Science Club.';

// ★ メニューに表示する一覧（順番や項目を増やす場合はここを編集）
const MENU_ITEMS = [
    { type: 'main', page: 'index', label: 'TOP', href: 'index.html', selfHref: '#top' },
    { type: 'main', page: 'about', label: 'ABOUT', href: 'about.html', selfHref: '#about' },
    { type: 'sub', page: 'about', label: '検定資格取得状況', href: 'about.html#certification', selfHref: '#certification' },
    { type: 'sub', page: 'about', label: '活動日', href: 'about.html#days', selfHref: '#days' },
    { type: 'sub', page: 'about', label: '活動場所', href: 'about.html#location', selfHref: '#location' },
    { type: 'main', page: 'activity', label: 'ACTIVITIES', href: 'activity.html', selfHref: '#activities' },
    { type: 'sub', page: 'activity', label: '競技プログラミング', href: 'activity.html#competition', selfHref: '#competition' },
    { type: 'sub', page: 'activity', label: '制作物', href: 'activity.html#production', selfHref: '#production' },
    { type: 'main', page: 'event', label: 'EVENTS', href: 'event.html', selfHref: '#events' },
    { type: 'sub', page: 'event', label: '外部活動の支援', href: 'event.html#external', selfHref: '#external' },
    { type: 'sub', page: 'event', label: '班内特別活動', href: 'event.html#internal', selfHref: '#internal' },
];

/**
 * ★ フッターに表示するクレジットの種類（使用ページのみ表示する仕組み）
 * ・各HTMLの <body> に付けた data-credit 属性で表示内容を選びます。
 *   - data-credit="sawaratsuki"  → SAWARATSUKI さんのクレジットを表示
 *   - data-credit="loosedrawing" → Loose Drawing さんのクレジットを表示
 *   - data-credit を書かない       → クレジットのHTML自体を出力しない
 * ・種類を増やしたい場合は、ここに追加してから対象HTMLの <body data-credit="キー名"> を指定します。
 */
const CREDIT_ITEMS = {
    sawaratsuki: {
        href: 'https://github.com/SAWARATSUKI/KawaiiLogos',
        text: 'Kawaii Logo Made by SAWARATSUKI.',
    },
    loosedrawing: {
        href: 'https://loosedrawing.com/illust/1394/',
        text: 'illustration by Loose Drawing',
    },
};

// 各HTMLの <body> に書かれた属性を読み取る
const currentPage = document.body.dataset.page || '';
// 403/404ページなど深い階層のURLから開かれるページでは '/' を付けてルート相対パスにする
const rootPath = document.body.dataset.rootPath || '';
// クレジットの出し分け（'sawaratsuki' / 'loosedrawing' / 指定なし）
const creditType = document.body.dataset.credit || '';

// 1. ヘッダー（<header id="header"> または <header id="header_n">）の中身を生成
const headerEl = document.getElementById('header') || document.getElementById('header_n');
if (headerEl && headerEl.childElementCount === 0) {
    const logoHref = currentPage === 'index' ? '#top' : `${rootPath}index.html`;
    headerEl.innerHTML = `
        <a class="imglink" href="${logoHref}">
            <img class="headerlogo" src="${rootPath}logo.svg" width="1000" height="230" alt="情報工学班のロゴ">
        </a>
    `;
}

// 2. ハンバーガーボタン ＆ メニュー本体（<dialog id="g-nav">）を生成
let menuButton = document.querySelector('.openbtn[aria-controls="g-nav"]');
let navDialog = document.getElementById('g-nav');

if (headerEl && !menuButton && !navDialog) {
    menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'openbtn';
    menuButton.setAttribute('aria-label', 'メニューを開く');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'g-nav');
    menuButton.innerHTML = '<span></span><span></span><span></span>';

    const listItemsHtml = MENU_ITEMS.map((item) => {
        const className = item.type === 'sub' ? 'navsub' : 'nav';
        const isCurrentMain = item.type === 'main' && item.page === currentPage;
        const href = item.page === currentPage && !rootPath ? item.selfHref : `${rootPath}${item.href}`;
        const currentAttr = isCurrentMain ? ' aria-current="page"' : '';
        return `<li><a class="${className}" href="${href}"${currentAttr}>${item.label}</a></li>`;
    }).join('');

    navDialog = document.createElement('dialog');
    navDialog.id = 'g-nav';
    navDialog.setAttribute('aria-label', 'メインナビゲーション');
    navDialog.innerHTML = `
        <button type="button" class="openbtn active nav-close-btn" aria-label="メニューを閉じる">
            <span></span><span></span><span></span>
        </button>
        <div id="g-nav-list">
            <nav aria-label="サイトナビゲーション">
                <ul>${listItemsHtml}</ul>
            </nav>
        </div>
        <a class="nav-youtube-btn" href="https://www.youtube.com/@chokojohohan" target="_blank"
            rel="noopener noreferrer nofollow" aria-label="長工 情報工学班 YouTubeチャンネル">▶</a>
    `;

    headerEl.after(menuButton, navDialog);
}

// メニューの開閉処理（全ブラウザ共通のシンプルなクリック制御）
if (menuButton && navDialog instanceof HTMLDialogElement) {
    const closeButton = navDialog.querySelector('.nav-close-btn');

    const syncMenuState = () => {
        const isOpen = navDialog.open;
        menuButton.classList.toggle('active', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
    };

    menuButton.addEventListener('click', () => {
        if (navDialog.open) {
            navDialog.close();
        } else {
            navDialog.showModal();
        }
        syncMenuState();
    });

    closeButton?.addEventListener('click', () => {
        navDialog.close();
    });

    // メニューリストやボタン以外の背景部分をクリックしたら閉じる
    navDialog.addEventListener('click', (event) => {
        if (!event.target.closest('#g-nav ul, a, button')) {
            navDialog.close();
        }
    });

    // メニュー内のリンクを押したら閉じる
    navDialog.querySelectorAll('a[href]').forEach((link) => {
        link.addEventListener('click', () => {
            if (navDialog.open) {
                navDialog.close();
            }
        });
    });

    navDialog.addEventListener('close', syncMenuState);
}

// 3. 「ページの先頭へ戻る」ボタン（#page-top）を <main> 末尾に生成
const mainEl = document.querySelector('main');
if (mainEl && !document.getElementById('page-top')) {
    const pageTopEl = document.createElement('p');
    pageTopEl.id = 'page-top';
    pageTopEl.innerHTML = `
        <a href="#top" aria-label="ページの先頭へ戻る">
            <svg class="icon icon-lg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6-6 6Zm0-6L7.41 13 12 8.42 16.59 13 18 11.59l-6-6-6 6Z" />
            </svg>
        </a>
    `;
    mainEl.append(pageTopEl);
}

// 4. フッター（<footer id="footer">）の中身を生成（クレジットは <body data-credit="..."> を付けたページのみ表示）
const footerEl = document.getElementById('footer');
if (footerEl && footerEl.childElementCount === 0) {
    const creditItem = CREDIT_ITEMS[creditType];
    const creditHtml = creditItem
        ? `
            <div class="footer-credit">
                <a class="footer-credit-link" href="${creditItem.href}" target="_blank"
                    rel="noopener noreferrer nofollow">${creditItem.text}</a>
            </div>
        `
        : '';

    footerEl.innerHTML = `
        <a class="chokologobox imglink" href="https://choko-hs.ed.jp/" target="_blank"
            rel="noopener noreferrer nofollow">
            <img loading="lazy" decoding="async" class="chokologo" src="${rootPath}images/choko-logo.svg"
                width="249" height="42" alt="長野工業高校のロゴ">
        </a>
        ${creditHtml}
        <p class="copyright">${COPYRIGHT_TEXT}</p>
    `;
}
