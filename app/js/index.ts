/// <reference path="../../typings/index.d.ts" />

'use strict'


var THREE = require('three')
var a = require('./helper').default
var Rx = require('rxjs/Rx')

var b = new a()
b.a()

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var material = new THREE.MeshLambertMaterial({color: 0x55B663});
var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 20;

var alight = new THREE.AmbientLight( 0x404040 ); // soft white light scene.add( light );
scene.add(alight)


var light = new THREE.PointLight(0xffffff);
light.position.set(60,10,10);
scene.add(light);

var geometry2 = new THREE.SphereGeometry( 1, 32, 32 );
var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
for (let i = 0; i<=2; i++) {
  console.log(i)
  let sphere = new THREE.Mesh( geometry2, material );
  sphere.position.x = 2
  sphere.position.y = i*5
  scene.add( sphere );
}

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

var coeff = 0.05
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
