/// <reference path="../../typings/index.d.ts" />
/// <reference path="./stock.d.ts" />
/// <reference path="./initial_state.d.ts" />
/// <reference path="./planet.d.ts" />
/// <reference path="./resource.d.ts" />

import { create, getById } from './db'

export const ResourceTypes = ['food', 'machines', 'energy']

const initialState: Resource = {
  amount: 10,
  buyPrice: 1,
  cellPrice: 2
}

export const update = (state: State, resourceId: number, amount: number) => {
  let resource: Resource = getById(state, 'resources', resourceId)
  let newAmount = resource.amount + amount
  if (newAmount < 0) newAmount = 0
  resource.amount = newAmount
  resource.buyPrice = 10
  resource.cellPrice = 10
}

export const transaction = (state: State, leftResourceId: number, rightResourceId: number, amount: number) => {
  let leftResource: Resource = getById(state, 'resources', leftResourceId)
  let rightResource: Resource = getById(state, 'resources', rightResourceId)
  let newLeftAmount = leftResource.amount + amount
  let newRightAmount = rightResource.amount - amount
  if ((newLeftAmount >= 0) && (newRightAmount >= 0)) {
    update(state, leftResourceId, amount)
    update(state, rightResourceId, -amount)
  }
}

export default (state: State): number => {
  return create(state, 'resources', initialState)
}
