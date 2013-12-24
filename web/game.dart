part of julspel;

class Game { 
  
  /** The default canvas width */
  static const int CANVAS_WIDTH = 800;
  /** The default canvas height */
  static const int CANVAS_HEIGHT = 600;
  
  /** Scale of the viewport. */
  static const double VIEWPORT_SCALE = 10.0;

  /** The gravity vector's y value. */
  static const double GRAVITY = -10.0;

  /* The timestep and iteration numbers. */
  static const num TIME_STEP = 1/60;
  static const int VELOCITY_ITERATIONS = 10;
  static const int POSITION_ITERATIONS = 10;
  
  /** Time in milliseconds between the level switching */
  static const int LEVEL_SWITCH_INTERVAL = 16*1000; 
  
  /** Time in milliseconds for the level switch fade */
  static const int LEVEL_SWITCH_FADE_TIME = 2500;
  
  /** Number of snow flakes to draw */
  static const int SNOWFLAKES_NUM = 150;
  
  /** Toggle physics debug drawing */
  static const bool DEBUG_DRAW = false;
  
  /** The drawing canvas. */
  CanvasElement canvas;

  /** The canvas rendering context. */
  CanvasRenderingContext2D ctx;

  /** Frame count for fps */
  int frameCount;
  
  /** The html ele for showing the fps */
  Element fpsCounter;
  
  /** List of pressed keys since last render */
  List<int> keysDown = new List<int>();
  
  /** List of all the levels in the game */
  List<Level> levels = new List<Level>();
  
  /** The current level */
  Level currentLevel;
  
  /** The previous level, used for fading */
  Level previousLevel;
  
  /** Last timestamp we swap levels at */
  double levelSwapFinishTimestamp = 0.0;
  
  /** Timestamp for when the level swap began */
  double levelSwapStartTimestamp = 0.0;
  
  bool isGameWon = false;
  bool levelCompleted = false;
  
  /** The view displaying game won message */
  GameWonView gameWonView;
  
  LevelSwapIndicator levelSwapIndicator;
  
  List<Vector2> snowFlakes = new List<Vector2>();
  
  var rng = new Random();
  
  /** A list of all images to be loaded before starting */
  static List<Future> imagesLoading = new List<Future>();
  
  /** Flag if all images has been loaded */
  static bool imagesLoaded = false;
   
  
  void drawSnow() {
    // LET IT SNOW!
    ctx..fillStyle = "#fff";
    snowFlakes.forEach((Vector2 pos){
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2, 0, PI * 2);
      ctx.closePath();
      ctx.fill();
      
      pos.x += rng.nextDouble() * 4 - 2;
      pos.y += rng.nextDouble() * 2;
      
      if(pos.y > Game.CANVAS_HEIGHT) {
        pos.y = 0.0;
        pos.x = rng.nextDouble() * Game.CANVAS_WIDTH;
      }
    });
  }

  /** step timestep seconds forwards */
  void step(num timestamp) {     
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    if(isGameWon) {
      // If we won the game
      gameWonView.render(timestamp);
    } else if (levelCompleted) {
      // If we completed the current level last step
      levelCompleted = false;
      goToNextLevel();
      levels.remove(previousLevel);
      levelSwapStartTimestamp = timestamp;
    } else if((timestamp - levelSwapStartTimestamp) < LEVEL_SWITCH_FADE_TIME) {
      // Fade between two levels
      if(previousLevel != null) previousLevel.render(timestamp);
      
      ctx.globalAlpha = (timestamp - levelSwapStartTimestamp) / (LEVEL_SWITCH_FADE_TIME/2);
      currentLevel.render(timestamp);
      
      double secLeft = (LEVEL_SWITCH_FADE_TIME - (timestamp - levelSwapStartTimestamp))/1000;
      String levelName = currentLevel.levelName;
      
      ctx..globalAlpha = 1
         ..lineWidth = 0.5
         ..fillStyle = "#fff"
         ..font = '80px monospace'
         ..fillText("$levelName in " + ((secLeft*10).round()/10).toString()+"s", 40, 140);
      
      levelSwapFinishTimestamp = timestamp;
    } else if(currentLevel != null) {
      
      // Save a reference to the level we are rendering, as it might be 
      // "won" during the physics simulation, which unset currentLevel
      Level cLevel = currentLevel;
      
      // Forward to current level
      cLevel.step(timestamp);
      
      // Draw current level
      cLevel.render(timestamp);
      
      // Draw debug physics on-top
      if(DEBUG_DRAW) cLevel.world.drawDebugData();
      
      // Draw level swap indicator, if we have more levels after current one
      if(levels.length > 1)
        levelSwapIndicator.render(timestamp, ctx, 
            (timestamp - levelSwapFinishTimestamp)/LEVEL_SWITCH_INTERVAL);
      
      // Handle input
      cLevel.handleInput(keysDown);
      
      // Swap levels every LEVEL_SWITCH_INTERVAL milliseconds
      if((timestamp - levelSwapFinishTimestamp) > LEVEL_SWITCH_INTERVAL) {
        if(!isGameWon){
          goToNextLevel();
          if(levels.length > 1)
            levelSwapStartTimestamp = timestamp;
        }
      }
    }
    
    keysDown.clear();
    
    // Snow!
    drawSnow();
    
    ++frameCount;
    window.animationFrame.then((num time) {step(time); } );
  }
  
  
  /**
   * Creates the canvas, fps counter element
   */
  void _initCanvas() {   
    // Setup the canvas.
    canvas = new Element.tag('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    document.body.nodes.add(canvas);
    ctx = canvas.getContext("2d");

    // Reset fps and set up timer to update the display every 1 sec.
    frameCount = 0;
    fpsCounter = querySelector("#fps-counter");
    
    if(DEBUG_DRAW) {
      new Timer.periodic(new Duration(seconds: 1), (Timer t) {
          fpsCounter.innerHtml = "FPS: " + frameCount.toString();
          frameCount = 0;
      });
    } else {
      fpsCounter.hidden = true;
    }
  }
  
  void initialize() {
    // Setup canvas
    _initCanvas();
    
    // Create the game won view
    gameWonView = new GameWonView(ctx);
    
    // Create the level swap indicator (bar up top)
    levelSwapIndicator = new LevelSwapIndicator();
    
    // Create the snow flakes
    for(int i = 0; i < SNOWFLAKES_NUM; i++) {
      double x = rng.nextDouble() * Game.CANVAS_WIDTH;
      double y = rng.nextDouble() * Game.CANVAS_HEIGHT;
      snowFlakes.add(new Vector2(x, y));
    }

    // Setup levels
    levels.add(new Level1(this, ctx));
    levels.add(new Level2(this, ctx));
    levels.add(new Level3(this, ctx));
    levels.add(new Level4(this, ctx));
    levels.add(new Level5(this, ctx));
    levels.add(new Level6(this, ctx));
    
    // If we want to draw physics debug, we need to register a
    // debug draw.
    if(DEBUG_DRAW) {
      levels.forEach((Level l){
        DebugDraw debugDraw = new CanvasDraw(l.viewport, ctx);
        l.world.debugDraw = debugDraw;
      });
    }
    
    goToFirstLevel();
    
    // Listen for keypresses
    window.onKeyDown.listen((KeyboardEvent e){
      keysDown.add(e.keyCode);
    });
  }
  
  /** Show loading indicator while loading images */
  void waitForImages(num timestamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#3e523c";
    ctx.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    
    int numDots = (timestamp % 600) ~/ (600/4);
    String dots = "";
    for(var i = 0; i < numDots; i++) dots += ".";
    
    ctx..lineWidth = 0.5
        ..fillStyle = "#fff"
        ..font = '100px monospace'
        ..fillText("Loading$dots", 40, 140);    
    
    levelSwapFinishTimestamp = timestamp;
    levelSwapStartTimestamp = timestamp;
    
    if(imagesLoaded)
      window.requestAnimationFrame((num time) { step(time); });
    else
      window.requestAnimationFrame((num time) { waitForImages(time); });
  }
  
  
  /**
   * Starts running the game.
   */
  void run() {
    _loadImages();
    
    window.requestAnimationFrame((num time) { waitForImages(time); });
    if(imagesLoaded)
      window.requestAnimationFrame((num time) { step(time); });
    else
      window.requestAnimationFrame((num time) { waitForImages(time); });
  }
  
  winGame() {
    currentLevel = null;
    isGameWon = true;
  }
  
  /**
   * Moves to the first level of the game.
   */
  void goToFirstLevel() {    
    if(currentLevel != null) currentLevel.inActive();
    currentLevel = levels.first
        ..active();
  }
  
  /**
   * Moves to the next level of the game. 
   * Wraps around to the first if current level is last active one.
   */
  void goToNextLevel() {
    previousLevel = currentLevel;
    num levelIndex = levels.indexOf(currentLevel);
    if(levelIndex+1 < levels.length) {
      if(currentLevel != null) currentLevel.inActive();
      currentLevel = levels[levelIndex+1]
          ..active();
    } else {
      goToFirstLevel();
    }
  }
  
  /**
   * Called to mark the current level as finished. If the current level
   * is the last level, the game will be won.
   */
  completeLevel(Level level) {
    if(levels.length == 1) 
      winGame();
    else if(currentLevel == level)
      levelCompleted = true;
  }
  
  /** 
   * "Waits" for all images registered using addImageToLoad to load, then
   * sets the imagesLoaded flag to true.
   */
  static void _loadImages() {
    Future.wait(imagesLoading).then((_){
      imagesLoaded = true;
    });
  }
  
  /**
   * Adds an Image Element to the list of images to wait for.
   */
  static void addImageToLoad(ImageElement img) {
    imagesLoading.add(img.onLoad.first);
  }
}