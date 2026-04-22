function webpackPlugin(context, options) {
  const isExtensionRuntimeError = (error) => {
    const message = (error && (error.message || error.toString())) || '';
    const stack = (error && error.stack) || '';
    const text = `${message}\n${stack}`;

    return (
      text.includes('chrome-extension://') ||
      text.includes('Could not establish connection. Receiving end does not exist.') ||
      text.includes('Failed to connect to MetaMask')
    );
  };

  return {
    name: 'webpack-plugin',
    configureWebpack(config, isServer, { currentBundler }) {
      return {
        ...(isServer
          ? {}
          : {
              devServer: {
                client: {
                  overlay: {
                    runtimeErrors: (error) => !isExtensionRuntimeError(error),
                  },
                },
              },
            }),
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
        plugins: [
          new currentBundler.instance.ProvidePlugin({
            process: require.resolve('process/browser'),
          }),
        ],
        resolve: {
          fallback: {
            stream: require.resolve('stream-browserify'),
            path: require.resolve('path-browserify'),
            buffer: require.resolve('buffer/'),
            url: require.resolve('url'),
            crypto: false,
          },
          alias: {
            process: 'process/browser.js',
          },
        },
      };
    },
  };
}

module.exports = {
  webpackPlugin,
};
