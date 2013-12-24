part of julspel;

class Player extends GameObject {
  
  static const int MAX_JUMPS = 2;
  
  static const double HEIGHT = 8.0;
  static const double WIDTH = 4.0;
  
  static const double MAX_SPEED_X = 8.0;
  
  static const double ACCELERATION_X = 2.0;
  static const double ACCELERATION_Y = 8.0;
  
  num _jumpCharges = MAX_JUMPS;
  
  Body _body;
  
  Body get physicsBody => _body;
  
  /** Creates the player object in the world, using world coordinates for position. */
  Player(World world, Vector2 position) : super(world){
    
    // Create shape
    final PolygonShape shape = new PolygonShape();

    // Define body
    final BodyDef bodyDef = new BodyDef();
    
    // Place at center of screen
    bodyDef.position.setFrom(position);
    bodyDef.awake = true;
    bodyDef.type = BodyType.DYNAMIC;
    bodyDef.userData = this;
    
    

    // Create body
    _body = world.createBody(bodyDef);

    shape.setAsBox(Player.WIDTH/2, Player.HEIGHT/2);
    _body.createFixtureFromShape(shape);
  }
  
  
  void jump() {
    if(_jumpCharges < 1) return;
    
    _body.applyLinearImpulse(new Vector2(0.0, ACCELERATION_Y), _body.sweep.center);
    _jumpCharges--;
    
  }
  
  void moveLeft() {
    _body.applyLinearImpulse(new Vector2(-ACCELERATION_X, 0.0), _body.sweep.center);
    
    if(_body.linearVelocity.x < -MAX_SPEED_X)
      _body.linearVelocity.x = -MAX_SPEED_X;

  }
  
  void moveRight() {
    _body.applyLinearImpulse(new Vector2(ACCELERATION_X, 0.0), _body.sweep.center);
    
    if(_body.linearVelocity.x > MAX_SPEED_X)
      _body.linearVelocity.x = MAX_SPEED_X;
  }
  
  void beginContact(GameObject other) {
    if(other is Walkable) {
      _jumpCharges = MAX_JUMPS;
    }
  }
  
  // View functions
  bool get isJumping => _body.linearVelocity.y > 0;
  
  bool get isMovingRight => _body.linearVelocity.x > 0;
  
  bool get isMovingLeft => _body.linearVelocity.x < 0;
  
  
}