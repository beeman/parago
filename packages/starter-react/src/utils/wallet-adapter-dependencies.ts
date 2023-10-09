import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { packageVersion } from '@parago/starter-common'

export function walletAdapterDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {
      '@solana/wallet-adapter-base': packageVersion['@solana']['wallet-adapter-base'],
      '@solana/wallet-adapter-react': packageVersion['@solana']['wallet-adapter-react'],
      '@solana/wallet-adapter-react-ui': packageVersion['@solana']['wallet-adapter-react-ui'],
      '@solana/wallet-adapter-wallets': packageVersion['@solana']['wallet-adapter-wallets'],
    },
    {
      'crypto-browserify': packageVersion['crypto-browserify'],
      'stream-browserify': packageVersion['stream-browserify'],
    },
  )
}
