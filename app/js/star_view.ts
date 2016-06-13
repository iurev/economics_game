import * as THREE from 'three'
import SPE from './spe'

const smokeParticleUrl = 'app/smokeparticle.png'
const speGroupProperties = {
  texture: {
    value: THREE.ImageUtils.loadTexture(smokeParticleUrl)
  }
}
const emitterProperties = (position) => {
  return {
    maxAge: {
      value: 5
    },
    position: {
      value: position,
      spread: new THREE.Vector3(1, 1, 1),
      distribution: SPE.distributions.SPHERE,
      radius: 3,
    },
    color: {
      value: [
        new THREE.Color('white'),
        new THREE.Color('red'),
        new THREE.Color('yellow')
      ]
    },
    size: {
      value: 50
    },
    isStatic: false,
    particleCount: 150
  }
}

let particleGroup, clock;
let views = {}

const addParticles = (scene, star) => {
  let position = new THREE.Vector3(star.x, star.y, 0)
  clock = new THREE.Clock()
  particleGroup = new SPE.Group(speGroupProperties)
  let emitter = new SPE.Emitter(emitterProperties(position))
  particleGroup.addEmitter(emitter)
  scene.add(particleGroup.mesh)
}

const update = () => {
  particleGroup.tick();
  particleGroup.tick(clock.getDelta());
}

const addLight = (scene: THREE.Scene, star) => {
  // let light = new THREE.PointLight(0xffffff, 1, 50);
  let light = new THREE.AmbientLight(undefined, 1)
  // light.position.set(star.x, star.y, star.z)
  scene.add(light)
}


const createNew = (index, star, scene) => {
  views[index] = true

  addParticles(scene, star)
  addLight(scene, star)
}

export default (stars, scene) => {
  stars.forEach((star, index) => {
    if (!views[index]) {
      createNew(index, star, scene)
    } else {
      update()
    }
  })
}
