// A City class which stores its location on the map.
function City(x, y) {
  // Constructs a new city with its location on the map.
  this.position = createVector(x, y);
  // A function to calculate its distance to the another city.
  this.calculateDistance = function(other) {
    return dist(this.position.x, this.position.y, other.position.x, other.position.y);
  }
  // A function to show this city on the map.
  this.show = function() {
    fill(WHITE);
    ellipse(this.position.x, this.position.y, CITY_SIZE, CITY_SIZE);
    ellipse(this.position.x+HORIZONTAL_BOUND, this.position.y, CITY_SIZE, CITY_SIZE);
  }
}
