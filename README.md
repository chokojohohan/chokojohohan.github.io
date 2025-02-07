<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">
</head>

> [!CAUTION]
> 長野工業高等学校情報工学班員等の関係者以外は、このリポジトリの編集やフォーク等を禁止します。

<img src="https://chokojohohan.github.io/logo_w.svg" alt="QR Code" width="25%" height="auto" style="display:block;margin:0 auto;margin-bottom:20px">

# 当ホームページの概要
## 現在の状況
- 新ホームページは[こちら&nbsp;(chokojohohan.github.io/)](https://chokojohohan.github.io/ "ホーム｜長野工業高等学校情報工学班")  
- 旧ホームページは[こちら&nbsp;(chokojohohan.github.io/Computerscienceclub/home.html)](https://chokojohohan.github.io/Computerscienceclub/home.html "ホーム｜長野工業高等学校情報工学班(旧)")  
<!--  ※旧ホームページを開くと新ホームページへリダイレクトします。-->
> 学校側による確認作業が終了しました。2025年2月8日に正式公開します。
> また、刷新計画[2. ]（旧ホームページに新ホームページへリダイレクトするコードの追加）を実施します。

---
### 情報班ホームページ刷新計画（URLの短縮・更新）
- [x] <s>情報班のGitHubに"chokojohohan.github.io"というパブリックリポジトリを作成し、現在制作中の新ホームページのソースコードを追加する。</s>
- [ ] 情報班のGitHubの"Computerscienceclub"リポジトリの1つ1つのHTMLファイルに対応するchokojohohan.github.ioにリフレッシュするためのコードを加える。
> "Computerscienceclub"リポジトリはパブリックのままで、GitHub Pagesも公開したままにする。ブックマーク等の影響で404になることを避けるため。

<!-- |ファイル名|追加内容|
|:---:|:---|
|home.html|`<meta http-equiv="refresh" content="0; url=https://chokojohohan.github.io/" />`|
|other.html|`<meta http-equiv="refresh" content="0; url=https://chokojohohan.github.io/activity.html#web" />`|
|pcclass1.html|`<meta http-equiv="refresh" content="0; url=https://chokojohohan.github.io/event.html#persocom_class" />`|
|python.html|`<meta http-equiv="refresh" content="0; url=https://chokojohohan.github.io/activity.html#puzzle" />`|
|sangyofea2022.html|`<meta http-equiv="refresh" content="0; url=https://chokojohohan.github.io/activity.html#puzzle" />`|
|suc1.html|`<meta http-equiv="refresh" content="0; url=https://chokojohohan.github.io/event.html#scratch" />`|
|syougakusei.html|`<meta http-equiv="refresh" content="0; url=https://chokojohohan.github.io/event.html#persocom_class" />`|
|u15p1.html|`<meta http-equiv="refresh" content="0; url=https://chokojohohan.github.io/event.html#u-15" />`| -->
<!-- TODO: 実行 -->
---

## 当ホームページ運営方針について
当ホームページは、長野工業高等学校 情報工学班の活動や魅力を発信し、より多くの方に情報工学班を知っていただくことを目的として運営しています。<br>

- 更新について
  - 常に最新の情報を提供できるよう、定期的な更新を心がけます。
  - 特にイベント告知や活動報告など、鮮度が重要な情報については、速やかな更新を行います。
  - ホームページの内容は、状況に応じて随時見直し、改善していきます。

- 新入生・受験生の皆さんへ
  - このホームページを通して、情報工学班の魅力や雰囲気が少しでも伝われば幸いです。
  - 情報工学に興味がある方はもちろん、少しでも「面白そうだな」と感じたら、ぜひ一度情報工学班の活動を見学に来てください。
  - 私たちと一緒に、情報工学の面白さを体験しましょう！ 皆さんの入班を心よりお待ちしています！

---

### 生成AIの利用について
当ホームページは、開発に生成AI（Gemini, Claude, ChatGPTなど）を活用しています。  
生成AIが生成した文章をそのまま使用している箇所もございますが、ハルシネーション[^1]がないよう、ヒューマンインザループ[^2]を行っております。  
生成AIの力を借りながら、正確で質の高い情報をお届けできるよう努めています。

[^1]: ハルシネーションとは、生成AIがもっともらしい嘘や誤った情報を生成してしまう現象のことです。事実に基づかない内容が含まれる可能性があります。
[^2]: ヒューマンインザループとは、生成AIの生成物を人間が確認・修正する工程のことです。AIの生成する誤り（ハルシネーションなど）を防ぎ、品質を担保するために設けています。

---

## 開発記録
|日付(月/日)|内容|
|:---:|:---|
|<nobr>**2024年**</nobr>||
|<nobr>05/03</nobr>|ホームページ制作を開始する。（@PP-Various/private）|
|<nobr>05/04</nobr>|現在のホームページの原型が完成。以降、個人的に開発を進める。|
|<nobr>11/25</nobr>|情報工学班のホームページ制作が正式に班の活動になる。|
|<nobr>11/27</nobr>|リポジトリを移動し、開発を進める。（@PP-Various/johoclub）|
|<nobr>**2025年**</nobr>||
|<nobr>01/17</nobr>|公開するリポジトリを作成する。（@chokojohohan/chokojohohan.github.io）|
|<nobr>01/22</nobr>|開発環境から本番環境へのソースコードの移動するためにリリースする。（@PP-Various/johoclub/releases）|
|<nobr>01/22</nobr>|GitHub Pagesで公開するリポジトリにソースコードを追加する。（@chokojohohan/chokojohohan.github.io）|
|<nobr>01/22</nobr>|GitHub Pagesで公開を開始する。<br>~~学校側の確認作業が終了するまで検索結果に表示されないようにするために`robot`を`noindex`に設定する。~~|
|<nobr>01/29</nobr>|ホームページの概要に「当ホームページの運営方針」を追記する。|
|<nobr>02/02</nobr>|ホームページの概要に「当ホームページ開発での生成AIの利用について」を追記する。|
|<nobr>02/03</nobr>|情報工学班員と顧問の先生向けにホームページの紹介をする。|
|<nobr>02/06</nobr>|学校側の確認作業が終了し、一般公開の許可が下りる。|

---
## サイトを共有
- ホームページ
  ```txt
  https://chokojohohan.github.io/
  ```
- QRコード  
  ![QR_Code](https://chokojohohan.github.io/qr_code.png "QR Code")
  ```txt
  https://chokojohohan.github.io/qr_code.png
  ```

---

<span style="display:block;text-align:center;font-family:'Audiowide',sans-serif;font-size:110%;">
  © 2024-2025 Choko Computer Science Club.
</span>

---

# 長野県長野工業高等学校
- [ホームページ](https://www.nagano-c.ed.jp/choko/ "長野県長野工業高等学校 – ようこそ！長野工業高等学校WEBサイトへ")
- [情報工学班について](https://www.nagano-c.ed.jp/choko/index.php/school-life/club/jouhouhan/ "情報工学班 – 長野県長野工業高等学校")
