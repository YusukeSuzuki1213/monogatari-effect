const MODE = 'development';
const enabledSourceMap = MODE === 'development';

// eslint-disable-next-line no-undef
module.exports = {
  mode: MODE,
  entry: `./src/index.ts`,

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  devServer: {
    contentBase: 'dist',
    open: true,
  },

  output: {
    filename: 'main.js',
  },
};
