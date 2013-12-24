part of julspel;


class WallView extends StaticObjectView {
  
  static ImageElement _img_platform = new ImageElement(src: "images/wall.png");
  static Vector2 _imgOffset = new Vector2.zero();
  static Vector2 _imgSize = new Vector2(20.0, 200.0);
  
  WallView(Wall wall) : super (wall, _img_platform, _imgOffset, _imgSize);
}