const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/джава.js', // Точка входа для сборки проекта

  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
    clean: true, // Очистка папки dist перед сборкой
  },

  module: {
    rules: [
      {
        test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
        use: ['style-loader', 'css-loader'], // Загрузчики для обработки CSS-файлов
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Поддержка форматов изображений
        type: 'asset/resource', // Автоматически копирует изображения в `dist`
      },
      {
        test: /\.js$/, // Для обработки JS
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Настройка для совместимости с разными браузерами
          },
        },
      },
    ],
  },

  plugins: [
    // Плагин для главной страницы
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'], // Использовать только основной chunk
      filename: 'index.html', // Выходной файл для этой страницы
    }),

    // Плагин для страницы проекта
    new HtmlWebpackPlugin({
      template: './src/projects.html',
      inject: true,
      chunks: ['index'],
      filename: 'projects.html',
    }),

    // Плагин для страницы задач
    new HtmlWebpackPlugin({
      template: './src/разметка.html',
      inject: true,
      chunks: ['index'],
      filename: 'разметка.html',
    }),

    // Плагин для страницы "О приложении"
    new HtmlWebpackPlugin({
      template: './src/about.html', // Шаблон для aboutpage
      inject: true,
      chunks: ['index'],
      filename: 'about.html',
    }),

    // Копирование изображений в dist
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/img'), to: 'img' },
      ],
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },

  mode: 'development', // Режим сборки
};
