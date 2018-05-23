function extendBuild(config) {
  // Resolve .ts and .tsx file extensions
  config.resolve.extensions.push(".ts", ".tsx")

  // Add ts-loader for .ts files
  config.module.rules.push({
    test: /((client|server)\.js)|(\.ts)$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  })

  // Add ts-loader for .tsx files
  config.module.rules.push({
    test: /\.tsx$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          plugins: ["transform-vue-jsx"]
        }
      },
      {
        loader: "ts-loader",
        options: {
          appendTsxSuffixTo: [/\.vue$/]
        }
      }
    ]
  })

  // Add ts and tsx lang loaders to vue-loader
  for (const rule of config.module.rules) {
    if (rule.loader === "vue-loader") {
      // Add loaders for lang="ts"
      rule.options.loaders.ts = [
        {
          loader: "ts-loader"
        }
      ]
      // Add loaders for lang="tsx"
      rule.options.loaders.tsx = [
        {
          loader: "babel-loader",
          options: {
            plugins: ["transform-vue-jsx"]
          }
        },
        {
          loader: "ts-loader"
        }
      ]
    }
  }
}

module.exports = function nuxtTypeScript() {
  this.nuxt.options.extensions.push("ts", ".tsx")
  this.extendBuild(extendBuild)
}
