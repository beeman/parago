import { formatFiles, installPackagesTask, Tree } from '@nx/devkit'
import { applicationDependencies, walletAdapterDependencies } from '@parago/starter-react'
import { applicationGenerateProject } from '../../utils'
import { NextApplicationSchema } from './next-application-schema'

export async function applicationGenerator(tree: Tree, options: NextApplicationSchema) {
  // Set up the base project.
  const project = await applicationGenerateProject(tree, options)
  // Clean up the default project files.
  // applicationCleanup(tree, join(project.sourceRoot, 'app'))
  // Generate the files from the templates.
  // generateFiles(tree, join(__dirname, 'files'), project.root, applicationSubstitutions(options))
  // Add the dependencies for the base application.
  applicationDependencies(tree)
  // Add the dependencies for the wallet adapter.
  walletAdapterDependencies(tree)
  //// Add the tailwind config.
  // await applicationTailwindConfig(tree, options.name)
  // Format the files.
  await formatFiles(tree)

  // Install the packages on exit.
  return () => {
    installPackagesTask(tree, true)
  }
}

export default applicationGenerator
