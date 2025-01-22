$(".openbtn").click(function () {
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

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