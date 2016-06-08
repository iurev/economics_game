/// <reference path="../../typings/index.d.ts" />
import * as THREE from 'three'
import createResource from './resource'

var easingAmount = 0.01
var initialState = {
  obj: null,
  x: 5,
  y: 1,
  resourceId: null
}

var getDistance = (point1, point2) => {
  var x1 = point1.x
  var x2 = point2.x
  var y1 = point1.y
  var y2 = point2.y
  if (!x2) x2 = 0;
  if (!y2) y2 = 0;
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

export var updateValues = function(state) {
  var mouse = state.mouse
  var ship = state.ship
  if (mouse.x && mouse.y) {
    var xDistance = mouse.x - ship.x;
    var yDistance = mouse.y - ship.y;
    var distance = getDistance(mouse, ship)
    var tempX
    var tempY
    if (distance > 1) {
      tempX = ship.x + xDistance * easingAmount;
      tempY = ship.y + yDistance * easingAmount;
    }
    var newCoords = {
      x: tempX,
      y: tempY
    }
    state.planets.forEach(planet => {
      if (getDistance(planet, newCoords) <= planet.r) {
        newCoords = ship
      }
    });
    state.stars.forEach(planet => {
      if (getDistance(planet, newCoords) <= planet) {
        newCoords = ship
      }
    });
    ship.x = newCoords.x
    ship.y = newCoords.y
  }
}

export var init = function(state) {
  state.ship = initialState
  state.ship.resourceId = createResource(state)
}
