/// <reference path="../../typings/index.d.ts" />
/// <reference path="./camera.d.ts" />

import { stateForKey } from './initial_state'
import { includes } from 'lodash'

const coeff = 1
const minZ = 40

const initialState: Camera = {
  fov: 10,
  near: 0.1,
  far: 1000,
  x: 0,
  y: 0,
  z: 200
}

export const updateValues = (camera, keys) => {
  let z = camera.z
  if (includes(keys, 76)) z += coeff
  if (includes(keys, 80)) z -= coeff
  if (z < minZ) z = minZ
  camera.z = z
  let horCoeff = coeff / (250 / z)
  if (includes(keys, 68)) camera.x += horCoeff
  if (includes(keys, 83)) camera.y -= horCoeff
  if (includes(keys, 65)) camera.x -= horCoeff
  if (includes(keys, 87)) camera.y += horCoeff
}

export const init = (state) => {
  let options = state.camera = stateForKey(initialState, 'camera')
  options.aspect = window.innerWidth / window.innerHeight
}
