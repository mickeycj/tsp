// A Salesman class which stores all the routes possible through the cites on the map.
function Salesman() {
  // Constructs a new salesman with all the routes through the cities.
  this.routes = [];
  for (let i = 0; i < NUM_ROUTES; i++) {
    this.routes[i] = new Route(null, !OPTIMAL);
  }
  this.optimalRoute = this.routes[0].copy(OPTIMAL);
  this.currentRevision = 1;
  this.bestRevision = 1;
  // A function to revise the current routes, and create a new set of more optimized routes.
  this.revise = function() {
    for (let i = 0; i < this.routes.length; i++) {
      this.routes[i].optimalFactor /= this.optimalRoute.optimalFactor;
    }
    var routePool = [];
    for (let i = 0; i < this.routes.length; i++) {
      let n = this.routes[i].optimalFactor * 100;
      for (let j = 0; j < n; j++) {
        routePool.push(this.routes[i]);
      }
    }
    var newRoutes = [];
    newRoutes[0] = new Route(this.optimalRoute.order, !OPTIMAL);
    while (newRoutes.length < this.routes.length) {
      let routeA = random(routePool);
      let routeB = random(routePool);
      let newRouteA = routeA.combine(routeB);
      if (random() < ADJUSTMENT_RATE) {
        newRouteA.adjust();
      }
      newRoutes.push(newRouteA);
      if (newRoutes.length < this.routes.length) {
        let newRouteB = routeB.combine(routeA);
        if (random() < ADJUSTMENT_RATE) {
          newRouteB.adjust();
        }
        newRoutes.push(newRouteB);
      }
    }
    this.currentRevision++;
    this.routes = newRoutes;
  }
  // A function to show all possible routes used by this salesman.
  this.showRoute = function(current) {
    this.routes[current].show();
    this.routes[current].calculateOptimalFactor();
    if (this.optimalRoute.optimalFactor < this.routes[current].optimalFactor) {
      this.optimalRoute = this.routes[current].copy(OPTIMAL);
      this.bestRevision = this.currentRevision;
    }
    this.optimalRoute.show();
    fill(GREEN);
    rectMode(CENTER);
    rect(LINE_X_POS, LINE_Y_POS, LINE_WIDTH, HEIGHT);
    text("Route Revision #" + this.currentRevision, REVISION_TEXT_X_POS, REVISION_TEXT_Y_POS);
    text("Best Route From Revision #" + this.bestRevision, BEST_REVISION_TEXT_X_POS, REVISION_TEXT_Y_POS);
    text("Distance: " + Number(this.routes[current].distance).toFixed(3), DISTANCE_TEXT_X_POS, DISTANCE_TEXT_Y_POS);
    text("Best Distance: " + Number(this.optimalRoute.distance).toFixed(3), BEST_DISTANCE_TEXT_X_POS, DISTANCE_TEXT_Y_POS);
  }
}
