/// <reference path='../typings/index.d.ts' />
/// <reference path='../app/js/camera.d.ts' />
/// <reference path='../app/js/initial_state.d.ts' />
/// <reference path='../app/js/stock.d.ts' />
/// <reference path='../app/js/planet.d.ts' />

import { update, default as create } from '../app/js/stock'
import { cloneDeep } from 'lodash'
import { getStockById, getResourceById } from '../app/js/db'
import initialState from '../app/js/initial_state'
import { init, updateResources, updateResourcesThrottled } from '../app/js/planet'
import { ResourceTypes, getResource } from '../app/js/resource'

describe('Planet', () => {
  describe('#init', () => {
    it('should create planets', () => {
      let state: State = cloneDeep(initialState)
      init(state)
      expect(state.planets.length).not.toBe(0)
      let stock: Stock = getStockById(state, state.planets[0].stockId)
      expect(stock).not.toBeUndefined()
    })
    it('shouldn-t create stocks', () => {
      let state: State = cloneDeep(initialState)
      let fakeState = {
        planets: [
          {
            x: 0,
            y: 0,
            stockId: 1
          }
        ]
      }
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(fakeState))
      init(state)
      expect(state.planets[0]).toEqual(fakeState.planets[0])
      expect(state.planets.length).toEqual(1)
      expect(Object.keys(state.stocks).length).toBe(0)
    })
  })

  describe('#updateResourcesThrottled', () => {
    let allPlanetsResourcesValues = (state: State): Array<Array<number>> => {
      return state.planets.map((planet: Planet) => {
        return ResourceTypes.map((resourceName) => {
          let resource: Resource = getResource(state, planet.stockId, resourceName)
          return resource.amount
        })
      })
    }
    it('shouldn-t update planets throttled', () => {
      localStorage.removeItem('save')
      let state: State = cloneDeep(initialState)
      init(state)
      let previousAmounts = allPlanetsResourcesValues(state)
      updateResourcesThrottled(state, 0)
      let newAmounts = allPlanetsResourcesValues(state)
      expect(previousAmounts).toEqual(newAmounts)
    })
    it('should update planets throttled', () => {
      localStorage.removeItem('save')
      let state: State = cloneDeep(initialState)
      init(state)
      let previousAmounts = allPlanetsResourcesValues(state)
      updateResourcesThrottled(state, 20000)
      let newAmounts = allPlanetsResourcesValues(state)
      expect(previousAmounts).not.toEqual(newAmounts)
    })
  })
})
