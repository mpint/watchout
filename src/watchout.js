var WatchOut = (function(){
  // private variables go here
  var createEnemies = function(){
    var result = [], x, y;
    for(var i = 0; i < this.numEnemies; i++){
      x = Math.random() * (this.width - 10) + 10;
      y = Math.random() * (this.height - 10) + 10;
      result.push(new Enemy(x,y,10));
    }
    return result;
  };
  var Player = function(){

  };
  var Enemy = function(x,y,r){

    this.r = r;
    this.fill = 'red'; // this.randomFill();
    this.x = x;
    this.y = y;

  };
  var Arena = function(width,height,numEnemies){
    this.width = width;
    this.height = height;
    this.numEnemies = numEnemies;
    this.enemies = createEnemies.call(this);
  };
  /**
   * Appends the arena svg to the element defined by a string
   * parameters:
   *  element: String
   */
  Arena.prototype.appendTo = function(element){

    this.svg = element.append('svg')
      .attr("width", this.width)
      .attr("height", this.height);

    this.draw();
  };

  Arena.prototype.draw = function () {

    if (this.svg === undefined) { return; }

    var circles = this.svg.selectAll('circle').data(this.enemies);
//   <circle cx="50" cy="50" r="30" stroke="black" stroke-width="3" fill="red" />

    circles.enter().append('circle')
           .attr('fill', function (e) { return e.fill; })
           .attr('cx', function (e) { return e.x; })
           .attr('cy', function (e) { return e.y; })
           .attr('r', function (e) { return e.r; });





  };
  // To make a variable public, add it to our return statement.
  return {
    Player: Player,
    Enemy: Enemy,
    Arena: Arena
  };

})();
