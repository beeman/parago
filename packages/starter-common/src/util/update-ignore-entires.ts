import { Tree } from '@nx/devkit'

export function updateIgnoreEntries(tree: Tree, file: string, paths: string[]) {
  const ignoreFile = tree.read(file)
  if (ignoreFile) {
    const entries = ignoreFile.toString().split('\n')
    const newEntries = entries.concat(paths)
    tree.write(file, newEntries.join('\n'))
  }
}
