var inArray = function(array, elem) {
    return array.indexOf(elem)
};

var coeff = 1

export default function(state) {
    var camera = state.camera.obj
    var keys = state.keys
    if (inArray(keys, 68)) camera.position.x += coeff
    if (inArray(keys, 83)) camera.position.y -= coeff
    if (inArray(keys, 65)) camera.position.x -= coeff
    if (inArray(keys, 87)) camera.position.y += coeff
    return state
}
