import type { XWrapper } from "../core/x_wrapper"
export type Addon = (options: {
  wrapper: XWrapper
}) => void | Promise<void>
export const defineAddon = (init: Addon) => init