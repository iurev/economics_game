/// <reference path="../../typings/index.d.ts" />
import * as THREE from 'three'

var views = {}

var createNew = function name(index, planet, scene) {
  let material = new THREE.MeshLambertMaterial({
    color: planet.color
  });
  let geometry2 = new THREE.SphereGeometry(planet.r, 32, 32);
  let sphere = new THREE.Mesh(geometry2, material);
  updateValues(planet, sphere)
  scene.add(sphere);
  views[index] = sphere
}

var updateValues = function(planet, sphere) {
  sphere.position.x = planet.x
  sphere.position.y = planet.y
}

var render = function(index, planet, scene: THREE.Scene) {
  if (views[index]) {
    updateValues(planet, views[index])
  } else {
    createNew(index, planet, scene)
  }
}

export default function(planets, scene) {
  planets.forEach(function(planet, index) {
    render(index, planet, scene)
  })
}
