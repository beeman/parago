import { Tree } from '@nx/devkit'
import { setupTailwindGenerator } from '@nx/react'

export async function applicationTailwindConfig(tree: Tree, project: string) {
  await setupTailwindGenerator(tree, { project, skipFormat: true })
  const tailwindConf = tree.read('tailwind.config.js').toString()
  tree.write('tailwind.config.js', tailwindConf.replace('plugins: []', "plugins: [require('daisyui')]"))
}
