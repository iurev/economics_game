/// <reference path="../../typings/index.d.ts" />

interface TradeAction {
  name?: string,
  action?: TradeActionType
}

var tradeAction: TradeAction = {
  name: null,
  action: null
}

// you can buy or sell products
export enum TradeActionType {
  Buy,
  Sell,
  Close
}

var shouldICloseWindow = false

var getDistance = (point1, point2) => {
  var x1 = point1.x
  var x2 = point2.x
  var y1 = point1.y
  var y2 = point2.y
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
  var trade = state.trade || {}
  var ship = state.ship
  if (state.trade.left) return
  // console.log('asdf')
  state.planets.forEach(planet => {
    var distanceCondition = getDistance(planet, ship) <= planet.r * 1.2
    var clickCondition = getDistance(planet, state.mouse) <= planet.r * 1.2
    if (distanceCondition && clickCondition && state.mouse.isUp) {
      trade.left = ship.resourceId
      trade.right = planet.resourceId
      state.trade = trade
      return
    }
  });
}

const tradeLogic = (state) => {
  var trade = state.trade || {}
  var left = state.resources[trade.left]
  var right = state.resources[trade.right]
  var name = tradeAction.name
  var action = tradeAction.action
  var tmpLeftValue
  var tmpRightValue
  if (left && right && tradeAction.name && tradeAction.action !== null) {
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
      left: null,
      right: null
    }
  }
}

export default (state) => {
  openTradeLogic(state)
  tradeLogic(state)
  maybeClose(state)
  tradeAction = {
    name: null,
    action: null
  }
}
