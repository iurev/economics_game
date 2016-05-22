/// <reference path="../../typings/index.d.ts" />

'use strict'


var three = require('three')
var a = require('./helper').default

var b = new a()
b.a()


var scene = new three.Scene();
var camera = new three.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new three.BoxGeometry( 1, 1, 1 );
// var material = new three.MeshBasicMaterial( { color: 0x00ff00 } );
var material = new three.MeshLambertMaterial({color: 0x55B663});
var cube = new three.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 20;

var alight = new three.AmbientLight( 0x404040 ); // soft white light scene.add( light );
scene.add(alight)


var light = new three.PointLight(0xffffff);
light.position.set(60,10,10);
scene.add(light);

var geometry2 = new three.SphereGeometry( 1, 32, 32 );
var material = new three.MeshLambertMaterial( {color: 0xffff00} );
for (let i = 0; i<=2; i++) {
  console.log(i)
  let sphere = new three.Mesh( geometry2, material );
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

window.addEventListener("keyup", onKeyUp, false);
window.addEventListener("keydown", onKeyDown, false);
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
