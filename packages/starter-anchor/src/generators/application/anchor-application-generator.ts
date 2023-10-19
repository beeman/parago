import { formatFiles, generateFiles, getProjects, names, Tree, updateJson } from '@nx/devkit'
import { libraryGenerator } from '@nx/js'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
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
        build: runCommand(project.root, 'anchor build'),
        clean: runCommand(project.root, 'anchor clean'),
        deploy: runCommand(project.root, 'anchor deploy'),
        localnet: runCommand(project.root, 'anchor localnet'),
        publish: runCommand(project.root, 'anchor publish'),
        jest: json.targets.test,
        test: runCommand(project.root, 'anchor test'),
      },
    }
  })

  const substitutions = {
    projectName: options.name,
    ...names(options.programName),
  }
  generateFiles(tree, path.join(__dirname, 'files'), options.name, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
  anchorApplicationDependencies(tree)
  addAnchorIgnoreFields(tree)

  removeSrcDirReferences(tree, options.name)
  await formatFiles(tree)
}

// By default, the root of a library is '{name}/src/*', but we want it to be '{name}/*'
function removeSrcDirReferences(tree: Tree, name: string) {
  // Update the references in the tsconfig.lib.json
  const project = getProjects(tree).get(name)
  const tsLibConfigPath = join(project.root, 'tsconfig.lib.json')
  const tsLibConfig = JSON.parse(tree.read(tsLibConfigPath).toString())
  tsLibConfig.compilerOptions.rootDir = '.'
  tsLibConfig.include = tsLibConfig.include.map((include: string) => include.replace('src/', ''))
  tsLibConfig.exclude = tsLibConfig.exclude.map((exclude: string) => exclude.replace('src/', ''))
  tree.write(tsLibConfigPath, JSON.stringify(tsLibConfig, null, 2))

  // Update the references in the tsconfig.spec.json
  const tsSpecConfigPath = join(project.root, 'tsconfig.spec.json')
  const tsSpecConfig = JSON.parse(tree.read(tsSpecConfigPath).toString())
  tsSpecConfig.compilerOptions.rootDir = '.'
  tsSpecConfig.include = tsSpecConfig.include.map((include: string) => include.replace('src/', ''))
  tree.write(tsSpecConfigPath, JSON.stringify(tsSpecConfig, null, 2))

  // Update the references in the .swcrc
  const swcrcConfigPath = join(project.root, '.swcrc')
  const swcrcConfig = JSON.parse(tree.read(swcrcConfigPath).toString())
  swcrcConfig.exclude = swcrcConfig.exclude.map((exclude: string) => exclude.replace('src/', ''))
  tree.write(swcrcConfigPath, JSON.stringify(swcrcConfig, null, 2))

  // Update the sourceRoot property in the project.json
  const projectJsonPath = join(project.root, 'project.json')
  const projectJson = JSON.parse(tree.read(projectJsonPath).toString())
  projectJson.sourceRoot = projectJson.sourceRoot.replace('/src', '')
  tree.write(projectJsonPath, JSON.stringify(projectJson, null, 2))

  // Update the paths property in the root tsconfig.base.json
  const tsBaseConfigPath = 'tsconfig.base.json'
  const tsBaseConfig = JSON.parse(tree.read(tsBaseConfigPath).toString())
  tsBaseConfig.compilerOptions.paths = {
    ...tsBaseConfig.compilerOptions.paths,
    [`@${getNpmScope(tree)}/${name}`]: [`${name}/index.ts`],
  }
  tree.write(tsBaseConfigPath, JSON.stringify(tsBaseConfig, null, 2))
}

export default anchorApplicationGenerator
