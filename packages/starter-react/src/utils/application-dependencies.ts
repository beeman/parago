import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { packageVersion } from '@parago/starter-common'

export function applicationDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {
      daisyui: packageVersion.daisyui,
      '@tailwindcss/typography': packageVersion['@tailwindcss'].typography,
    },
    {
      '@swc-node/core': packageVersion['@swc-node'].core,
      '@swc-node/register': packageVersion['@swc-node'].register,
      'tsconfig-paths': packageVersion['tsconfig-paths'],
    },
  )
}
