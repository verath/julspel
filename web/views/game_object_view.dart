part of julspel;

/** A view that can be rendered... */
abstract class GameObjectView {
  
  void render(ViewCanvasDraw canvasDraw, num timestamp);
}