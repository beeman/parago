import { names } from '@nx/devkit'
import { ApplicationGeneratorSchema } from '../generators/application/schema'

export function applicationSubstitutions(options: ApplicationGeneratorSchema) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require('../../package.json')
  return {
    ...options,
    ...names(options.name),
    packageName: packageJson.name,
    packageVersion: packageJson.version,
  }
}
