part of julspel;


class GoalView extends StaticObjectView {
  
  static ImageElement _img_goal = new ImageElement(src: "images/goal.png");
  static Vector2 _imgOffset = new Vector2.zero();
  static Vector2 _imgSize = new Vector2(100.0, 100.0);
  
  GoalView(Goal goal) : super (goal, _img_goal, _imgOffset, _imgSize);
  
  void render(ViewCanvasDraw canvasDraw, num timestamp) {
    pos = obj.physicsBody.position.clone();
    super.render(canvasDraw, timestamp);
  }
}