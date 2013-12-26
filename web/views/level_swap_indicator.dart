part of julspel;

class LevelSwapIndicator {
  
  static ImageElement img_indicator_bg = new ImageElement(src: 'images/level_indicator_bg.png');
  static ImageElement img_indicator = new ImageElement(src: 'images/level_indicator.png');

  
  LevelSwapIndicator() {
    Game.addImageToLoad(img_indicator);
    Game.addImageToLoad(img_indicator_bg);
  }
  
  void render(num timestamp, CanvasRenderingContext2D ctx, double progress) {
    ctx.drawImageScaledFromSource(img_indicator_bg, 0, 0, 500, 10, 10, 10, Game.CANVAS_WIDTH-20, 10);
    
    double x = (progress * (Game.CANVAS_WIDTH-60))+30;
    
    ctx.drawImageScaledFromSource(img_indicator, 0, 0, 60, 60, x, 5, 20, 20);
  }
}