export interface AddonOptions {
  document: Document
  setOnMove: (listener: () => any) => void
}
export type Addon = (options: AddonOptions) => void | Promise<void>
export const defineAddon = (init: Addon) => init