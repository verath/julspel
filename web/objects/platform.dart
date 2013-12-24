part of julspel;

class Platform extends GameObject {
  Body _body;

  Body get physicsBody => this._body;
  
  double width;
  double height;
  
  Platform(World world, double x, double y, [double this.width = 20.0, double this.height = 2.0]) : super(world) {
    // Create shape
    final PolygonShape shape = new PolygonShape();

    // Define body
    final BodyDef bodyDef = new BodyDef();
    
    // Place at center bottom of screen
    bodyDef.position.setValues(x, y);

    bodyDef.userData = this;
    
    // Create body
    _body = world.createBody(bodyDef);
    
    shape.setAsBox(width/2, height/2);
    _body.createFixtureFromShape(shape);
  }
  
}


class WalkablePlatform extends Platform implements Walkable {
  WalkablePlatform(World world, double x, double y, [double width = 20.0, double height = 2.0]) : super(world, x, y, width, height);
}