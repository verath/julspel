part of julspel;

/**
 * A world border is a Left-Top-Right border around the level, preventing the player from 
 * moving outside the level.
 */
class WorldBorder extends GameObject {
  Body _body;

  Body get physicsBody => this._body;
  
  Vector2 size;
  
  WorldBorder(World world, Vector2 this.size) : super(world) {
    // Create shape
    final PolygonShape shape = new PolygonShape();

    // Define body
    final BodyDef bodyDef = new BodyDef();
    
    // Place at center bottom of screen
    bodyDef.position.setValues(0.0, -(Game.CANVAS_HEIGHT/2)/Game.VIEWPORT_SCALE);
    bodyDef.userData = this;
    
    // Create body
    _body = world.createBody(bodyDef);
    
    // Bottom left -> Top Left
    shape.setAsEdge(new Vector2(-size.x/2, 0.0), new Vector2(-size.x/2, size.y/2));
    _body.createFixtureFromShape(shape);
    
    // Top Left -> Top Right
    shape.setAsEdge(new Vector2(-size.x/2, size.y/2), new Vector2(size.x/2, size.y/2));
    _body.createFixtureFromShape(shape);
    
    // Top Right -> Bottom Right
    shape.setAsEdge(new Vector2(size.x/2, size.y/2), new Vector2(size.x/2, 0.0));
    _body.createFixtureFromShape(shape);
   
  }
  
  
  
}