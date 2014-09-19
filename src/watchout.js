var WatchOut = (function(){
  // private variables go here
  var createEnemies = function(){
    var result = [];
    for(var i = 0; i < this.numEnemies; i++){
      result.push(new Enemy());
    }
    return result;
  };
  var Player = function(){

  };
  var Enemy = function(){

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
  };
  // To make a variable public, add it to our return statement.
  return {
    Player: Player,
    Enemy: Enemy,
    Arena: Arena
  };

})();
