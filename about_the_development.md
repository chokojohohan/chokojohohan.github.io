# ホームページ制作引継ぎ要件・定義書

## 1. 概要
このドキュメントは、長野工業高等学校 情報工学班公式サイトの制作・運用に関する要件・定義書です。
プロジェクトの状況、デザイン、技術的な詳細、日常的な更新手順を理解し、今後の運用・引継ぎを円滑に進めることを目的としています。

## 2. プロジェクト基本情報

- **プロジェクト名**: 長野工業高等学校 情報工学班 公式サイト
- **資料作成日**: 2025年11月22日（更新: 2026年11月14日）
- **管理担当者**: 長野工業高等学校 情報工学班
- **公開URL**: https://chokojohohan.github.io/

## 3. 要件定義

### 3.1. 機能要件
- **静的サイト**: GitHub Pagesを利用した静的ホスティング（ビルドツール不要）。
- **レスポンシブデザイン**: PC、タブレット、スマートフォンに対応。
- **アニメーション・UI機能**:
    - ロゴ付きローディング画面（トップページ `#splash`）
    - スクロール連動アニメーション（見出し帯、スライド出現、ふわっと表示、`prefers-reduced-motion` 対応）
    - 全画面ハンバーガーメニュー・画像/動画拡大モーダル（ネイティブ `<dialog>`）
    - 横スクロールカルーセル（トップページ）
    - 「続きを読む」折りたたみ（先頭グラデーションフェード）
    - 戻るボタン（下層ページ左下。URLパラメータ `?back=false` または `?back=none` で非表示）

### 3.2. 非機能要件
- **パフォーマンス**: 画像のWebP化・`width`/`height`指定によるレイアウトズレ防止・`loading="lazy"` による遅延読み込み・外部ライブラリ不使用による軽量化。
- **アクセシビリティ**: 適切なコントラスト比、画像への `alt` 属性の記述、OSの視覚効果軽減設定（`prefers-reduced-motion`）への配慮。

## 4. デザイン定義

### 4.1. カラーパレット
- **メインカラー**: `#4473C5` (青系)
- **ブラック**: `#000000` (文字色、黒背景セクション)
- **ホワイト**: `#ffffff` (背景色、白背景セクション)

### 4.2. フォント
すべて Google Fonts から読み込んでいます。
- **メインフォント**: `Google Sans Flex`, `Noto Sans JP`, `Noto Color Emoji` (日本語、英数字、絵文字)
- **アクセント・専用フォント**:
    - `Audiowide`: トップページ中央のタイトル（`COMPUTER SCIENCE CLUB`）
    - `Google Sans Code`: 等幅フォント表示用（トップページ）
    - `Comfortaa`: フッターの著作権・クレジット表示（`.footer-credit`）

### 4.3. レイアウト
- **ヘッダー**: 固定ヘッダー（トップページはスクロール後に表示、下層ページは常時固定表示）。
- **ナビゲーション**: ハンバーガーメニューによる全画面展開。
- **セクション構成**: `.white_section`（白背景）と `.black_section`（黒背景）を交互に配置し、メリハリをつける。
- **ページ固有スタイル**: 1ページでしか使わないレイアウト用CSSは、管理のわかりやすさのため各HTMLファイル内の `<style>` タグに直接記述しているページがある（`trial.html`、`logo_dl.html`、`403.html`、`404.html`）。

### 4.4. 画像・アイコン・動画の取り扱いに関する注意点
- **ファイル形式**: **SVG以外は全てWEBP形式に変換して使用すること。**
- **WEBP変換方法**:
    - [Squoosh](https://squoosh.app/) を使用してWEBP形式に変換してください。（「WEBP v2 (unstable)」は使用しない。）
    - 画質を保ちつつ、ファイルサイズを可能な限り小さくすることができます。
- **HTML記述の注意**:
    - 画像の `<img>` タグには、`width`・`height`（元画像のピクセル数）、`alt`（画像の説明）、必要に応じて `loading="lazy" decoding="async"` を設定してください。
    - トップページ（`index.html`）の「ABOUT」カード内の画像は、スマホ用（`johoclub_ogp.webp`）とPC用（`images/johoclub_ogp.webp`）で**別の画像ファイル**を参照しているため、片方だけ差し替えても他方は変わらない点に注意してください。
- **過去年度ファイルの扱い**:
    - `images/` 内の旧年度の動画・画像ファイルには年号が入っており識別できるため、アーカイブとして削除せず残してください。
- **動画の取り扱い**:
    - **基本ルール**: GitHubのアップロード容量制限があるため、新しい動画は原則として直接アップロードせず、**YouTubeに投稿**して埋め込みコード（`iframe`）を使用してください。URLはプライバシー配慮版の `https://www.youtube-nocookie.com/embed/...` に統一します。
    - 情報工学班のGmailアカウントにログインし、YouTubeにアクセスしてください。
    - **例外1（`about.html` の班活動紹介動画）**: 中学生にも見てもらいたいため、YouTubeがブロックされている中学校のPC・アカウントでも閲覧できるよう、画質を下げたMP4ファイルもYouTube埋め込みとは別に掲載しています（`.video-open` によるモーダル再生）。
    - **例外2（`activity.html` のパズルゲーム動画）**: 旧HP時代からの継続掲載のため、そのまま `<video>` タグで直接掲載しています。紹介動画と異なりYouTubeサブ用途ではないため現状のまま維持します。
    - **一年生スクラッチ発表会（`event.html`）**: 班活動紹介ほど閲覧必須ではないため、YouTube埋め込みのみで掲載しています（7本目以降の `iframe` には `loading="lazy"` を付けて読み込みを軽くしています）。

## 5. 技術スタック

外部JavaScriptライブラリ（jQuery / Slick Carousel 等）はすべて廃止し、ブラウザ標準機能だけで動作する構成になっています。

- **HTML**: HTML Living Standard（`<dialog>`、`<picture>` 等）
- **CSS**: CSS3（CSS変数、Flexbox、Grid、CSS Scroll Snap、Media Queries）
- **JavaScript**: ES6+（ES Modules：`<script type="module">`）
- **JSファイルの役割分担**:
    - `javascript/common.js`: 全ページ共通UI（ヘッダーロゴ・ハンバーガーメニュー・ナビ一覧・ページトップ戻るボタン・フッター）の自動生成とメニュー開閉制御
    - `javascript/script.js`: 戻るアクション（`403`/`404`）・スクロール出現アニメーション（`IntersectionObserver`）・続きを読む折りたたみ・画像/動画拡大モーダル（`<dialog>`）
    - `javascript/gallery.js`: トップページの横スクロールカルーセル制御（ドット自動生成含む）
    - `javascript/loading.js`: トップページのロゴ付きローディング画面（`#splash`）制御
    - `javascript/back_button.js`: 通常ページ左下の戻るボタン生成（`?back=false` / `?back=none` で非表示）

## 6. 運用・保守

- **リポジトリ**: [chokojohohan/chokojohohan.github.io](https://github.com/chokojohohan/chokojohohan.github.io)
- **ホスティング**: GitHub Pages
- **編集・更新方法**: Web版 VS Code（github.dev 等）や GitHub 上でリポジトリのファイルを直接編集・コミットすると、GitHub Pages に自動反映されます。
- **開発記録の更新**: 大きな変更を加えた際は、`README.md` の `## 開発記録` セクションに日付と変更内容を追記すること。
- **重要ファイルの保護**: `googlee4e556c33a659257.html` は Google Search Console の所有確認用ファイルであるため、**絶対に削除しないこと**。

### 6.1. ファイル構成一覧
- **HTMLページ（8ページ）**:
    - `index.html`: トップページ
    - `about.html`: 情報工学班について・検定資格・活動日・活動場所
    - `activity.html`: 日常活動（競技プログラミング・制作物）
    - `event.html`: 外部活動の支援・班内特別活動
    - `trial.html`: 見学・体験について
    - `logo_dl.html`: 公式サイトロゴタイプのダウンロードページ
    - `403.html` / `404.html`: エラーページ（深い階層のURLでも読めるよう `<body data-root-path="/">` で `/` 始まりのパスを使用）
- **CSS（`style/` フォルダ内・10ファイル）**:
    - `style.css`: サイト全体共通の基本スタイル・色/フォント定義・モーダル等
    - `style-sp.css`: 画面幅750px以下（スマホ）向けの調整
    - `background.css`: トップページ上部の青背景と四角形アニメーション
    - `scroll.css`: スクロール連動の出現アニメーション（`.slide-in`、`.bgextend`、`.fadeUpTrigger` 等）
    - `menu.css`: ハンバーガーボタンと全画面メニューのスタイル
    - `gallery.css`: トップページのカルーセル用スタイル
    - `loading.css`: トップページのローディング画面用スタイル
    - `link_card.css`: トップページなどのリンクカード用スタイル
    - `show_more.css`: 「続きを読む」折りたたみ用スタイル
    - `table.css`: `about.html` 等の表用スタイル

### 6.2. 日常的な更新手順（後輩向けガイド）
HTML内の更新箇所の直前にも日本語コメント（`<!-- ★ ... -->`）を入れてあります。

1. **メニュー項目の追加・コピーライト年の変更（全ページ一括）**
    - `javascript/common.js` の上部に定義されている `COPYRIGHT_TEXT` や `MENU_ITEMS` を編集するだけで、全8ページに一括反映されます。
    - フッターのクレジット表記（SAWARATSUKI / Loose Drawing）は、使っていないページには出力されないよう各HTMLの `<body>` にある `data-credit` 属性で制御しています（使わないページには属性を付けない）。
2. **検定資格テーブルの行追加（`about.html`）**
    - `about.html` の `<tbody>` 内にある `<tr>〜</tr>`（資格名・区別・点数の3列）を1セットコピーして書き換えます。
    - ※ページ上部の紹介文は PC 用（`.pc_display`）とスマホ用（`.sp_display`）の2箇所に分かれているため、両方確認してください。
3. **活動内容・イベントの追加（`activity.html` / `event.html`）**
    - 各 `<section class="white_section">` または `class="black_section"` のまとまりをコピーし、白黒が交互になるように配置します。
4. **画像を拡大表示できるようにする（モーダル設定）**
    - クリックで拡大させたい画像は `<a class="imglink zoom" href="images/画像名.webp" data-lightbox="グループ名" data-title="説明文">` で `<img>` を囲みます。
    - **同じ `data-lightbox` 名** を付けた画像同士はモーダル上で「← 前へ / 次へ →」で切り替えでき、別の名前にすると1枚だけで表示されます。
5. **トップページのスライド追加（`index.html`）**
    - `ul.slider`（ACTIVITIES）または `ul.slider2`（EVENTS）の中の `<li>〜</li>` を1つコピーして画像と文章を書き換えます。下部の丸いドットは `gallery.js` が自動で増やすため、HTML側の編集はこれだけです。

## 7. 制作者連絡先

本サイトの制作に関するお問い合わせは、以下の連絡先までお願いします。

- **制作者**: 長野工業高等学校 情報工学班（2025年度 副班長）
- **GitHub ID**: [@PP-Various](https://github.com/PP-Various)
- **メールアドレス**: [choko23424@gmail.com](mailto:choko23424@gmail.com)
- メールアドレス2: [nu.k26364@gmail.com](mailto:nu.k26364@gmail.com)

---

## 8. サイト刷新の手順

将来的にサイトを全面的に刷新（リニューアル）する場合の手順です。

1. **現行リポジトリのアーカイブ**
    - 現在の `chokojohohan.github.io` リポジトリの名前を変更します（例: `chokojohohan.github.io-v2` や `archive-2025` など）。
    - これにより、旧サイトのコードをバックアップとして保存します。

2. **新規リポジトリの作成**
    - 新しく `chokojohohan.github.io` という名前でリポジトリを作成します。
    - これが新サイトの公開用リポジトリとなります。

3. **コードの追加**
    - 新しいリポジトリに、新サイトのソースコードを追加・プッシュします。

4. **公開設定**
    - GitHub Pagesの設定を行い、新サイトを公開します。

5. **検索エンジンへの対応**
    - Google Search Console や Bing Webmaster Tools にアクセスし、サイトの再検証やサイトマップの送信を行い、新サイトが正しくインデックスされるようにします。
