part of julspel;

/**
 * Helper class for rendering views on the canvas. Inspired by the "CanvasDraw" from dart-box2d, 
 * but modified for drawing images instead of shapes.
 */
class ViewCanvasDraw {
    /** The canvas rendering context with which to draw. */
    CanvasRenderingContext2D ctx;
    
    /** The viewport */
    ViewportTransform viewport;
    
    ViewCanvasDraw(ViewportTransform this.viewport, this.ctx);
    
    /** MODIFIES POS! */
    void drawImage(CanvasImageSource source, Vector2 pos, Vector2 size) {
      // Adjust positions from world -> screen
      getWorldToScreenToOut(pos, pos);

      // Adjust size to the scale
      size *= viewport.scale;
      
      // World positions start at center of object, screen is top left
      pos -= (size/2.0);
      
      ctx.drawImageScaled(source, pos.x, pos.y, size.x, size.y);
    }
    
    void drawBackgroundImage(CanvasImageSource source, Vector2 pos, Vector2 size) {
      size = size.clone() / 2.0;
      
      // Adjust positions from world -> screen
      getWorldToScreenToOut(pos, pos);

      // World positions start at center of object, screen is top left
      pos.y -= (size.y/2.0);
      
      // Adjust size to the scale
      size *= viewport.scale;
      
      // Draw the background repeating on the x-axis.
      ctx.drawImageScaled(source, pos.x, pos.y, size.x, size.y);
      ctx.drawImageScaled(source, pos.x-size.x, pos.y, size.x, size.y);
      ctx.drawImageScaled(source, pos.x+size.x, pos.y, size.x, size.y);
      ctx.drawImageScaled(source, pos.x-size.x*2, pos.y, size.x, size.y);
      ctx.drawImageScaled(source, pos.x+size.x*2, pos.y, size.x, size.y);
    }
    
    /** MODIFIES POS! */
    void drawImageFromSource(CanvasImageSource source,
                   num sourceX, num sourceY, num sourceWidth, num sourceHeight, 
                   Vector2 pos, Vector2 size) {
      
      // Adjust positions from world -> screen
      getWorldToScreenToOut(pos, pos);

      // Adjust size to the scale
      size *= viewport.scale;
      
      // World positions start at center of object, screen is top left
      pos -= (size/2.0);
      
      ctx.drawImageScaledFromSource(source, sourceX, sourceY, sourceWidth, sourceHeight, 
          pos.x, pos.y, size.x, size.y);
    }

    /**
     * World coordinates are specified in argWorld. These coordinates are
     * converted to screen coordinates and placed in the argScreen return vector.
     */
    void getWorldToScreenToOut(Vector2 argWorld, Vector2 argScreen) {
      viewport.getWorldToScreen(argWorld, argScreen);
    }
}