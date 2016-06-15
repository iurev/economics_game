/// <reference path="../../typings/index.d.ts" />
/// <reference path="./camera.d.ts" />
/// <reference path="./initial_state.d.ts" />
/// <reference path="./stock.d.ts" />
/// <reference path="./planet.d.ts" />

import { create, getStockById, getResourceById } from './db'
import createResource from './resource'
import { ResourceTypes, getResource } from './resource'
import { random } from 'lodash'

export const update = (state: State, stockId: number) => {
  let stock: Stock = getStockById(state, stockId)
  ResourceTypes.forEach((resourceName) => {
    let resource: Resource = getResource(state, stockId, resourceName)
    resource.amount += random(-5, 5)
  })
}

export default (state: State): number => {
  let stock: Stock = {
    foodResourceId: createResource(state),
    energyResourceId: createResource(state),
    machinesResourceId: createResource(state)
  }
  return create(state, 'stocks', stock)
}
