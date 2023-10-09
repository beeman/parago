import { formatFiles, Tree } from '@nx/devkit'
import { Linter } from '@nx/linter'
import { applicationGenerator as reactApplicationGenerator } from '@nx/react'
import { ApplicationGeneratorSchema } from './schema'

export async function applicationGenerator(tree: Tree, options: ApplicationGeneratorSchema) {
  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options)
  await reactApplicationGenerator(tree, {
    name: options.name,
    style: 'css',
    skipFormat: true,
    projectNameAndRootFormat: 'as-provided',
    unitTestRunner: 'none',
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    pascalCaseFiles: false,
    classComponent: false,
    routing: true,
    strict: true,
    rootProject: true,
    bundler: 'webpack',
  })
  await formatFiles(tree)
}

export default applicationGenerator
