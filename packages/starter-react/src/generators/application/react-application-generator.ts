import { formatFiles, generateFiles, installPackagesTask, Tree } from '@nx/devkit'
import { applicationCleanup } from '@parago/starter-common'
import { join } from 'path'
import {
  applicationDependencies,
  applicationGenerateProject,
  applicationSubstitutions,
  applicationTailwindConfig,
  walletAdapterDependencies,
} from '../../utils'
import { ReactApplicationSchema } from './react-application-schema'

export async function applicationGenerator(tree: Tree, options: ReactApplicationSchema) {
  // Set up the base project.
  const project = await applicationGenerateProject(tree, options)
  // Clean up the default project files.
  applicationCleanup(tree, join(project.sourceRoot, 'app'))
  // Generate the files from the templates.
  generateFiles(tree, join(__dirname, 'files'), project.root, applicationSubstitutions(options))
  // Add the dependencies for the base application.
  applicationDependencies(tree)
  // Add the dependencies for the wallet adapter.
  walletAdapterDependencies(tree)
  // Add the tailwind config.
  await applicationTailwindConfig(tree, options.name)
  // Format the files.
  await formatFiles(tree)

  // Install the packages on exit.
  return () => {
    installPackagesTask(tree, true)
  }
}

export default applicationGenerator
