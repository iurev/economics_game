/// <reference path="../../typings/index.d.ts" />
/// <reference path="./camera.d.ts" />
/// <reference path="./initial_state.d.ts" />
/// <reference path="./stock.d.ts" />

import { create } from './db'
import createResource from './resource'

export default (state: State): number => {
  let stock: Stock = {
    foodResourceId: createResource(state),
    energyResourceId: createResource(state),
    machinesResourceId: createResource(state)
  }
  return create(state, 'stocks', stock)
}
