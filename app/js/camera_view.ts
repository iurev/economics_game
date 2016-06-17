/// <reference path="../../typings/index.d.ts" />
/// <reference path="./initial_state.d.ts" />
/// <reference path="./camera.d.ts" />

import * as THREE from 'three'
import { createThreeObj, getCamera } from './db'

const createNew = (state: State) => {
  let camera: Camera = state.camera
  let view: THREE.Camera = new THREE.PerspectiveCamera(camera.fov, camera.aspect, camera.near, camera.far);
  createThreeObj(state, 'camera', view)
  updateValues(state)
}

const updateValues = (state: State) => {
  let camera: Camera = state.camera
  let view: THREE.Camera = getCamera(state)
  view.position.x = camera.x
  view.position.y = camera.y
  view.position.z = camera.z
}

export default (state: State) => {
  let view: THREE.Camera = getCamera(state)
  if (view) {
    updateValues(state)
  } else {
    createNew(state)
  }
}
