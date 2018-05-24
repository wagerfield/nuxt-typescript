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
      parallel: true
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

  // TypeScript checker plugin
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
        plugins: ["transform-vue-jsx"]
      },
      loaderOptions
    )
  })

  // Module rule factory
  const createRule = (test) => ({ test: test, use: [] })

  // Resolve .ts and .tsx file extensions
  this.nuxt.options.extensions.push("ts", ".tsx")

  // Extend webpack config
  this.extendBuild(function extendBuild(config) {
    config.resolve.extensions.push(".ts", ".tsx")
    config.plugins.push(tsChecker)

    // Create .ts and .tsx rules
    const tsRule = createRule(/((client|server)\.js)|(\.ts)$/)
    const tsxRule = createRule(/\.tsx$/)

    // Add .ts and .tsx rules
    config.module.rules.push(tsRule, tsxRule)

    // Add loader to .ts and .tsx rules
    const addLoader = (loader) => {
      tsRule.use.push(loader)
      tsxRule.use.push(loader)
    }

    // Add cache-loader
    addLoader({
      loader: "cache-loader",
      options: createCacheConfig("ts-loader", tsconfig)
    })

    // Add thread-loader
    if (useThreads) addLoader("thread-loader")

    // Add babel-loader
    addLoader(babelLoader())

    // Add ts-loader
    tsRule.use.push(tsLoader({ appendTsSuffixTo: [/\.vue$/] }))
    tsxRule.use.push(tsLoader({ appendTsxSuffixTo: [/\.vue$/] }))

    // Add ts and tsx loaders to vue-loader
    for (const rule of config.module.rules) {
      if (rule.loader === "vue-loader") {
        rule.options.loaders.ts = [babelLoader(), tsLoader()]
        rule.options.loaders.tsx = [babelLoader(), tsLoader()]
      }
    }
  })
}

module.exports.meta = require("./package.json")
