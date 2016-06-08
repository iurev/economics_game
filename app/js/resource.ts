var initialState = {
  sunlight: 0,
  bulba: 20,
  wine: 1
}

export default function(state) {
  var id = Math.random()
  var resource = state.resources[id] = Object.assign({}, initialState)
  resource.wine = Math.random()
  return id
}
