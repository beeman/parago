import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { packageVersion } from '@parago/starter-common'

export function anchorApplicationDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {
      '@coral-xyz/anchor': packageVersion['@coral-xyz'].anchor,
    },
    {},
  )
}
