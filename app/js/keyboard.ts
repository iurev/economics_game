const keyUp = (state, action) => {
  let index = state.keys.indexOf(action.keyCode)
  if (index !== -1) {
    let newKeys = state.keys.slice();
    newKeys.splice(index, 1);
    return Object.assign({}, state, {
      keys: newKeys
    })
  }
  return state
}

const keyDown = (state, action) => {
  let index = state.keys.indexOf(action.keyCode)
  if (index === -1) {
    let newKeys = state.keys.slice();
    newKeys.push(action.keyCode);
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
