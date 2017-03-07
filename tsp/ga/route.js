// A Route class which stores the order in which a salesman may traverse the cities on the map.
function Route(order, optimal) {
  // Constructs a new route through all the cities.
  if (order) {
    this.order = order;
  } else {
    this.order = [];
    for (let i = 0; i < cities.length-1; i++) {
      this.order[i] = i+1;
    }
    for (let i = this.order.length-1; i >= 0; i--) {
      let index = Math.floor(random(i+1));
      let temp = this.order[index];
      this.order[index] = this.order[i];
      this.order[i] = temp;
    }
  }
  this.distance = 0;
  this.optimalFactor = 0;
  this.optimal = optimal;
  // A function to calculate the total distance through all the cities and its optimal factor.
  this.calculateOptimalFactor = function() {
    this.distance = 0;
    for (let i = 0; i < this.order.length-1; i++) {
      this.distance += cities[this.order[i]].calculateDistance(cities[this.order[i+1]]);
    }
    this.optimalFactor = map(this.distance, 0, WIDTH*HEIGHT, WIDTH, 0);
  }
  // A function to create a copy of this route.
  this.copy = function(optimal) {
    var newRoute = new Route(this.order.slice(), optimal);
    newRoute.calculateOptimalFactor();
    return newRoute;
  }
  // A function to combine to routes together.
  this.combine = function(other) {
    var orderSet = [];
    var n = Math.ceil(random(other.order.length)) / 2;
    for (let i = 0, index = 0; i < n; i++) {
      let j = Math.floor(random(index, other.order.length));
      if (!orderSet.includes(other.order[j])) {
        orderSet.push(other.order[j]);
        index = j;
      }
    }
    var newOrder = this.order.slice();
    for (let i = 0, j = 0; i < newOrder.length; i++) {
      if (orderSet.includes(newOrder[i])) {
        newOrder[i] = orderSet[j++];
      }
    }
    return new Route(newOrder, !OPTIMAL);
  }
  // A function to adjust the current order in this route.
  this.adjust = function() {
    let a = Math.floor(random(this.order.length));
    let b = Math.floor(random(this.order.length));
    if (random() < 0.66) {
      if (a > b) {
        let temp = a;
        a = b;
        b = temp;
      }
      for (let i = a, j = b; i < j; i++, j--) {
        let temp = this.order[i];
        this.order[i] = this.order[j];
        this.order[j] = temp;
      }
    } else {
      let temp = this.order[a];
      this.order[a] = this.order[b];
      this.order[b] = temp;
    }
  }
  // A function to show this route through the cities on the map.
  this.show = function() {
    stroke((this.optimal) ? BLUE : WHITE);
    strokeWeight(STROKE_WEIGHT);
    noFill();
    beginShape();
    var xOffset = (this.optimal) ? HORIZONTAL_BOUND : 0;
    vertex(cities[0].position.x+xOffset, cities[0].position.y);
    for (let i = 0; i < this.order.length; i++) {
      vertex(cities[this.order[i]].position.x+xOffset, cities[this.order[i]].position.y);
    }
    vertex(cities[0].position.x+xOffset, cities[0].position.y);
    endShape();
    noStroke();
  }
}
