/// <reference path="../../typings/index.d.ts" />
import * as THREE from 'three'

var initialState = [{
    x: 1,
    y: 10,
    color: 0xffff00,
    r: 5
}]

export var init = function(state) {
    state.stars = initialState
}