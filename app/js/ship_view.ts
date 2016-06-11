import * as THREE from 'three'

let view = undefined
let light = undefined

const createNew = (ship, scene) => {
  let geometry = new THREE.BoxGeometry(0.5, 0.2, 0.2)
  let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  let cube = new THREE.Mesh(geometry, material)
  view = cube
  view.rotateX(45)
  view.rotateY(45)

  light = new THREE.PointLight(0xffffff, 2, 1)
  scene.add(light)

  updateValues(ship)
  scene.add(cube)
}

let updateValues = (ship) => {
  view.position.x = ship.x
  view.position.y = ship.y
  light.position.set(ship.x, ship.y, 1)
}

export default (ship, scene: THREE.Scene) => {
  if (view) {
    updateValues(ship)
  } else {
    createNew(ship, scene)
  }
}
