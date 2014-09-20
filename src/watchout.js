var WatchOut = (function(){

  var score = 0;
  var highScore = 0;
  var collisions = 0;
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
  var Player = function(x,y,r){

    this.r = r;
    this.fill = 'blue'; // this.randomFill();
    this.x = x;
    this.y = y;

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
    this.player = new Player(width / 2, height / 2,10);
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

    this.slowStep();
    this.step();
  };
  Arena.prototype.slowStep = function () {

    for(var i = 0; i < this.numEnemies; i++){
      var enemy = this.enemies[i];
      enemy.x = Math.random() * (this.width - 10) + 10;
      enemy.y = Math.random() * (this.height - 10) + 10;
    }
    this.slowDraw();
    score++;
    highScore = score > highScore ? score : highScore;

    setTimeout(this.slowStep.bind(this), 2000);
  };

  var hasAlreadyCountedThisCollision = false;
  Arena.prototype.step = function () {
    var collisioning = false;
    var arr = this.svg.selectAll('.enemy')[0];
    for(var i = 0; i < arr.length; i++){
      var enemy = d3.select(arr[i]);
      var x = enemy.attr('cx');
      var y = enemy.attr('cy');
      // calculate distances and check collisions
      var d = Math.sqrt( Math.pow(this.player.x - x, 2) + Math.pow(this.player.y - y, 2) );
      // debugger;
      if (d < +this.player.r + +enemy.attr('r') ) { collisioning = true; }
    }
    if (!collisioning) {
      // reset the flag.
      hasAlreadyCountedThisCollision = false;
      this.player.fill = 'yellow';
    } else {
      this.player.fill = 'black';
      if(!hasAlreadyCountedThisCollision){
        collisions++;
      }
      hasAlreadyCountedThisCollision =true;
      score = 0;
    }
      this.draw();
    setTimeout(this.step.bind(this), 16);
};

  var dragHandler = function (dragCallback, dropCallback) {

    var drag = d3.behavior.drag();

    drag.on("drag", dragCallback)
    .on("dragend", dropCallback);
    return drag;
  };

  var dropHandler = function (d) {
     // alert('dropped');
  };

  var dragmove = function (d) {

    d3.select(this)
    .attr("x", d.x = d3.event.x)
    .attr("y", d.y = d3.event.y);
  };

  Arena.prototype.slowDraw = function () {
    if (this.svg === undefined) { return; }

    var circles = this.svg.selectAll('.enemy').data(this.enemies);

    circles.enter().append('circle')
           .attr('class', 'enemy')
           .attr('fill', function (e) { return e.fill; })
           .attr('r', function (e) { return e.r; });
    circles.transition()
           .duration(1750)
           .attr('cx', function (e) { return e.x; })
           .attr('cy', function (e) { return e.y; })
           ;
  };

  Arena.prototype.draw = function () {
    if (this.svg === undefined) { return; }

    var circles = this.svg.selectAll('.player').data([this.player]);
    circles.enter().append('circle')
           .attr('class', 'player')
           .attr('r', function (e) { return e.r; })
           .call(dragHandler(dragmove, dropHandler));
    circles
           .attr('fill', function (e) { return e.fill; })
           .attr('cx', function (e) { return e.x; })
           .attr('cy', function (e) { return e.y; });

    var scor = d3.selectAll('.current span').data([score]).text(function(d) { return d; });
    var high = d3.selectAll('.high span').data([highScore]).text(function(d) { return d; });
    var collision = d3.selectAll('.collisions span').data([collisions]).text(function(d) { return d; });


  };
  // To make a variable public, add it to our return statement.
  return {
    Player: Player,
    Enemy: Enemy,
    Arena: Arena
  };

})();
