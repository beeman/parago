import { packageVersion } from './packages/starter-common/src/util/package-versions'

const pvs: any = { ...packageVersion }

const keys = Object.keys(pvs)

// const packages: string[] = []
const packages: { name: string; version: string }[] = []

for (const key of keys) {
  if (!key.startsWith('@')) {
    packages.push({ name: key, version: pvs[key] as string })
  } else {
    // console.log(pvs[key])
    const subKeys: string[] = Object.keys(pvs[key] as any)
    for (const subKey of subKeys) {
      packages.push({ name: `${key}/${subKey}`, version: pvs[key][subKey] as string })
    }
  }
}

function checkPackageVersionOnNpm(packageName: string) {
  const { execSync } = require('child_process')
  return execSync(`npm view ${packageName} version`).toString().trim()
}

const outdated: { name: string; version: string; latest: string }[] = []

for (const current of packages) {
  const latest = checkPackageVersionOnNpm(current.name)
  if (current.version.replace('^', '') !== latest) {
    outdated.push({ name: current.name, version: current.version, latest })
  } else {
    console.log(`${current.name} is up to date`)
  }
}

for (const outdatedElement of outdated) {
  console.log(`${outdatedElement.name} is outdated: ${outdatedElement.version} -> ${outdatedElement.latest}`)
}
// console.log(JSON.stringify(packages, null, 2))
