part of julspel;


/**
 * All the objects in the game is a game object. They all have a physics body handled by box2d
 * that keeps track of their position/direction/velocity and so on.
 */
abstract class GameObject {
  /**
   * The physics world
   */
  World _world;
  
  /** Creates a new GameObject within the physics world */
  GameObject(World this._world);
  
  /** Getter for the GameObject's physics body */
  Body get physicsBody;
  
  double get width => 0.0;
  double get height => 0.0;
  
  
  /** Collision start with other GameObject */
  void beginContact(GameObject other) {
    ;
  }
  
  /** Collision end with other GameObject */
  endContact(GameObject other) {
    ;
  }
}