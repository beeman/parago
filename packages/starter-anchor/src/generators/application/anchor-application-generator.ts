import { formatFiles, generateFiles, getProjects, names, Tree, updateJson } from '@nx/devkit'
import { libraryGenerator } from '@nx/js'
import { applicationCleanup, runCommand } from '@parago/starter-common'
import * as path from 'path'
import { join } from 'path'
import { addAnchorIgnoreFields, anchorApplicationDependencies } from '../../utils'
import { ApplicationGeneratorSchema } from './anchor-application-schema'

export async function anchorApplicationGenerator(tree: Tree, options: ApplicationGeneratorSchema) {
  await libraryGenerator(tree, {
    name: options.name,
    bundler: 'rollup',
    unitTestRunner: 'jest',
    skipFormat: true,
    linter: 'eslint',
  })
  const project = getProjects(tree).get(options.name)
  applicationCleanup(tree, join(project.sourceRoot))

  updateJson(tree, join(project.root, 'project.json'), (json) => {
    return {
      ...json,
      targets: {
        ...json.targets,
        build: runCommand(project.root, ['anchor build', 'cp -rv target/types/* src/output']),
        clean: runCommand(project.root, 'anchor clean'),
        deploy: runCommand(project.root, 'anchor deploy'),
        localnet: runCommand(project.root, 'anchor localnet'),
        publish: runCommand(project.root, 'anchor publish'),
        'anchor-test': runCommand(project.root, 'anchor test'),
      },
    }
  })

  const substitutions = {
    ...names(options.programName),
  }
  generateFiles(tree, path.join(__dirname, 'files'), options.name, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
  anchorApplicationDependencies(tree)
  addAnchorIgnoreFields(tree)

  await formatFiles(tree)
}

export default anchorApplicationGenerator
