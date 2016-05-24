/// <reference path="../../typings/index.d.ts" />
import * as THREE from 'three'

var view = null

var createNew = function name(camera) {
  view = new THREE.PerspectiveCamera(camera.fov, camera.aspect, camera.near, camera.far);
  camera.obj = view
  updateValues(camera)
}

var updateValues = function (camera) {
    view.position.x = camera.x
    view.position.y = camera.y
    view.position.z = camera.z
}

export default function(camera) {
    if (view) {
        updateValues(camera)
    } else {
        createNew(camera)
    }
    return view
}