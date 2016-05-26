/// <reference path="../../typings/index.d.ts" />

var THREE = require('three')
import { init as camera } from './camera'
import { init as planets } from './planet'
import { init as ship } from './ship'
import { init as stars } from './star'

var renderer = function(state) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    state.renderer.obj = renderer
}

var scene = function(state) {
    var scene = new THREE.Scene();
    state.scene.obj = scene
}

var aLight = function(state) {
    var alight = new THREE.AmbientLight(0x333333);
    var scene = state.scene.obj
    scene.add(alight)
    return state
}

export default function(state: any) {
  scene(state)
  renderer(state)
  camera(state)
  stars(state)
  planets(state)
  aLight(state)
  ship(state)
}
