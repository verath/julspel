part of julspel;

/**
 * The ground is a seperate object from the world border as the ground should be 
 * Walkable, but the world border is not. Other than that it functions the same way,
 * restricting the players movement downwards.
 */
class Ground extends GameObject implements Walkable {
  Body _body;

  Body get physicsBody => this._body;
  
  Ground(World world, Vector2 size) : super(world) {
    // Create shape
    final PolygonShape shape = new PolygonShape();

    // Define body
    final BodyDef bodyDef = new BodyDef();
    
    // Place at center bottom of screen
    bodyDef.position.setValues(0.0, -(Game.CANVAS_HEIGHT/2)/Game.VIEWPORT_SCALE);
    bodyDef.userData = this;
    
    // Create body
    _body = world.createBody(bodyDef);
    
    shape.setAsBox(size.x/2, 2.0/Game.VIEWPORT_SCALE);
    _body.createFixtureFromShape(shape);
  }
  
  
}