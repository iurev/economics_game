/// <reference path="../../typings/index.d.ts" />
import * as THREE from 'three'

var initialState = [{
  x: 1,
  y: 8,
  color: 0xffff00,
  r: 5,
  z: 15
}]

export var init = function(state) {
  state.stars = initialState
}
