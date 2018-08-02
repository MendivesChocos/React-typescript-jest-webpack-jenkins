// load the default config generator.
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.tsx?$/,
    loader: require.resolve('awesome-typescript-loader')
  });
  defaultConfig.module.rules.push({
    test: /\.tsx?$/,
    enforce: 'pre',
    loader: require.resolve('tslint-loader')
  });
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, '../')
  });

  defaultConfig.plugins.push(new FriendlyErrorsWebpackPlugin());
  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  defaultConfig.resolve.alias = {
    '@app': path.resolve(process.cwd())
  };
  return defaultConfig;
};
