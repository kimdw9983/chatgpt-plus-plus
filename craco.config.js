module.exports = {
  webpack: {
    configure: (webpackConfig, {env, paths}) => {
      return {
        ...webpackConfig,
        entry: {
          main: [env === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs].filter(Boolean),
          content: './src/scripts/main.tsx',
        },
        output: {
          ...webpackConfig.output,
          filename: 'static/scripts/[name].js',
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        }
      }
    },
  }
}