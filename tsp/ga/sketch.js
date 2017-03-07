// Salesman variables.
var cities = [];
var salesman;
var currentRoute = 0;
// A function to setup the canvas.
function setup() {
  createCanvas(WIDTH, HEIGHT);
  textSize(TEXT_SIZE);
  for (let i = 0; i < NUM_CITIES; i++) {
    cities[i] = new City(random(WIDTH/20, HORIZONTAL_BOUND-WIDTH/20), random(VERTICAL_LOWER_BOUND, VERTICAL_UPPER_BOUND));
  }
  salesman = new Salesman();
}
// A function to draw the canvas.
function draw() {
  background(BACKGROUND_COLOR);
  salesman.showRoute(currentRoute++);
  for (let i = 0; i < cities.length; i++) {
    cities[i].show();
  }
  if (currentRoute == NUM_ROUTES) {
    salesman.revise();
    currentRoute = 0;
  }
}
