import { names } from '@nx/devkit'
import { ReactApplicationSchema } from '../generators/application/react-application-schema'

export function applicationSubstitutions(options: ReactApplicationSchema) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require('../../package.json')
  return {
    ...options,
    ...names(options.name),
    packageName: packageJson.name,
    packageVersion: packageJson.version,
  }
}
