import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree, readProjectConfiguration } from '@nx/devkit'

import { applicationGenerator } from './next-application-generator'
import { NextApplicationSchema } from './next-application-schema'

describe('application generator', () => {
  let tree: Tree
  const options: NextApplicationSchema = { name: 'test' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await applicationGenerator(tree, options)
    const config = readProjectConfiguration(tree, 'test')
    expect(config).toBeDefined()
  })
})
