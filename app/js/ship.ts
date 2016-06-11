import createResource from './resource'

const easingAmount = 0.01
const initialState: Ship = {
  x: 5,
  y: 1,
}

const getDistance = (point1, point2) => {
  let x1 = point1.x
  let x2 = point2.x
  let y1 = point1.y
  let y2 = point2.y
  if (!x2) x2 = 0;
  if (!y2) y2 = 0;
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

export const updateValues = (state) => {
  let mouse = state.mouse
  let ship = state.ship
  if (mouse.x && mouse.y) {
    let xDistance = mouse.x - ship.x;
    let yDistance = mouse.y - ship.y;
    let distance = getDistance(mouse, ship)
    let tempX
    let tempY
    if (distance > 1) {
      tempX = ship.x + xDistance * easingAmount;
      tempY = ship.y + yDistance * easingAmount;
    }
    let newCoords = {
      x: tempX,
      y: tempY
    }
    state.planets.forEach(planet => {
      if (getDistance(planet, newCoords) <= planet.r) {
        newCoords = ship
      }
    });
    state.stars.forEach(planet => {
      if (getDistance(planet, newCoords) <= planet) {
        newCoords = ship
      }
    });
    ship.x = newCoords.x
    ship.y = newCoords.y
  }
}

export const init = (state) => {
  state.ship = initialState
  state.ship.resourceId = createResource(state)
}
