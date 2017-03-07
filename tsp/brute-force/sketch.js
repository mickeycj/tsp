// Map variables.
var cities = [];
var route = [];
var bestRoute = [];
var bestDistance = Number.MAX_SAFE_INTEGER;
var percentage = 0;
var routes = 0;
var total = 0;
var done = false;
// A function to setup the canvas.
function setup() {
  createCanvas(WIDTH, HEIGHT);
  textSize(TEXT_SIZE);
  for (let i = 0; i < NUM_CITIES; i++) {
    cities[i] = new City(random(WIDTH/20, WIDTH-WIDTH/20), random(VERTICAL_LOWER_BOUND, VERTICAL_UPPER_BOUND));
    if (i > 0) {
      route[i-1] = i;
    }
  }
  bestRoute = route.slice();
  total = factorial(route.length);
}
// A function to draw the canvas.
function draw() {
  background(BACKGROUND_COLOR);
  if (!done) {
    stroke(WHITE);
    strokeWeight(STROKE_WEIGHT/4);
    noFill();
    beginShape();
    vertex(cities[0].position.x, cities[0].position.y);
    var distance = cities[0].calculateDistance(cities[route[0]]);
    for (let i = 0; i < route.length; i++) {
      vertex(cities[route[i]].position.x, cities[route[i]].position.y);
      if (i < route.length-1) {
        distance += cities[route[i]].calculateDistance(cities[route[i+1]]);
      }
    }
    vertex(cities[0].position.x, cities[0].position.y);
    distance += cities[route[route.length-1]].calculateDistance(cities[0]);
    endShape();
  }
  stroke(BLUE);
  strokeWeight(STROKE_WEIGHT);
  noFill();
  beginShape();
  vertex(cities[0].position.x, cities[0].position.y);
  for (let i = 0; i < bestRoute.length; i++) {
    vertex(cities[bestRoute[i]].position.x, cities[bestRoute[i]].position.y);
  }
  vertex(cities[0].position.x, cities[0].position.y);
  endShape();
  noStroke();
  for (let i = 0; i < cities.length; i++) {
    cities[i].show();
  }
  routes++;
  fill(GREEN);
  text(Number(100.0*routes/total).toFixed(5) + "% Completed", PERCENTAGE_TEXT_X_POS, PERCENTAGE_TEXT_Y_POS);
  text("Best Distance: " + Number(bestDistance).toFixed(3), BEST_DISTANCE_TEXT_X_POS, BEST_DISTANCE_TEXT_Y_POS);
  if (distance < bestDistance) {
    bestDistance = distance;
    bestRoute = route.slice();
  }
  done = !nextPermutation(route);
  if (done) {
    noLoop();
  }
}
// A function to compute the number of all possible routes.
function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n-1);
}
// A function to compute next permutation of this route.
function nextPermutation(arr) {
  var i = arr.length-1;
  while (i > 0 && arr[i-1] >= arr[i]) {
    i--;
  }
  if (i <= 0) {
    return false;
  }
  var j = arr.length-1;
  while (arr[j] <= arr[i-1]) {
    j--;
  }
  var temp = arr[i-1];
  arr[i-1] = arr[j];
  arr[j] = temp;
  for (j = arr.length-1; i < j; i++, j--) {
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return true;
}
