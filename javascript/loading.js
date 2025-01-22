//logoの表示
$(window).on('load', function () {
    $("#splash").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
    $("#splash_logo").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
});
// $(window).on('load', function () {

//     //=====ここからローディングエリア（splashエリア）を1.2秒でフェードアウトした後に動かしたいJSをまとめる
//     $("#splash").delay(1500).fadeOut('slow', function () {//ローディングエリア（splashエリア）を1.2秒でフェードアウトする記述

//         $("#splash_logo").delay(1300).fadeOut('slow');//ロゴを1.0秒（1000ms）待機してからフェードアウト

//         $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与

//     });
//     //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

//     //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
//     $('.splashbg').on('animationend', function () {
//         //この中に動かしたいJSを記載
//     });
//     //=====ここまで背景が伸びた後に動かしたいJSをまとめる

// });

