module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // If you don't use Reanimated yet, you can omit "plugins" entirely.
    plugins: ['react-native-worklets/plugin'],
  };
};
