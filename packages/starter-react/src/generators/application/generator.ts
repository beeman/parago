import { addDependenciesToPackageJson, formatFiles, generateFiles, installPackagesTask, Tree } from '@nx/devkit'
import { Linter } from '@nx/linter'
import { applicationGenerator as reactApplicationGenerator, setupTailwindGenerator } from '@nx/react'
import path from 'path'
import { ApplicationGeneratorSchema } from './schema'

export async function applicationGenerator(tree: Tree, options: ApplicationGeneratorSchema) {
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
  // Delete files in 'src/app' folder
  const list = tree.children('src/app')
  console.log(`List of files in 'src/app': ${list.join(', ')}`)
  list.forEach((file) => {
    const filePath = path.join('src/app', file)
    console.log(` 💣  Delete file: ${filePath}`)
    tree.delete(filePath)
  })
  const packageJson = require('../../../package.json')
  generateFiles(tree, path.join(__dirname, 'files'), '.', {
    ...options,
    packageName: packageJson.name,
    packageVersion: packageJson.version,
  })
  await setupTailwindGenerator(tree, {
    project: options.name,
    skipFormat: true,
  })
  addDependenciesToPackageJson(
    tree,
    {
      daisyui: 'latest',
    },
    {
      '@swc-node/core': 'latest',
      '@swc-node/register': 'latest',
      'tsconfig-paths': 'latest',
    },
  )
  await formatFiles(tree)
  const tailwindConf = tree.read('tailwind.config.js').toString()
  tree.write('tailwind.config.js', tailwindConf.replace('plugins: []', "plugins: [require('daisyui')]"))
  return () => {
    console.log(`Run yarn install`)
    installPackagesTask(tree, true)
  }
}

export default applicationGenerator
