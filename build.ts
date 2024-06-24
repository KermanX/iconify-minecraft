import { readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import { blankIconSet, exportJSONPackage } from '@iconify/tools'
import { version } from './package.json'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const iconSet = blankIconSet('mc')

const aliasMap: Record<string, string> = {}
function addIcon(kind: string) {
  return (path: string) => {
    const name = basename(path, '.png').replaceAll('_', '-')
    const fullName = `${name}-${kind}`
    const b64 = readFileSync(path).toString('base64')
    iconSet.setIcon(fullName, {
      body: `<image href="data:image/png;base64,${b64}" width="16" height="16" image-rendering="pixelated" />`,
      width: 16,
      height: 16,
    })
    aliasMap[name] ??= fullName
  }
}

fg.sync('assets/items/**/*.png', { cwd: __dirname, absolute: true }).forEach(addIcon('item'))
const ignoredBlocks = fg.sync('assets/blocks/**/*.png.mcmeta', { cwd: __dirname, absolute: true }).map(path => path.slice(0, -7))
fg.sync('assets/blocks/**/*.png', { cwd: __dirname, absolute: true }).filter(path => !ignoredBlocks.some(i => path.startsWith(i))).forEach(addIcon('block'))
Object.entries(aliasMap).map(([alias, name]) => iconSet.setAlias(alias, name))

const target = resolve(__dirname, 'dist')
await exportJSONPackage(iconSet, {
  target,
  package: {
    name: `iconify-minecraft`,
    version,
    bugs: 'https://github.com/kermanx/iconify-minecraft/issues',
    homepage: 'https://github.com/kermanx/iconify-minecraft',
  },
  cleanup: true,
  customFiles: {
    'README.md': 'The Minecraft icons are belong to Mojang Studios. If there is any infringement, please contact us for removal.',
  },
})
