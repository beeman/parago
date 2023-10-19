import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree, readProjectConfiguration } from '@nx/devkit'
import { getRecursiveFileContents } from '@parago/starter-common'

import { applicationGenerator } from './react-application-generator'
import { ApplicationGeneratorSchema } from './react-application-schema'

describe('application generator', () => {
  let tree: Tree
  const options: ApplicationGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await applicationGenerator(tree, options)
    const config = readProjectConfiguration(tree, 'test')
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
