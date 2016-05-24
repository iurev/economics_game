/// <reference path="../../typings/index.d.ts" />
import * as THREE from 'three'

var view = null

var createNew = function name(ship, scene) {
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var cube = new THREE.Mesh( geometry, material );
  view = cube
  updateValues(ship)
  scene.add( cube )
}

var updateValues = function (ship) {
    view.position.x = ship.x
    view.position.y = ship.y
}

export default function(ship, scene: THREE.Scene) {
    if (view) {
        updateValues(ship)
    } else {
        createNew(ship, scene)
    }
}