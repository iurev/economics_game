const initialState = {
  sunlight: 0,
  bulba: 20,
  wine: 1
}

export default (state) => {
  let id = Math.random()
  let resource = state.resources[id] = Object.assign({}, initialState)
  resource.wine = Math.random()
  return id
}
