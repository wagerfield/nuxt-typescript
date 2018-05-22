function extendBuild(config) {
  const tsLoader = {
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/]
    }
  }

  // Add TypeScript loader to Webpack rules
  config.module.rules.push(
    Object.assign(
      {
        test: /((client|server)\.js)|(\.tsx?)$/
      },
      tsLoader
    )
  )

  // Add TypeScript loader for vue files
  for (const rule of config.module.rules) {
    if (rule.loader === 'vue-loader') {
      rule.options.loaders.ts = tsLoader
    }
  }

  // Add .ts extension in webpack resolve
  if (config.resolve.extensions.indexOf('.ts') === -1) {
    config.resolve.extensions.push('.ts')
  }
}

module.exports = function nuxtTypeScript() {
  this.nuxt.options.extensions.push('ts')
  this.extendBuild(extendBuild)
}
