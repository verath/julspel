part of julspel;

class Level1 extends Level {
  
  /** The player character */
  Player player;
  
  ImageElement img_background = new ImageElement(src: "images/level1.png");
  
  Vector2 background_pos;
  
  String get levelName => "Level 1";
  
  Level1(Game game, CanvasRenderingContext2D ctx) : super(game, ctx, new Vector2(100.0, 140.0)) {
    Game.addImageToLoad(img_background);
    
    // NO IDEA WHY, but it works
    background_pos = new Vector2(0.0, size.y/4);
    
    player = new Player(world, new Vector2(-20.0, -20.0));
    gameObjectViews.add(new PlayerView(player));

    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 30.0, -17.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 10.0, -21.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, -10.0, -25.0)));
    
    gameObjectViews.add(new GoalView(new Goal(world, this, 30.0, 12.0)));
  }
  

  void _renderBackground(num timestamp) {   
    canvasDraw.drawBackgroundImage(img_background, background_pos.clone(), size);
  }
  
}