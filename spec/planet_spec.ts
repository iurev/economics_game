/// <reference path='../typings/index.d.ts' />
/// <reference path='../app/js/camera.d.ts' />
/// <reference path='../app/js/initial_state.d.ts' />
/// <reference path='../app/js/stock.d.ts' />
/// <reference path='../app/js/planet.d.ts' />

import { update, default as create } from '../app/js/stock'
import { clone } from 'lodash'
import { getStockById, getResourceById } from '../app/js/db'
import initialState from '../app/js/initial_state'
import { init, updateResources, updateResourcesThrottled } from '../app/js/planet'
import { ResourceTypes, getResource } from '../app/js/resource'

describe('Planet', () => {
  it('should create planets', () => {
    let state: State = clone(initialState)
    expect(state.planets.length).toBe(0)
    init(state)
    expect(state.planets.length).not.toBe(0)
  })

  let allPlanetsResourcesValues = (state: State): Array<Array<number>> => {
    return state.planets.map((planet: Planet) => {
      return ResourceTypes.map((resourceName) => {
        let resource: Resource = getResource(state, planet.stockId, resourceName)
        return resource.amount
      })
    })
  }

  it('shouldn-t update planets throttled #updateResourcesThrottled', () => {
    let state: State = clone(initialState)
    init(state)
    let previousAmounts = allPlanetsResourcesValues(state)
    updateResourcesThrottled(state, 0)
    let newAmounts = allPlanetsResourcesValues(state)
    expect(previousAmounts).toEqual(newAmounts)
  })

  it('should update planets throttled #updateResourcesThrottled', () => {
    let state: State = clone(initialState)
    init(state)
    let previousAmounts = allPlanetsResourcesValues(state)
    updateResourcesThrottled(state, 20000)
    let newAmounts = allPlanetsResourcesValues(state)
    expect(previousAmounts).not.toEqual(newAmounts)
  })
})
