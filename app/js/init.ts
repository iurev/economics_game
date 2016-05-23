/// <reference path="../../typings/index.d.ts" />

var THREE = require('three')

var camera = function(state) {
    var options = state.camera
    options.aspect = window.innerWidth / window.innerHeight
    var camera = new THREE.PerspectiveCamera(options.fov, options.aspect, options.near, options.far);
    state.camera.obj = camera
    camera.position.z = 250
}

var ship = function(state) {
  var scene = state.scene.obj
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var cube = new THREE.Mesh( geometry, material );
  state.ship.obj = cube
  cube.position.x = 10
  cube.position.y = 10
  scene.add( cube );
}

var renderer = function(state) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    state.renderer.obj = renderer
}

var scene = function(state) {
    var scene = new THREE.Scene();
    state.scene.obj = scene
}

var addPlanets = function(state) {
  var planets = state.planets
  var scene = state.scene.obj
    planets.forEach(function(planet: any) {
        let material = new THREE.MeshLambertMaterial({
            color: planet.color
        });
        let geometry2 = new THREE.SphereGeometry(planet.r, 32, 32);
        let sphere = new THREE.Mesh(geometry2, material);
        sphere.position.x = planet.x
        sphere.position.y = planet.y
        scene.add(sphere);
    })
}

var addStars = function(state) {
    var stars = state.stars
    var scene = state.scene.obj
    stars.forEach(function(star: any) {
        let material = new THREE.MeshPhongMaterial({
            color: star.color,
            shininess: 120,
            emissive: 0xbb8383,
            transparent: true,
            opacity: 0.5
        });

        let geometry2 = new THREE.SphereGeometry(star.r, 32, 32);
        let sphere = new THREE.Mesh(geometry2, material);
        sphere.position.x = star.x
        sphere.position.y = star.y
        scene.add(sphere);

        var light = new THREE.PointLight();
        light.position.set(star.x, star.y, 0);
        scene.add(light);
    })
}


var aLight = function(state) {
    var alight = new THREE.AmbientLight(0x404040);
    var scene = state.scene.obj
    scene.add(alight)
    return state
}

export default function(state: any) {
  scene(state)
  renderer(state)
  camera(state)
  addStars(state)
  addPlanets(state)
  aLight(state)
  ship(state)
}
