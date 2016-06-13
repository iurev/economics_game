/// <reference path="./resource.d.ts" />
/// <reference path="./trade.d.ts" />

import { transaction} from './resource'
import { getById } from './db'

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
  let trade: Trade = state.trade || {}
  let ship = state.ship
  if (state.trade.left) return
  state.planets.forEach(planet => {
    let distanceCondition = getDistance(planet, ship) <= planet.r * 1.2
    let clickCondition = getDistance(planet, state.mouse) <= planet.r * 1.2
    if (distanceCondition && clickCondition && state.mouse.isUp) {
      trade.leftStockId = ship.stockId
      trade.rightStockId = planet.stockId
      state.trade = trade
      return
    }
  });
}

const tradeLogic = (state: State) => {
  let trade = state.trade
  let name = tradeAction.name
  let action = tradeAction.action

  if (!trade.leftStockId) return
  if (!trade.rightStockId) return
  if (!tradeAction.name) return
  if (tradeAction.action === undefined) return

  let leftStock: Stock = getById(state, 'stocks', trade.leftStockId)
  let rightStock: Stock = getById(state, 'stocks', trade.rightStockId)
  let leftResourceId: number = leftStock[`${name}ResourceId`]
  let rightResourceId: number = rightStock[`${name}ResourceId`]

  if (action === TradeActionType.Sell) {
    transaction(state, leftResourceId, rightResourceId, -1)
  } else if (action === TradeActionType.Buy) {
    transaction(state, leftResourceId, rightResourceId, 1)
  }
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
