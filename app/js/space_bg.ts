import * as THREE from 'three'
import SPE from './spe'

const particleUrl = 'app/smokeparticle.png'
const spaceBgParams = {
  color: 0x5657d7,
  opacity: 0.5,
  transparent: true
}
const particleGroupProperties = {
  texture: {
    value: THREE.ImageUtils.loadTexture(particleUrl)
  }
}

let particleGroup

const randomStarColor = () => {
  let color
  if (Math.random() < 0.1) {
    color = 'red'
  } else {
    color = 'white'
  }
  return new THREE.Color(color)
}

const emitterProperties = (i) => {
  return {
    type: i,
    maxAge: {
      value: 1
    },
    position: {
      value: new THREE.Vector3(-5 + (i * 2.5), 4, -5),
      radius: 5,
      spread: new THREE.Vector3(200, 200, 0),
      distribution: SPE.distributions.DISC
    },

    color: {
      value: randomStarColor()
    },
    size: {
      value: i * 3
    },
    isStatic: true,
    particleCount: 120
  }
}

const initParticles = (scene) => {
  particleGroup = new SPE.Group(particleGroupProperties)

  for (let i = 1; i < 4; i++) {
    let emitter = new SPE.Emitter(emitterProperties(i))
    particleGroup.addEmitter(emitter)
  }

  scene.add(particleGroup.mesh)
}

let callback = (scene: THREE.Scene) => {
  let geometry = new THREE.BoxGeometry(500, 500, 1)
  let material = new THREE.MeshPhongMaterial(spaceBgParams)
  let box = new THREE.Mesh(geometry, material)
  box.position.z = -10
  scene.add(box)
  initParticles(scene)
  particleGroup.tick()

  callback = (_: THREE.Scene) => { }
}

export default (scene: THREE.Scene) => {
  callback(scene)
}
