part of julspel;


class Level6 extends Level {
  
  /** The player character */
  Player player;
  
  ImageElement img_background = new ImageElement(src: "images/level6.png");
  
  Vector2 background_pos;
  
  String get levelName => "Level 6";
  
  Level6(Game game, CanvasRenderingContext2D ctx) : super(game, ctx, new Vector2(140.0, 200.0)) {
    Game.addImageToLoad(img_background);
    
    // NO IDEA WHY, but it works
    background_pos = new Vector2(0.0, size.y/4);
    
    player = new Player(world, new Vector2(-20.0, -20.0));
    gameObjectViews.add(new PlayerView(player));
    
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 0.0, -25.0, 10.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 0.0, -18.0, 10.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 0.0, -11.0, 10.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 0.0, -4.0, 10.0)));
    
    gameObjectViews.add(new PlatformView(new Platform(world, 0.0, -4.0 + Player.HEIGHT + 4, 20.0)));   
    
    
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 50.0, -25.0, 2.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 50.0, -18.0, 2.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 50.0, -11.0, 2.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 50.0, -4.0, 2.0)));
    
    
    gameObjectViews.add(new GoalView(new Goal(world, this, 0.0, 12.0)));
  }
  
  String get backgroundColor => "#b7acac";
  
  void _renderBackground(num timestamp) { 
    canvasDraw.drawBackgroundImage(img_background, background_pos.clone(), size);
  }
}