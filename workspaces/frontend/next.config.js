const withBundleAnalyzer = require('@next/bundle-analyzer')

const compose = plugins => ({
  webpack(config, { isServer }) {
    const antStyles = /antd\/.*?\/style\/css.*?/
    const origExternals = [...config.externals]
    config.externals = [
      (context, request, callback) => {
        if (request.match(antStyles)) return callback()
        if (typeof origExternals[0] === 'function') {
          origExternals[0](context, request, callback)
        } else {
          callback()
        }
      },
      ...(typeof origExternals[0] === 'function' ? [] : origExternals),
    ]

    config.module.rules.unshift({
      test: antStyles,
      use: 'null-loader',
    })
    return config
  },

  webpackDevMiddleware(config) {
    return plugins.reduce((config, plugin) => {
      if (plugin instanceof Array) {
        const [_plugin, ...args] = plugin
        plugin = _plugin(...args)
      }
      if (plugin instanceof Function) {
        plugin = plugin()
      }
      if (plugin && plugin.webpackDevMiddleware instanceof Function) {
        return plugin.webpackDevMiddleware(config)
      }
      return config
    }, config)
  },
})

module.exports = compose([
  [
    withBundleAnalyzer,
    {
      enabled: process.env.ANALYZE === 'true',
    },
  ],
])
