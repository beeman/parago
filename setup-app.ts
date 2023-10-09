import { execSync } from 'child_process'
import { mkdirSync } from 'fs'
import { join } from 'path'

function createAppName(prefix = 'app-') {
  const date = new Date()
  const time = date.getTime()
  return `${prefix}${time}`
}

function createTempDir(name: string) {
  const tempDir = join('/tmp/apps/', name)
  mkdirSync(tempDir, { recursive: true })
  return tempDir
}

function createNxWorkspace(target: string) {
  const [name, ...cwd] = target.split('/').reverse()
  const command = `npx create-nx-workspace@latest ${name} --preset=empty --pm yarn --cli=nx --nx-cloud=false --interactive=false`
  console.log(`Running command: ${command}`)
  execSync(command, { stdio: 'inherit', cwd: cwd.reverse().join('/') })
  console.log(`Done running command: ${command}`)
}

async function main() {
  const appName = createAppName()
  const tempDir = createTempDir(appName)
  console.log(`Created temp dir at ${tempDir}`)
  createNxWorkspace(tempDir)
  const preset = `@parago/starter-react`

  console.log(`Adding preset ${preset}`)
  execSync(`yarn add ${preset}`, { stdio: 'inherit', cwd: tempDir })
  console.log(`Create app ${preset}:application web`)
  execSync(`nx generate ${preset}:application web --ui-library tailwind`, { stdio: 'inherit', cwd: tempDir })
  console.log(`Running yarn install`)
  execSync(`yarn install`, { stdio: 'inherit', cwd: tempDir })
  console.log(`Check your app at ${tempDir}`)
}

main()
  .then(() => console.log('Done'))
  .catch((err) => console.error(err))
