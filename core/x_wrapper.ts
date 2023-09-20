import { GetStateReturn, getState } from "./get_state"

export interface XWrapperEvent {
  move: Record<string, (() => any)>
}
export class XWrapper {
  events: XWrapperEvent
  constructor () {
    this.events = {
      move: {}
    }
    this.initEvents()
  }
  /**
   * addEventListener的な
   * @param eventType イベントのタイプ
   * @param listener リスナー
   * @param id リスナーのID
   */
  on <T extends keyof XWrapperEvent> (eventType: T, listener: XWrapperEvent[T][string], id: string) {
    this.events[eventType as keyof XWrapperEvent][id] = listener
  }
  /**
   * イベントを削除する
   * @param eventType イベントのタイプ
   * @param id リスナーのID
   */
  removeEventListener <T extends keyof XWrapperEvent> (eventType: T, id: string) {
    delete this.events[eventType][id]
  }
  /**
   * イベントを発火させる
   * @param eventType イベントのタイプ
   */
  async dispatchEvent <T extends keyof XWrapperEvent> (eventType: T, ...args: Parameters<XWrapperEvent[T][string]>) {
    await Promise.all(Object.values(this.events[eventType]).map(
      (listener) => 
        (async () =>
          // @ts-expect-error TypeScriptの型推論が多分悪い
          listener(...args))()
      )
    )
  }
  /**
   * window.documentを返却する
   */
  getDocument(): Document {
    return window.document
  }
  /**
   * イベントの初期化
   */
  initEvents (): void {
    let lastUrl: string = ''

    const moveSearch = () => {
      if (lastUrl !== location.href) {
        this.dispatchEvent('move')
        lastUrl = location.href
      }
      requestAnimationFrame(moveSearch)
    }
    moveSearch()
    this.dispatchEvent('move')
  }
  /**
   * Xの状態を取得する
   */
  getState (): GetStateReturn {
    return getState()
  }
}
