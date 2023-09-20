import { RegExpRouter } from 'hono/router/reg-exp-router'

export type StateType = 
  'home' |
  'post' |
  'unknown'

interface HomeState {
  type: 'home'
}
interface PostState {
  type: 'post'
  
  username: string
}
interface UnknownState {
  type: 'unknown'
}
export type GetStateReturn = HomeState | PostState | UnknownState

const router = new RegExpRouter<StateType>()

router.add('GET', '/home', 'home') // Home
router.add('GET', '/:username/status/:postid', 'post') // Home

export const getState = (): GetStateReturn => {
  const routerResult = router.match('GET', location.pathname)

  if (!routerResult) {
    return {
      type: 'unknown'
    }
  }

  switch (routerResult.handlers[0]) {
    case 'home': {
      return {
        type: 'home'
      }
    }
    case 'post': {
      console.log(routerResult)
      return {
        type: 'post',
        username: ''
      }
    }
  }
  return {
    type: 'unknown'
  }
}