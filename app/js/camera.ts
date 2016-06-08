/// <reference path="../../typings/index.d.ts" />

import * as THREE from 'three'

const coeff = 1
const minZ = 40

var initialState = {
  obj: null,
  fov: 10,
  aspect: null,
  near: 0.1,
  far: 1000,
  x: 0,
  y: 0,
  z: 200
}

var inArray = function(array, elem) {
  return array.indexOf(elem) != -1
};

export var updateValues = function(camera, keys) {
  var z = camera.z
  if (inArray(keys, 76)) z += coeff
  if (inArray(keys, 80)) z -= coeff
  if (z < minZ) z = minZ
  camera.z = z
  var horCoeff = coeff / (250 / z)
  if (inArray(keys, 68)) camera.x += horCoeff
  if (inArray(keys, 83)) camera.y -= horCoeff
  if (inArray(keys, 65)) camera.x -= horCoeff
  if (inArray(keys, 87)) camera.y += horCoeff
}

export var init = function(state) {
  var options = state.camera = initialState
  options.aspect = window.innerWidth / window.innerHeight
}
