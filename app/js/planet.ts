/// <reference path="./planet.d.ts" />

import createStock from './stock'
import { update as updateStock } from './stock'

const WHEN_TO_UPDATE_STOCK: number = 10000

const initialState: Array<Planet> = [{
  x: 0,
  y: 0,
  r: 0.5,
  color: 0xFF0000,
}, {
  x: 3,
  y: -5,
  r: 2.5,
  color: 0x00B200,
}, {
  x: 5,
  y: 20,
  r: 1,
  color: 0x7c858b,
}]

export const updateResourcesThrottled = (state: State, time: number) => {
  let diff: number = time - state.gameInfo.planets.lastUpdatedResourceTime
  if (diff <= WHEN_TO_UPDATE_STOCK) return

  state.gameInfo.planets.lastUpdatedResourceTime = time
  updateResources(state)
}

export const updateResources = (state: State) => {
  state.planets.forEach((planet: Planet) => {
    updateStock(state, planet.stockId)
  })
}

export const init = (state) => {
  let planets = state.planets = initialState
  planets.forEach((planet) => {
    planet.stockId = createStock(state)
  })
}
