/// <reference path="./planet.d.ts" />

import createStock from './stock'

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

export const init = (state) => {
  let planets = state.planets = initialState
  planets.forEach((planet) => {
    planet.stockId = createStock(state)
  })
}
