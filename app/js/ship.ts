/// <reference path="../../typings/index.d.ts" />
import * as THREE from 'three'

var easingAmount = 0.01
var initialState = {
    obj: null,
    x: 10,
    y: 10
}

export var updateValues = function(state) {
    var mouse = state.mouse
    var ship = state.ship
    if (mouse.x && mouse.y) {
        var xDistance = mouse.x - ship.x;
        var yDistance = mouse.y - ship.y;
        var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        if (distance > 1) {
            ship.x += xDistance * easingAmount;
            ship.y += yDistance * easingAmount;
        }
    }
}

export var init = function(state) {
  state.ship = initialState
}