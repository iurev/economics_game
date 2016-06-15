/// <reference path='../typings/index.d.ts' />
/// <reference path='../app/js/camera.d.ts' />
/// <reference path='../app/js/initial_state.d.ts' />
/// <reference path='../app/js/stock.d.ts' />
/// <reference path='../app/js/planet.d.ts' />

import { update, transaction, default as create } from '../app/js/resource'
import { clone } from 'lodash'
import { getStockById, getResourceById } from '../app/js/db'
import initialState from '../app/js/initial_state'

describe('Resource', () => {
  describe('#update', () => {
    let previousAmount: number
    let resource: Resource
    let resourceId: number
    let state: State

    beforeEach(() => {
      state = clone(initialState)
      resourceId = create(state)
      resource = getResourceById(state, resourceId)
      previousAmount = resource.amount
    })

    it('should plus', () => {
      let diff = 10
      update(state, resourceId, diff)
      let newAmount = resource.amount
      expect(newAmount).toBeGreaterThan(previousAmount)
    })

    it('should minus', () => {
      let diff = -10
      update(state, resourceId, diff)
      let newAmount = resource.amount
      expect(newAmount).toBeLessThan(previousAmount)
    })

    it('shouldn-t be less than zero', () => {
      let diff = -1000000000
      update(state, resourceId, diff)
      let newAmount = resource.amount
      expect(newAmount).toEqual(0)
    })
  })

  describe('#transaction', () => {
    let resource: Resource
    let leftResourceId: number
    let rightResourceId: number
    let leftResource: Resource
    let rightResource: Resource
    let state: State

    beforeEach(() => {
      state = clone(initialState)
      leftResourceId = create(state)
      leftResource = getResourceById(state, leftResourceId)
      rightResourceId = create(state)
      rightResource = getResourceById(state, rightResourceId)
    })

    it('should move amount from right to left', () => {
      let amount = 5
      let result = transaction(state, leftResourceId, rightResourceId, amount)
      expect(result).toBeTruthy()
      expect(leftResource.amount).toBeGreaterThan(rightResource.amount)
    })

    it('should move amount from left to right', () => {
      let amount = -5
      let result = transaction(state, leftResourceId, rightResourceId, amount)
      expect(result).toBeTruthy()
      expect(leftResource.amount).toBeLessThan(rightResource.amount)
    })

    it('shouldn-t move amount', () => {
      let amount = -1000000
      let result = transaction(state, leftResourceId, rightResourceId, amount)
      expect(result).toBeFalsy()
      expect(leftResource.amount).toEqual(rightResource.amount)
    })
  })
})
