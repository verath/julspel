part of julspel;


/**
 * The goal is the object the player must reach in order to beat a level.
 */
class Goal extends GameObject {
  Body _body;
  Body get physicsBody => this._body;
  
  Level _level;
  
  double width;
  double height;
  
  Goal(World world, Level this._level, double x, double y, [double this.width = 5.0, double this.height = 5.0]) : super(world) {
    // Create shape
    final PolygonShape shape = new PolygonShape();

    // Define body
    final BodyDef bodyDef = new BodyDef();
    
    // Place at center bottom of screen
    bodyDef.position.setValues(x, y);
    bodyDef.type = BodyType.DYNAMIC;
    bodyDef.userData = this;
    
    // Create body
    _body = world.createBody(bodyDef);
    
    shape.setAsBox(width/2, height/2);
    _body.createFixtureFromShape(shape);
  }
  
  
  void beginContact(GameObject other) {
    if(other is Player) {
      _level.complete();
    }
  }
}