/// <reference path="../../typings/index.d.ts" />

import * as THREE from 'three'
var url = "/space.jpg"

var callback = (_: THREE.Scene) => {}

var onLoad = () => {
	callback = (scene: THREE.Scene) => {
		  var spacesphereGeo = new THREE.SphereGeometry(500,20,20);
			var spacesphereMat = new THREE.MeshPhongMaterial();
			spacesphereMat.map = spacetex;

			var spacesphere = new THREE.Mesh(spacesphereGeo,spacesphereMat);
			
			//spacesphere needs to be double sided as the camera is within the spacesphere
			spacesphere.material.side = THREE.DoubleSide;
			
			spacesphere.material.map.wrapS = THREE.RepeatWrapping; 
			spacesphere.material.map.wrapT = THREE.RepeatWrapping;
			spacesphere.material.map.repeat.set( 50, 20);
			spacesphere.position.z = -500
			scene.add(spacesphere);	
			
			callback = (_: THREE.Scene) => {}
	}
}

var spacetex = THREE.ImageUtils.loadTexture(url, null, onLoad)

export default (scene: THREE.Scene) => {
	callback(scene)
}