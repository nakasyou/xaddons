import type { BuildConfig } from 'bun'

import { watch, readFile, copyFile } from "fs/promises"
import * as path from 'path'

import { emptyDir } from './utils/fs'
await emptyDir('dist')

const watcher = watch(process.cwd(), { recursive: true })

const isv2 = Bun.argv[2] === 'v2'
for await (const _event of watcher) {
  const addonsData = (await import("../addons/addons.json")).default
  
  const addonsBuild = (async () => {
    const baseConfig: BuildConfig = {
      entrypoints: addonsData.addons.map(addon => path.join('addons', addon.entry, 'index.ts')),
      outdir: "dist/addons",
    }
    await Bun.build(baseConfig)
    await copyFile('./addons/addons.json', './dist/addons/addons.json')
  })()
  const contentScriptsBuild = (async () => {
    const baseConfig: BuildConfig = {
      entrypoints: ['content_scripts/dev.ts', 'content_scripts/dev_launch.ts'],
      outdir: './dist/content_scripts'
    }
    await Bun.build(baseConfig)
  })()
  const settingBuild = (async () => {
    const manifest: typeof import('../manifest_v2.json') = JSON.parse(
      await readFile(`./manifest_v${isv2 ? 2 : 3}.json`, 'utf-8')
      )
    manifest.content_scripts[0].js[0] = 'content_scripts/dev.js'
    await Bun.write('./dist/manifest.json', JSON.stringify(manifest, null, 2))
  })()
  await Promise.all([
    addonsBuild,
    contentScriptsBuild,
    settingBuild
  ])
  console.log("Rebuilded")
}
