# Next.jsをgithub pageにデプロイする
[GitHub PagesにNext.js をデプロイする](https://qiita.com/manten120/items/87e9e822800403904dc8)

- 静的なHTMLとしてNext.jsアプリを生成するためのコマンドをpackage.jsonに追加
  - package.jsonのscriptsにexportを追記する。

- ビルドを確認
```
$ npm run build
$ npm run export
:
Export successful. Files written to /workspaces/codespaces-nextjs/out
```
- ローカルサーバーで動作を確認する
```
$ npm install --save-dev serve
$ npx serve out
```

- 不要なディレクトリをpushしないために.gitignoreに追記
→すでに記載済。

- GitHub Actions でデプロイするための準備
  - `.github/workflows/gh-pages.yml`を作る。
  - git add/commit/pushする




