import addons from '../addons/addons.json'
import type { Addon } from '../addons/addon'

const moveEvents: (() => any)[] = []
let lastUrl = ''
setInterval(() => {
  if (lastUrl !== location.href) {
    lastUrl = location.href
    Promise.all(moveEvents.map((moveEvent) => (async () => moveEvent())()))
  }
})
for (const addon of addons.addons) {
  (async () => {
    const module = await import(`../addons/${addon.entry}/index.js`) as {
      default: Addon
    }
    module.default({
      document,
      setOnMove (listener) {
        moveEvents.push(listener)
      }
    })
  })()
}
