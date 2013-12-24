part of julspel;

/**
 * Simple collision listener, uses the bodies' userData field to extract the GameObjects
 * and forwards the beginContact and endContact to them.
 */
class CollisionListener implements ContactListener {
  void beginContact(Contact contact){
    
    Object objA = contact.fixtureA.body.userData;
    Object objB = contact.fixtureB.body.userData;
    
    if( objA is GameObject && objB is GameObject) {
      // Dart Editor pretty cool. It knows that objA/B is of the type GameObject here!
      objA.beginContact(objB);
      objB.beginContact(objA);
    }
  }
  
  void endContact(Contact contact){
    Object objA = contact.fixtureA.body.userData;
    Object objB = contact.fixtureB.body.userData;
    
    if( objA is GameObject && objB is GameObject) {
      objA.endContact(objB);
      objB.endContact(objA);
    }
  }

  void postSolve(Contact contact, ContactImpulse impulse) {
  }

  void preSolve(Contact contact, Manifold oldManifold) {
  }
}