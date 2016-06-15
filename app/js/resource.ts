/// <reference path="../../typings/index.d.ts" />
/// <reference path="./stock.d.ts" />
/// <reference path="./initial_state.d.ts" />
/// <reference path="./planet.d.ts" />
/// <reference path="./resource.d.ts" />

import { create, getResourceById, getStockById } from './db'

export const ResourceTypes = ['food', 'machines', 'energy']

const initialState: Resource = {
  amount: 10,
  buyPrice: 1,
  cellPrice: 2
}

export const update = (state: State, resourceId: number, amount: number) => {
  let resource: Resource = getResourceById(state, resourceId)
  let newAmount = resource.amount + amount
  if (newAmount < 0) newAmount = 0
  resource.amount = newAmount
  resource.buyPrice = 10
  resource.cellPrice = 10
}

export const transaction = (state: State, leftResourceId: number, rightResourceId: number, amount: number) => {
  let leftResource: Resource = getResourceById(state, leftResourceId)
  let rightResource: Resource = getResourceById(state, rightResourceId)
  let newLeftAmount = leftResource.amount + amount
  let newRightAmount = rightResource.amount - amount
  if ((newLeftAmount >= 0) && (newRightAmount >= 0)) {
    update(state, leftResourceId, amount)
    update(state, rightResourceId, -amount)
  }
}

export const getResource = (state, stockId: number, resourceName: string): Resource => {
  let stock: Stock = getStockById(state, stockId)
  return getResourceById(state, stock[`${resourceName}ResourceId`])
}

export default (state: State): number => {
  return create(state, 'resources', initialState)
}
