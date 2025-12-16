/** @type {import('tailwindcss').Config} */
module.exports = {
  // 💡 コンテンツの読み込みパス（広範囲をカバー）
  content: [
    "./**/*.html", // ルート（index.html）と全てのサブフォルダのHTMLファイルを対象
    "./src/**/*.html", // src以下の全てのHTMLファイルを対象
    "./src/**/*.{js,html}", // jsファイルも対象に含める
  ],
  theme: {
    // 💡 extendではなく、theme直下でcolorsを定義することで、デフォルトカラーを上書きする
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff", // 白を明確に定義
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        // ... 他のグレーを省略（必要に応じて記述）
        800: "#1f2937", // brand-navyと統合
      },
      // 💡 定義したカスタムカラーをここで改めて定義する
      "brand-red": {
        DEFAULT: "#B0192A", // メインの赤
        light: "#D32F2F",
        dark: "#8B0000",
      },
      "brand-navy": {
        DEFAULT: "#1F2937", // 濃いネイビー（ヘッダー・フッター用）
      },
    },

    // 💡 extend内にフォントやその他の拡張要素を記述
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
