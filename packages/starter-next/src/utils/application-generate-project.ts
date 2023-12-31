import { getProjects, Tree } from '@nx/devkit'
import { Linter } from '@nx/linter'
import { applicationGenerator as reactApplicationGenerator } from '@nx/next/src/generators/application/application'

export async function applicationGenerateProject(tree: Tree, options: { name: string }) {
  await reactApplicationGenerator(tree, {
    name: options.name,
    style: 'css',
    skipFormat: true,
    projectNameAndRootFormat: 'as-provided',
    unitTestRunner: 'none',
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    rootProject: false,
  })

  return getProjects(tree).get(options.name)
}
