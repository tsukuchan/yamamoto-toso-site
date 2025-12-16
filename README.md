# 山本塗装店 リニューアル用スターター（静的 + Tailwind）

## 必要要件

- Node.js（LTS）
- VS Code（推奨拡張：Live Server, Prettier）

## セットアップ

```bash
# 1) 依存インストール
npm install

# 2) CSSビルド（監視モード）
npm run dev

# 3) サイトをローカルで表示（方法A）
# VS Code の Live Server で index.html を開く

# 3) サイトをローカルで表示（方法B：Python簡易サーバ）
npm run serve   # http://localhost:5173 を開く
```

## 本番用ビルド

```bash
npm run build   # dist/output.css が最小化されます
```

## よくあるエラー

- `tailwindcss: command not found`
  - 対策: `npm install` をもう一度実行。`node -v` で Node が入っているか確認。
- CSS が当たらない
  - `index.html` の `<link rel="stylesheet" href="/dist/output.css">` のパスを再確認。
  - `npm run dev` で `dist/output.css` が生成されているか確認。

## フォルダ構成

```
myokoyamapen-site/
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ .gitignore
├─ .vscode/
│  └─ settings.json
├─ src/
│  ├─ css/
│  │  └─ input.css
│  ├─ js/
│  │  └─ main.js
│  ├─ img/
│  └─ pages/
│     ├─ services.html
│     ├─ cases.html
│     ├─ company.html
│     └─ contact.html
└─ dist/
```

## メモ

- 画像は `src/img` へ配置。WebP 推奨。
- ページ追加は `src/pages/` に HTML を増やしてナビからリンク。
