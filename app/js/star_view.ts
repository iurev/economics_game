/// <reference path="../../typings/index.d.ts" />
import * as THREE from 'three'

var views = {}

var createNew = function(index, star, scene) {
    let material = new THREE.MeshPhongMaterial({
        color: star.color,
        shininess: 120,
        emissive: 0xbb8383,
        transparent: false,
        opacity: 1
    });
    

    let geometry2 = new THREE.SphereGeometry(star.r, 32, 32);
    let sphere = new THREE.Mesh(geometry2, material);
    sphere.position.x = star.x
    sphere.position.y = star.y
    scene.add(sphere);
    
    views[index] = sphere

    var light = new THREE.PointLight(0xffffff, 1, 30);
    light.position.set(star.x, star.y, 5.1);
    scene.add(light);
}

export default function(stars, scene) {
    stars.forEach(function(star, index) {
        if (!views[index]) {
            createNew(index, star, scene)
        }
    })
}