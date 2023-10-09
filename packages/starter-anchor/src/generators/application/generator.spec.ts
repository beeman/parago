import { getProjects, readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@parago/starter-common'

import { applicationGenerator } from './generator'
import { ApplicationGeneratorSchema } from './schema'

describe('application generator', () => {
  let tree: Tree
  const options: ApplicationGeneratorSchema = { name: 'anchor', programName: 'my-test-program' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await applicationGenerator(tree, options)
    const config = readProjectConfiguration(tree, options.name)
    expect(config).toBeDefined()
  })

  it('should snapshot the generated structure', async () => {
    await applicationGenerator(tree, options)

    const config = readProjectConfiguration(tree, options.name)
    const contents = getRecursiveFileContents(tree, config.root)
    const stringified = JSON.stringify(contents, null, 2)
    expect(stringified).toMatchSnapshot()
  })
})
