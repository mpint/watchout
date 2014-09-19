describe('The arena',function(){
  var arena;
  var numEnemies;
  var width;
  var height;
  var Arena = WatchOut.Arena;
  var Enemy = WatchOut.Enemy;
  var Player = WatchOut.Player;
  var fakeBody;
  beforeEach(function(){
    /* USAGE
      var element = d3.select('body');
      var arena = new Arena();
      arena.createArena(400,200,10);
      arena.appendTo(element);
      arena.start();*/

    numEnemies = 10;
    width = 700;
    height = 400;
    var elementType = 'div';
    fakeBody = d3.select(document.createElement(elementType));
    arena = new Arena(width,height,numEnemies);
    arena.appendTo(fakeBody);

  });
  it('should have an array of enemies',function(){
    expect(arena.enemies).to.be.a('array');
    expect(arena.enemies.length).to.equal(10);
    expect(arena.enemies[0] instanceof Enemy).to.be.true;

  });
  it('should have dimensions',function(){
    expect(arena.width).to.equal(width);
    expect(arena.height).to.equal(height);
  });

  it('should have an svg root element called element',function(){
    console.log(arena.svg);
    expect(arena.svg[0][0].nodeName).to.equal('svg');
  });

  it('should be an object',function(){
    expect(arena).to.be.a('object');
  });

});


// describe('An enemy class',function(){
//   var enemy;
//   beforeEach(function(){
//     enemy = new Enemy();
//   });
//   it('should be an object',function(){
//     expect(player).to.be.a('object');
//   });

// });

// describe('A player class',function(){
//   var player;
//   beforeEach(function(){
//     player = new Player();
//   });
//   it('should be an object',function(){
//     expect(player).to.be.a('object');
//   });

// });
