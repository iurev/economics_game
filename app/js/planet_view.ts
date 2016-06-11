import * as THREE from 'three'
let views = {}

const createNew =  (index, planet, scene) => {
  let material = new THREE.MeshLambertMaterial({
    color: planet.color
  })
  let geometry2 = new THREE.SphereGeometry(planet.r, 32, 32)
  let sphere = new THREE.Mesh(geometry2, material)
  updateValues(planet, sphere)
  scene.add(sphere)
  views[index] = sphere
}

const updateValues = (planet, sphere) => {
  sphere.position.x = planet.x
  sphere.position.y = planet.y
}

const render = (index, planet, scene: THREE.Scene) => {
  if (views[index]) {
    updateValues(planet, views[index])
  } else {
    createNew(index, planet, scene)
  }
}

export default (planets, scene) => {
  planets.forEach((planet, index) => {
    render(index, planet, scene)
  })
}
