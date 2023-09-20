import { mainTweetLoaded } from "../../utils/tweet"
import type { Addon } from "../addon"

export default (async ({ wrapper }) => {
  wrapper.on('move', async () => {
    await mainTweetLoaded()
    const target = document.querySelector('div.r-1r5su4o:nth-child(4)')
    
    const injectElement = document.createElement('div')
    injectElement.innerHTML = `
      <div style="display: flex; justify-content: between;">
        <div>
          <a href="${location.href}/likes" class="css-4rbku5 css-18t94o4 css-1dbjc4n r-1awozwy r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1h3ijdo r-1777fci r-s8bhmr r-1ny4l3l r-1qhn6m8 r-i023vh r-o7ynqc r-6416eg">Likes</a>
        </div>
      </div>
    `
    target?.append(injectElement)
    console.log(wrapper.getState(), 'x')

  }, 'addon.view_user_actions_0')

}) satisfies Addon
