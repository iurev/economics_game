var keyUp = function(state, action) {
    var index = state.keys.indexOf(action.keyCode)
    if (index !== -1) {
        let newKeys = state.keys.slice();
        newKeys.splice(index, 1);
        return Object.assign({}, state, {
            keys: newKeys
        })
    }
    return state
}

var keyDown = function(state, action) {
    var index = state.keys.indexOf(action.keyCode)
    if (index === -1) {
        let newKeys = state.keys.slice();
        newKeys.push(action.keyCode);
        console.log(newKeys)
        return Object.assign({}, state, {
            keys: newKeys
        })
    }
    return state
}

export default {
  keyDown: keyDown,
  keyUp: keyUp
}
