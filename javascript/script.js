window.addEventListener('scroll', function () {
	const header = document.getElementById('header');
	if (window.pageYOffset > 300) { // 300pxスクロールしたら
		header.style.top = '0'; // ヘッダーを表示
	} else {
		header.style.top = '-80px'; // ヘッダーを非表示
	}
});

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
	var scroll = $(window).scrollTop();
	if (scroll >= 400) {//上から400pxスクロールしたら
		$('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
		$('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
	} else {
		if ($('#page-top').hasClass('UpMove')) {//すでに#page-topにUpMoveというクラス名がついていたら
			$('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
			$('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
		}
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top').click(function () {
	$('body,html').animate({
		scrollTop: 0//ページトップまでスクロール
	}, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
	return false;//リンク自体の無効化
});


// 動きのきっかけの起点となるアニメーションの名前を定義
function BgFadeAnime() {

	// 背景色が伸びて出現（左から右）
	$('.bgLRextendTrigger').each(function () { //bgLRextendTriggerというクラス名が
		var elemPos = $(this).offset().top - 50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('bgLRextend');// 画面内に入ったらbgLRextendというクラス名を追記
		} else {
			$(this).removeClass('bgLRextend');// 画面外に出たらbgLRextendというクラス名を外す
		}
	});

	// 文字列を囲う子要素
	$('.bgappearTrigger').each(function () { //bgappearTriggerというクラス名が
		var elemPos = $(this).offset().top - 50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('bgappear');// 画面内に入ったらbgappearというクラス名を追記
		} else {
			$(this).removeClass('bgappear');// 画面外に出たらbgappearというクラス名を外す
		}
	});
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	BgFadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	BgFadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

function slideAnime() {
	//====左に動くアニメーションここから===
	$('.leftAnime').each(function () {
		var elemPos = $(this).offset().top - 50;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			//左から右へ表示するクラスを付与
			//テキスト要素を挟む親要素（左側）とテキスト要素を元位置でアニメーションをおこなう
			$(this).addClass("slideAnimeLeftRight"); //要素を左枠外にへ移動しCSSアニメーションで左から元の位置に移動
			$(this).children(".leftAnimeInner").addClass("slideAnimeRightLeft");  //子要素は親要素のアニメーションに影響されないように逆の指定をし元の位置をキープするアニメーションをおこなう
		} else {
			//左から右へ表示するクラスを取り除く
			$(this).removeClass("slideAnimeLeftRight");
			$(this).children(".leftAnimeInner").removeClass("slideAnimeRightLeft");

		}
	});

}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	slideAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	slideAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime() {

	//ふわっと動くきっかけのクラス名と動きのクラス名の設定
	$('.fadeUpTrigger').each(function () { //fadeInUpTriggerというクラス名が
		var elemPos = $(this).offset().top - 50; //要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('fadeUp');
			// 画面内に入ったらfadeInというクラス名を追記
		} else {
			$(this).removeClass('fadeUp');
			// 画面外に出たらfadeInというクラス名を外す
		}
	});

	//関数でまとめることでこの後に違う動きを追加することが出来ます
	$('.fadeDownTrigger').each(function () { //fadeInDownTriggerというクラス名が
		var elemPos = $(this).offset().top - 50; //要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('fadeDown');
			// 画面内に入ったらfadeDownというクラス名を追記
		} else {
			$(this).removeClass('fadeDown');
			// 画面外に出たらfadeDownというクラス名を外す
		}
	});


}//ここまでふわっと動くきっかけのクラス名と動きのクラス名の設定

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述