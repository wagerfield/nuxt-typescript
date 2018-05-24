const fs = require("fs")
const path = require("path")

function addPackageVersion(cache, pkg) {
  const pkgPath = path.join(pkg, "package.json")
  cache[pkg] = require(pkgPath).version // eslint-disable-line
}

module.exports = function createCacheConfig(id, configFile) {
  const cache = { env: process.env.NODE_ENV || "development" }

  // Add package versions to cache
  addPackageVersion(cache, "cache-loader")
  addPackageVersion(cache, id)

  // Add config file to cache
  if (configFile && fs.existsSync(configFile)) {
    cache.configFile = JSON.parse(fs.readFileSync(configFile, "utf-8"))
  }

  return {
    cacheDirectory: path.resolve(process.cwd(), "node_modules/.cache", id),
    cacheIdentifier: JSON.stringify(cache)
  }
}
