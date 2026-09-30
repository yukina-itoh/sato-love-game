# 佐藤さん恋愛ゲーム

GitHub Pagesでそのまま公開できる静的サイトです。

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

GitHub上で `game-data.js` を編集して `Commit changes` すると、GitHub Pagesの公開ページも自動で更新されます。
