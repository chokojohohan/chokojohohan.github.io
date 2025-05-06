// jQueryが読み込まれていることを確認してください
$(document).ready(function() { // DOM読み込み後に実行

    $(".openbtn").click(function () {
        $(this).toggleClass('active'); // ボタン自身の activeクラスをトグル
        $("#g-nav").toggleClass('panelactive'); // ナビゲーションの panelactiveクラスをトグル
        $("#youtube").toggleClass('visible'); // YouTubeリンクの visibleクラスをトグル
    });

    $("#g-nav a").click(function () { // ナビゲーションのリンクがクリックされたら
        $(".openbtn").removeClass('active'); // ボタンの activeクラスを除去
        $("#g-nav").removeClass('panelactive'); // ナビゲーションの panelactiveクラスを除去
        $("#youtube").removeClass('visible'); // YouTubeリンクの visibleクラスを除去
    });

}); // $(document).ready の終わり

// keydownイベントの処理を追加
document.addEventListener("keydown", function (event) {
	// 押されたキーのコード
	let keyCode = event.keyCode;

	// キーコードが「enter」の場合
	if (keyCode === 13) {
		$(this).toggleClass('active');
		$("#g-nav").toggleClass('panelactive');
	}
});

document.addEventListener("keydown", function (event) {
	let keyCode = event.keyCode;
	// esc
	if (keyCode === 27) {
		$(this).toggleClass('active');
		$("#g-nav").toggleClass('panelactive');
	}
});

$(function () {
	// 対象の要素を取得
	$('#menubar a[href^="#"]').click(function () {
		// メニューバーを閉じる
		$(".openbtn").removeClass('active');
		$("#g-nav").removeClass('panelactive');
	});
});

// TODO: ドロップダウンメニュー対応化