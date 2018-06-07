const fs = require("fs")
const path = require("path")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const createCacheConfig = require("./cache")

module.exports = function NuxtTypeScript(moduleOptions) {
  // Build module options
  const options = Object.assign(
    {
      tslint: "tslint.json",
      tsconfig: "tsconfig.json",
      formatter: "codeframe",
      parallel: true,
      checker: true
    },
    this.options.typescript,
    moduleOptions
  )

  // Compiler flags
  const isProduction = process.env.NODE_ENV === "production"
  const useThreads = isProduction && options.parallel

  // Resolve config paths
  const cwd = process.cwd()
  const tslint = path.resolve(cwd, options.tslint)
  const tsconfig = path.resolve(cwd, options.tsconfig)

  // Create TypeScript checker plugin
  const tsChecker = new ForkTsCheckerWebpackPlugin({
    tsconfig: fs.existsSync(tsconfig) && tsconfig,
    tslint: fs.existsSync(tslint) && tslint,
    checkSyntacticErrors: useThreads,
    formatter: options.formatter,
    vue: true
  })

  // TypeScript loader factory
  const tsLoader = (loaderOptions) => ({
    loader: "ts-loader",
    options: Object.assign(
      {
        configFile: tsconfig,
        transpileOnly: true,
        happyPackMode: useThreads
      },
      loaderOptions
    )
  })

  // Babel loader factory
  const babelLoader = (loaderOptions) => ({
    loader: "babel-loader",
    options: Object.assign(
      {
        presets: [
          [
            require.resolve('babel-preset-vue-app')
          ]
        ]
      },
      loaderOptions
    )
  })

  // Module rule factory
  const createRule = (test) => ({ test: test, use: [] })

  // Resolve .ts and .tsx file extensions
  this.nuxt.options.extensions.push("ts", "tsx")

  // Extend webpack config
  this.extendBuild(function extendBuild(config) {
    config.resolve.extensions.push(".ts", ".tsx")

    // Add TypeScript checker plugin
    if (options.checker) {
      config.plugins.push(tsChecker)
    }

    // Create TypeScript rule
    const tsRule = createRule(/((client|server)\.js)|(\.tsx?)$/)

    // Add TypeScript rule
    config.module.rules.push(tsRule)

    // Add cache-loader
    tsRule.use.push({
      loader: "cache-loader",
      options: createCacheConfig("ts-loader", tsconfig)
    })

    // Add thread-loader
    if (useThreads) tsRule.use.push("thread-loader")

    // Add babel-loader
    tsRule.use.push(babelLoader())

    // Add ts-loader
    tsRule.use.push(tsLoader({ appendTsxSuffixTo: [/\.vue$/] }))

    // Add ts and tsx loaders to vue-loader
    for (const rule of config.module.rules) {
      if (rule.loader === "vue-loader") {
        rule.options.loaders = rule.options.loaders || {}
        rule.options.loaders.ts = [babelLoader(), tsLoader()]
        rule.options.loaders.tsx = [babelLoader(), tsLoader()]
      }
    }
  })
}

module.exports.meta = require("./package.json")
