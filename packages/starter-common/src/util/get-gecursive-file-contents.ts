import { Tree } from '@nx/devkit'

export interface FileContents {
  path: string
  content?: string
  children?: Record<string, FileContents>
}

export function getRecursiveFileContents(tree: Tree, path: string) {
  const contents: Record<string, FileContents> = {}
  const dir = tree.children(path)
  dir.forEach((file) => {
    if (tree.isFile(`${path}/${file}`)) {
      contents[file] = {
        path: `${path}/${file}`,
        content: tree.read(`${path}/${file}`).toString(),
      }
    } else {
      contents[file] = {
        path: `${path}/${file}`,
        children: getRecursiveFileContents(tree, `${path}/${file}`),
      }
    }
  })

  return contents
}
