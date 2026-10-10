# 佐藤さん恋愛ゲーム

GitHub PagesやNetlifyでそのまま公開できる静的サイトです。

## 公開方法

1. GitHubで新しいリポジトリを作ります。
2. このフォルダ内のファイルをすべてアップロードします。
   - `index.html`
   - `style.css`
   - `otome.html`
   - `otome-original.html`
   - `otome-style.css`
   - `royal-style.css`
   - `app.js`
   - `game-data.js`
   - `title-screen.css`
   - `title-screen.png`
   - `start-button-frame.svg`
   - `.nojekyll`
3. リポジトリの `Settings` → `Pages` を開きます。
4. `Build and deployment` の `Source` を `Deploy from a branch` にします。
5. `Branch` を `main`、フォルダを `/root` にして保存します。
6. 数十秒から数分後、`https://ユーザー名.github.io/リポジトリ名/` で遊べます。

## 編集方法

ゲーム内容を変えるときは、基本的に `game-data.js` だけ編集します。

## デザインの比較・復元

- 新デザイン: `otome.html`。`royal-style.css` に水色・白・赤・金の見た目をまとめています。
- 元のデザイン: `otome-original.html`。元の `otome-style.css` は変更していません。

どちらも同じ `game-data.js` を使うため、会話を編集すると両方に反映されます。新デザインの相手選択画像も、各人物の `standingImage` から表示します。

公開ページを元の見た目に戻すには、`otome.html` の `royal-style.css` の読み込み行を削除し、`body` の `royal-theme` クラスを削除してコミットしてください。デザインを比較するだけなら、下記の元のデザインのURLを開けます。

## タイトル画面・会話の編集

タイトル画面の画像は `title-screen.png`、赤いスタートボタンの色・位置・大きさは `title-screen.css` で変更できます。画像は画面の高さに合わせて表示し、スマホでは左右だけを切ります。「ゲームスタート」で相手選択へ進み、ヘッダーのタイトルや「最初から」でタイトル画面に戻ります。

ボタンの金色の装飾は `start-button-frame.svg` です。Safariの時計・URLバーはページの余白ではないため、CSSでは削除できません。iPhoneではSafariから「ホーム画面に追加」し、「ウェブアプリとして開く」が表示される場合はオンにして、そのアイコンから開くとURLバーなしで遊べます。iPhone実機での全画面表示は未確認です。

- 攻略対象を変える: `characters`
- 質問を変える: `questions`
- 選択肢を変える: `choices`
- 正解を変える: `correct: true`
- エンディング文を変える: `endingLines`

`endingLines` の `happy`・`good`・`bad` は、次のように段落ごとに分けて書けます。

```js
happy: [
  "佐藤「今度ご飯でも行きましょう。」",
  "私「楽しみ！」"
]
```

1つの文字列が1段落になります。行動なら `"私は走って逃げた。"` のように書き、カギ括弧は付けません。これまでの1つの文字列で書く形式も表示できます。

GitHub上で `game-data.js` を編集して `Commit changes` すると、GitHub Pagesの公開ページも自動で更新されます。

## Netlifyで公開

1. Netlifyにログインし、利用プランはFree（無料）を選びます。
2. `Add new project` → `Import an existing project` からGitHubを選びます。
3. `sato-love-game` リポジトリの `main` ブランチを選びます。
4. デプロイします。`netlify.toml` に公開設定が入っているので、ビルドは不要です。
5. 完了後に `Make public` を開き、希望するプロジェクト名を設定して一般公開します。名前が利用可能なら `希望する名前.netlify.app` が共有用URLになります。

`Private` のままでは、URLを知っていても一般の人は遊べません。一般公開後は、Netlifyへのログインなしで遊べます。

Netlifyでは乙女ゲーム版がトップページに表示されます。通常版は `index.html` から開けます。GitHub Pagesの既存URLは変わりません。

連携後は、GitHubでファイルを編集してコミットするとNetlifyも自動更新されます。無料枠には利用量の上限があります。

## URL
- Netlify（乙女ゲーム版）：https://gekidannoro-shidaisai2026.netlify.app/
- 元の乙女デザイン：https://gekidannoro-shidaisai2026.netlify.app/otome-original.html
- 初期版：https://yukina-itoh.github.io/sato-love-game/
- 乙女ゲーム版：https://yukina-itoh.github.io/sato-love-game/otome.html
