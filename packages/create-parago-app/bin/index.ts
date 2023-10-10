#!/usr/bin/env node
import { consola } from 'consola'
import { createWorkspace } from 'create-nx-workspace'
import * as process from 'process'

// This assumes "@parago/starter-common" and "create-parago-app" are at the same version
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')
const meta = {
  name: packageJson.name,
  version: packageJson.version,
}

async function main() {
  consola.info(`${meta.name} v${meta.version}`)
  const name = await consola.prompt('Enter project name', {
    placeholder: 'Enter your name',
    initial: process.argv[2],
  })

  const preset = await consola.prompt('Pick a project type.', {
    type: 'select',
    options: [
      { label: 'React', value: '@parago/starter-react', hint: 'React SPA with react-router-dom' },
      { label: 'Next.js', value: '@parago/starter-next', hint: 'Next.js with file-system routing' },
    ],
  })
  consola.box({
    title: 'Project summary',
    message: [`Name   → \`${name}\``, `Preset → \`${preset}\``].join('\n'),
    style: {
      padding: 1,
      borderColor: 'magenta',
      borderStyle: 'rounded',
    },
  })

  const res = await consola.prompt('Do you want to continue?', {
    type: 'confirm',
    initial: true,
  })
  if (!res) {
    consola.warn('Generation cancelled')
    return
  }

  const presetPackage = `${preset}@${meta.version}`
  consola.start(`Creating the workspace: ${name} with preset ${presetPackage}`)

  const { directory } = await createWorkspace(presetPackage, {
    name,
    nxCloud: false,
    packageManager: 'yarn',
  })
  consola.success(`Successfully created the workspace: ${directory}.`)
}

main()
