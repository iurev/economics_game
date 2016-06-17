/// <reference path='../typings/index.d.ts' />
/// <reference path='../app/js/camera.d.ts' />
/// <reference path='../app/js/initial_state.d.ts' />
/// <reference path='../app/js/stock.d.ts' />
/// <reference path='../app/js/planet.d.ts' />

import { init } from '../app/js/ship'
import { cloneDeep } from 'lodash'
import { getStockById, getResourceById } from '../app/js/db'
import initialState from '../app/js/initial_state'

describe('Ship', () => {
  describe('#init', () => {
    it('should create ship', () => {
      let state: State = cloneDeep(initialState)
      init(state)
      expect(Object.keys(state.ship).length).toBeGreaterThan(0)
    })
    it('shouldn-t create stock', () => {
      let state: State = cloneDeep(initialState)
      let fakeState = {
        ship: {
          x: 0,
          y: 0,
          stockId: 555
        }
      }
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(fakeState))
      init(state)
      expect(state.ship).toEqual(fakeState.ship)
      expect(Object.keys(state.stocks).length).toBe(0)
    })
  })
})
