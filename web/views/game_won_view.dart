part of julspel;

class GameWonView {
  
  /** The canvas rendering context. */
  CanvasRenderingContext2D ctx;

  /** Background image for game won */
  ImageElement img_back_won = new ImageElement(src: "images/background_won.png");
  
  Random rng = new Random();
  
  GameWonView(CanvasRenderingContext2D this.ctx) {
    Game.addImageToLoad(img_back_won);
  }
  
  void render(num timestamp) {
    int frame = ((timestamp % 800) / (800/4)).ceil();
    
    ctx.fillStyle = "#2e422c";
    ctx.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);  
    
    if(frame == 1)
      ctx.drawImageToRect(img_back_won, new Rectangle(0, 0, 800, 600), 
          sourceRect: new Rectangle(0, 0, 800, 600));
    else if(frame == 2)
        ctx.drawImageToRect(img_back_won, new Rectangle(0, 0, 800, 600), 
            sourceRect: new Rectangle(800, 0, 800, 600));
    else if(frame == 3)
      ctx.drawImageToRect(img_back_won, new Rectangle(0, 0, 800, 600), 
          sourceRect: new Rectangle(0, 600, 800, 600));
    else if(frame == 4)
      ctx.drawImageToRect(img_back_won, new Rectangle(0, 0, 800, 600), 
          sourceRect: new Rectangle(800, 600, 800, 600));
      
   
    // Win message
    ctx..lineWidth = 0.5
        ..fillStyle = "#000"
        ..font = "100px sans-serif"
        ..fillText("YOU DID IT!", 100+rng.nextInt(5), 100+rng.nextInt(5));
    
  }
}