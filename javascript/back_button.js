/**
 * 左下の「前のページに戻る」ボタン（通常ページ用）
 * ・URL末尾に ?back=false または ?back=none を付けると非表示になります。
 */
const backParam = new URLSearchParams(window.location.search).get('back');
const shouldHide = backParam === 'false' || backParam === 'none';

if (!shouldHide) {
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'back-button';
    backButton.setAttribute('aria-label', '前のページに戻る');

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M16 22 6 12 16 2l1.775 1.775L9.55 12l8.225 8.225Z');
    svg.append(path);
    backButton.append(svg);

    backButton.addEventListener('click', () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    });

    document.body.append(backButton);
}
