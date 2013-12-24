part of julspel;

abstract class Level {
  
  /** The game instance */
  Game game;
  
  /** The canvas context */
  CanvasRenderingContext2D ctx;
  
  /** The physics world. */
  World world;
  
  /** The transform abstraction layer between the world and drawing canvas. */
  ViewportTransform viewport;
  
  /** The canvas draw object */
  ViewCanvasDraw canvasDraw;
  
  /** List of all the views to render */
  List<GameObjectView> gameObjectViews = new List<GameObjectView>();
  
  /** The player character for this level */
  Player get player;
  
  /** The world border object */
  WorldBorder worldBorder;
  
  /** The level size */
  Vector2 size; 
  
  /* The ground object, essentially a world object for the bottom edge */
  Ground ground;
  
  Level(Game this.game, CanvasRenderingContext2D this.ctx, Vector2 this.size) {
    // Create a new world
    world = new World(new Vector2(0.0, Game.GRAVITY), true, new DefaultWorldPool()); 
    world.contactListener = new CollisionListener();
    
    // Create the viewport transform with the center at extents.
    final extents = new Vector2(Game.CANVAS_WIDTH / 2, Game.CANVAS_HEIGHT / 2);
    viewport = new CanvasViewportTransform(extents, extents);
    viewport.scale = Game.VIEWPORT_SCALE;
    
    canvasDraw = new ViewCanvasDraw(viewport, ctx); 
    
    // Create the world border
    gameObjectViews.add(new WorldBorderView(new WorldBorder(world, size)));
    ground = new Ground(world, size);
    
    
  }
  
  
  /** Moves the camera, following the player */
  void _moveCamera() {
    // Translate from world to screen cords
    Vector2 playerPos = new Vector2.zero();
    viewport.getWorldToScreen(player.physicsBody.position, playerPos);
    
    // Make camera follow the player on the x-axis
    if((playerPos.x - viewport.center.x).abs() > 1)  {
      if(playerPos.x > viewport.center.x)
        viewport.center.x++;
      else
        viewport.center.x--;
    }
    
    // and the y axis
    if( playerPos.y < 0) {
      viewport.center.y += Game.CANVAS_HEIGHT;
    } else if( playerPos.y > Game.CANVAS_HEIGHT) {
      viewport.center.y -= Game.CANVAS_HEIGHT;
    }
  }
  
  /** Called when the level is set as the active level */
  void active(){
    ;
  }
  
  /** Called when the level is no longer the active level */
  void inActive() {
    ;
  }
  
  void _renderBackground(num timestamp);
  
  String get backgroundColor => "#3e523c";
  
  void render(num timestamp) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    
    _renderBackground(timestamp);
        
    gameObjectViews.forEach((GameObjectView view){
      view.render(canvasDraw, timestamp);
    });
  }
  
  
  void step(num timestamp) {
    world.step(Game.TIME_STEP, Game.VELOCITY_ITERATIONS, Game.POSITION_ITERATIONS); 
    _moveCamera();
  }
  
  void complete() {
    game.completeLevel(this);
  }
  
  handleInput(List<int> keysDown) {
    keysDown.forEach((int keyCode){
      if(keyCode == KeyCode.SPACE) {
        player.jump();
      } else if(keyCode == KeyCode.A)
        player.moveLeft();
      else if(keyCode == KeyCode.D)
        player.moveRight();
    }); 
  }
  
  String get levelName;
}