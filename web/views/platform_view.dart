part of julspel;


class PlatformView extends StaticObjectView {
  
  static ImageElement _img_platform = new ImageElement(src: "images/platform_not_walkable.png");
  static Vector2 _imgOffset = new Vector2.zero();
  static Vector2 _imgSize = new Vector2(200.0, 20.0);
  
  PlatformView(Platform platform) : super (platform, _img_platform, _imgOffset, _imgSize);
}


class WalkablePlatformView extends StaticObjectView {
  static ImageElement _img_platform = new ImageElement(src: "images/platform.png");
  static Vector2 _imgOffset = new Vector2.zero();
  static Vector2 _imgSize = new Vector2(200.0, 20.0);
  
  WalkablePlatformView(Platform platform) : super (platform, _img_platform, _imgOffset, _imgSize);
}