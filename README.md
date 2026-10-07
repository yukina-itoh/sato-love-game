# 佐藤さん恋愛ゲーム

GitHub PagesやNetlifyでそのまま公開できる静的サイトです。

## 公開方法

1. GitHubで新しいリポジトリを作ります。
2. このフォルダ内のファイルをすべてアップロードします。
   - `index.html`
   - `style.css`
   - `app.js`
   - `game-data.js`
   - `.nojekyll`
3. リポジトリの `Settings` → `Pages` を開きます。
4. `Build and deployment` の `Source` を `Deploy from a branch` にします。
5. `Branch` を `main`、フォルダを `/root` にして保存します。
6. 数十秒から数分後、`https://ユーザー名.github.io/リポジトリ名/` で遊べます。

## 編集方法

ゲーム内容を変えるときは、基本的に `game-data.js` だけ編集します。

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
- 初期版：https://yukina-itoh.github.io/sato-love-game/
- 乙女ゲーム版：https://yukina-itoh.github.io/sato-love-game/otome.html
