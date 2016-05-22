/// <reference path="../../typings/index.d.ts" />

'use strict'


var THREE = require('three')
var a = require('./helper').default
var store = require('./store').default
var Rx = require('rxjs/Rx')
var Immutable = require('immutable');

store().subscribe(() =>
  console.log(store().getState())
)
 
// The only way to mutate the internal state is to dispatch an action. 
// The actions can be serialized, logged or stored and later replayed. 
store().dispatch({ type: 'INCREMENT' })
// 1 
store().dispatch({ type: 'INCREMENT' })
// 2 
store().dispatch({ type: 'DECREMENT' })
// 1 

var b = new a()
b.a()

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 10, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var material = new THREE.MeshLambertMaterial({color: 0x55B663});
var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 250;

var alight = new THREE.AmbientLight( 0x404040 ); // soft white light scene.add( light );
scene.add(alight)

store().getState().planets.forEach(function (planet: any) {
  let material = new THREE.MeshLambertMaterial({ color: planet.color });
  let geometry2 = new THREE.SphereGeometry( planet.r, 32, 32 );
  let sphere = new THREE.Mesh( geometry2, material );
  sphere.position.x = planet.x
  sphere.position.y = planet.y
  scene.add( sphere );
})

store().getState().stars.forEach(function (star: any) {
  let material = new THREE.MeshPhongMaterial({ color: star.color, shininess: 120, emissive: 0xbb8383, transparent: true, opacity: 0.5 });
  
  let geometry2 = new THREE.SphereGeometry( star.r, 32, 32 );
  let sphere = new THREE.Mesh( geometry2, material );
  sphere.position.x = star.x
  sphere.position.y = star.y
  scene.add( sphere );

  var light = new THREE.PointLight();
  light.position.set(star.x, star.y, 0);
  scene.add(light);
})

var keyS = false
var keyD = false
var keyA = false
var keyW = false


function onKeyUp(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 68: //d
      keyD = false;
      break;
    case 83: //s
      keyS = false;
      break;
    case 65: //a
      keyA = false;
      break;
    case 87: //w
      keyW = false;
      break;
  }
}


function onKeyDown(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 68: //d
      keyD = true;
      break;
    case 83: //s
      keyS = true;
      break;
    case 65: //a
      keyA = true;
      break;
    case 87: //w
      keyW = true;
      break;
  }
}

var keyups = Rx.Observable.fromEvent(window, 'keyup')
  .subscribe(onKeyUp)
  
var keydowns = Rx.Observable.fromEvent(window, 'keydown')
  .subscribe(onKeyDown)

var coeff = 1
var render = function () {
  requestAnimationFrame( render );

  if(keyD) camera.position.x += coeff
  if(keyA) camera.position.x -= coeff
  if(keyW) camera.position.y += coeff
  if(keyS) camera.position.y -= coeff

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

render();
