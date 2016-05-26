/// <reference path="../../typings/index.d.ts" />

var getDistance = (point1, point2) => {
    var x1 = point1.x
    var x2 = point2.x
    var y1 = point1.y
    var y2 = point2.y
    if (!x2) x2 = 0;
    if (!y2) y2 = 0;
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

export default (state) => {
    var ship = state.ship
    var trade = {}
    state.planets.forEach(planet => {
        var distanceCondition = getDistance(planet, ship) <= planet.r*1.2
        var clickCondition = getDistance(planet, state.mouse) <= planet.r*1.2
        if (state.trade.left) clickCondition = true
        if (distanceCondition && clickCondition) {
            trade = {
                left: ship.resourceId,
                right: planet.resourceId
            }
            return
        }
    });
    state.trade = trade
}