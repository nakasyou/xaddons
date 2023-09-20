import addons from '../addons/addons.json'
import type { Addon } from '../addons/addon'
import { XWrapper } from './x_wrapper'

const xWrapper = new XWrapper()
console.log('init')
// 各アドオンの初期化
for (const addon of addons.addons) {
  (async () => {
    const module = await import(`../addons/${addon.entry}/index.js`) as {
      default: Addon
    }
    module.default({
      wrapper: xWrapper
    })
  })()
}
