part of julspel;

/**
 * A view for rendering objects that doesn't move.
 */
class StaticObjectView extends GameObjectView {
  GameObject obj;
  
  Vector2 pos;
  Vector2 size;
  
  ImageElement img;
  Vector2 imgOffset;
  Vector2 imgSize;
  
  StaticObjectView(GameObject this.obj, ImageElement this.img, Vector2 this.imgOffset, Vector2 this.imgSize) {
    Game.addImageToLoad(img);
    pos = obj.physicsBody.position.clone();
    size = new Vector2(obj.width, obj.height);
  }
  
  void render(ViewCanvasDraw canvasDraw, num timestamp) {    
    canvasDraw.drawImageFromSource(img, imgOffset.x, imgOffset.y, imgSize.x, imgSize.y, pos.clone(), size);
    
  }
}