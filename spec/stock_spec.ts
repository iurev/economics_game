/// <reference path='../typings/index.d.ts' />
/// <reference path='../app/js/camera.d.ts' />
/// <reference path='../app/js/initial_state.d.ts' />
/// <reference path='../app/js/stock.d.ts' />
/// <reference path='../app/js/planet.d.ts' />

import { update, default as create } from '../app/js/stock'
import { clone } from 'lodash'
import { getStockById, getResourceById } from '../app/js/db'
import initialState from '../app/js/initial_state'

describe('Stock', () => {
  it('should randomly update resources', () => {
    let state: State = clone(initialState)
    let stockId: number = create(state)
    let stock: Stock = getStockById(state, stockId)

    let food: Resource = getResourceById(state, stock.foodResourceId)
    let energy: Resource = getResourceById(state, stock.energyResourceId)
    let machines: Resource = getResourceById(state, stock.machinesResourceId)
    let previousAmounts = [food.amount, energy.amount, machines.amount]

    update(state, stockId)

    expect([food.amount, energy.amount, machines.amount]).not.toEqual(previousAmounts)
  })
})
