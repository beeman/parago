export function applicationSubstitutions(options = {}) {
  const packageJson = require('../../package.json')
  return {
    ...options,
    packageName: packageJson.name,
    packageVersion: packageJson.version,
  }
}
