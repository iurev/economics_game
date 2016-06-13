interface TradeAction {
  name?: string,
  action?: TradeActionType
}

let tradeAction: TradeAction = {}

export enum TradeActionType {
  Buy,
  Sell,
  Close
}

let shouldICloseWindow = false

const getDistance = (point1, point2) => {
  let x1 = point1.x
  let x2 = point2.x
  let y1 = point1.y
  let y2 = point2.y
  if (!x2) x2 = 0;
  if (!y2) y2 = 0;
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

export const viewCallbacks = {
  trade: (name, action) => {
    tradeAction.name = name
    tradeAction.action = action
  }
}

const openTradeLogic = (state) => {
  let trade = state.trade || {}
  let ship = state.ship
  if (state.trade.left) return
  state.planets.forEach(planet => {
    let distanceCondition = getDistance(planet, ship) <= planet.r * 1.2
    let clickCondition = getDistance(planet, state.mouse) <= planet.r * 1.2
    if (distanceCondition && clickCondition && state.mouse.isUp) {
      trade.left = ship.resourceId
      trade.right = planet.resourceId
      state.trade = trade
      return
    }
  });
}

const tradeLogic = (state) => {
  let trade = state.trade || {}
  let left = state.resources[trade.left]
  let right = state.resources[trade.right]
  let name = tradeAction.name
  let action = tradeAction.action
  let tmpLeftValue
  let tmpRightValue
  if (left && right && tradeAction.name && tradeAction.action !== undefined) {
    if (action === TradeActionType.Sell) {
      tmpLeftValue = left[name] - 1
      tmpRightValue = right[name] + 1
    } else if (action === TradeActionType.Buy) {
      tmpLeftValue = left[name] + 1
      tmpRightValue = right[name] - 1
    }
    if ((tmpLeftValue >= 0) && (tmpRightValue >= 0)) {
      left[name] = tmpLeftValue
      right[name] = tmpRightValue
    }
  }
  state.trade = trade
}

const maybeClose = (state) => {
  if (tradeAction.action === TradeActionType.Close) {
    state.trade = {
      left: undefined,
      right: undefined
    }
  }
}

export default (state) => {
  openTradeLogic(state)
  tradeLogic(state)
  maybeClose(state)
  tradeAction = {
    name: undefined,
    action: undefined
  }
}
