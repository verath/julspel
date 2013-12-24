part of julspel;


class Level4 extends Level {
  
  /** The player character */
  Player player;
  
  ImageElement img_background = new ImageElement(src: "images/level4.png");
  
  Vector2 background_pos;
  
  String get levelName => "Level 4";
  
  Level4(Game game, CanvasRenderingContext2D ctx) : super(game, ctx, new Vector2(100.0, 180.0)) {
    Game.addImageToLoad(img_background);
    
    // NO IDEA WHY, but it works
    background_pos = new Vector2(0.0, size.y/4);
    
    player = new Player(world, new Vector2(-20.0, -20.0));
    gameObjectViews.add(new PlayerView(player));
    
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 0.0, -25.0, 10.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 0.0, -18.0, 10.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 0.0, -11.0, 10.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 0.0, -4.0, 10.0)));
    
    
    gameObjectViews.add(new WallView(new Wall(world, 6.0, 5.0)));
    gameObjectViews.add(new WallView(new Wall(world, 6.0 + Player.WIDTH + 3, 5.0)));
    
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 6.0 + Player.WIDTH + 3 + 6, -25.0, 10.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 6.0 + Player.WIDTH + 3 + 6, -18.0, 10.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 6.0 + Player.WIDTH + 3 + 6, -11.0, 10.0)));
    gameObjectViews.add(new WalkablePlatformView(new WalkablePlatform(world, 6.0 + Player.WIDTH + 3 + 6, -4.0, 10.0)));
    
    
    
    gameObjectViews.add(new GoalView(new Goal(world, this, 9.5, 12.0)));
  }
  
  String get backgroundColor => "#000";
  

  void _renderBackground(num timestamp) {    
    canvasDraw.drawBackgroundImage(img_background, background_pos.clone(), size);
  }
}