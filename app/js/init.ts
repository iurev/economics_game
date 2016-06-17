
import * as THREE from 'three'
import { init as camera } from './camera'
import { init as planets } from './planet'
import { init as ship } from './ship'
import { init as stars } from './star'
import { createThreeObj } from './db'

const renderer = (state: State) => {
  let r = new THREE.WebGLRenderer()
  r.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(r.domElement)
  createThreeObj(state, 'renderer', r)
}

const scene = (state) => {
  let scene = new THREE.Scene()
  state.scene.obj = scene
}

const aLight = (state) => {
  let alight = new THREE.AmbientLight(0x333333)
  let scene = state.scene.obj
  scene.add(alight)
  return state
}

export default (state: any) => {
  scene(state)
  renderer(state)
  camera(state)
  stars(state)
  planets(state)
  aLight(state)
  ship(state)
}
