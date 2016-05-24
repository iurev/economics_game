/// <reference path="../../typings/index.d.ts" />

import * as THREE from 'three'

var coeff = 1
var initialState = {
  obj: null,
  fov: 10,
  aspect: null,
  near: 0.1,
  far: 1000,
  x: 0,
  y: 0,
  z: 250
}

var inArray = function(array, elem) {
    return array.indexOf(elem) != -1
};

export var updateValues = function (camera, keys) {
    if (inArray(keys, 68)) camera.x += coeff
    if (inArray(keys, 83)) camera.y -= coeff
    if (inArray(keys, 65)) camera.x -= coeff
    if (inArray(keys, 87)) camera.y += coeff
    if (inArray(keys, 87)) camera.y += coeff
    if (inArray(keys, 76)) camera.z += coeff
    if (inArray(keys, 80)) camera.z -= coeff 
}

export var init = function(state) {
  var options = state.camera = initialState
  options.aspect = window.innerWidth / window.innerHeight
}
