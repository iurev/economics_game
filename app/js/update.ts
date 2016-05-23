var inArray = function(array, elem) {
    return array.indexOf(elem) != -1
};

var coeff = 1
var easingAmount = 0.01

export default function(state) {
    var camera = state.camera.obj
    var keys = state.keys
    var mouse = state.mouse
    var ship = state.ship.obj.position

    if (inArray(keys, 68)) camera.position.x += coeff
    if (inArray(keys, 83)) camera.position.y -= coeff
    if (inArray(keys, 65)) camera.position.x -= coeff
    if (inArray(keys, 87)) camera.position.y += coeff
    if (inArray(keys, 87)) camera.position.y += coeff
    if (inArray(keys, 76)) camera.position.z += coeff
    if (inArray(keys, 80)) camera.position.z -= coeff

    if (mouse.x && mouse.y) {
      var xDistance = mouse.x - ship.x;
      var yDistance = mouse.y - ship.y;
      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      if (distance > 1) {
          ship.x += xDistance * easingAmount;
          ship.y += yDistance * easingAmount;
      }
    }

    return state
}
