// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = file => {};
// }
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const _ = require('lodash')

/**
 *
 * @param plugins
 * @return {{webpack(*, {isServer: *}): *, webpackDevMiddleware(*=): *}}
 */
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

const lessLoaderOptions = { lessLoaderOptions: { javaEnabled: true } }

module.exports = withPlugins(
  [[withLess], [withCSS]],
  _.merge(
    {},
    { lessLoaderOptions: { javascriptEnabled: true } },
    compose([
      [
        withBundleAnalyzer,
        {
          enabled: process.env.ANALYZE === 'true',
        },
      ],
    ])
  )
)
