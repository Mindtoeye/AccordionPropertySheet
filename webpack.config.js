const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const resolve = require('path').resolve;

const config = {
  mode: 'development',
  entry: __dirname + '/js/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      publicPath: '.'
    },
    compress: false,
    port: 8084,
  },
  plugins: [
   new HtmlWebpackPlugin({
    favicon: "./css/images/favicon.ico", 
    template: 'views/index.html',
    inject: false
   })
 ],
 resolve: {
   extensions: ['', '.js', '.jsx']
 },
 module: {
  rules: [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env','@babel/preset-react']
      }
    }
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.(png|svg|jpe?g|gif)$/i,
    use: {
      loader: 'file-loader',
      options: {
        publicPath: '.',
      }
    }
  },
  { 
    enforce: 'post', 
    test: /unicode-properties[/\\]index.js$/, 
    use: {
      loader: "transform-loader?brfs" 
    }
  },
  { 
    enforce: 'post', 
    test: /linebreak[/\\]src[/\\]linebreaker.js/, 
    use: {
      loader: "transform-loader?brfs"
    }
  },
  { 
    test: /src[/\\]assets/, 
    use: {
      loader: 'arraybuffer-loader'
    }
  },
  { 
    test: /\.afm$/, 
    use: {
      loader: 'raw-loader'
    }
  }]
 }
};

module.exports = config;
