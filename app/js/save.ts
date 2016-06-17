/// <reference path="../../typings/index.d.ts" />
/// <reference path="./initial_state.d.ts" />

import { clone } from 'lodash'

export const copy = (state: State): State => {
  let copied: any = {}
  Object.keys(state).forEach((key) => {
    copied[key] = clone(state[key])
  })
  copied.threeObjects = {}
  return copied
}

export default (state: State) => {
  let copied: State = copy(state)
  window.localStorage.setItem('save', JSON.stringify(copied))
}
