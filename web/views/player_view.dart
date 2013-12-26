part of julspel;


class PlayerView extends GameObjectView {
  static ImageElement img_player = new ImageElement(src: "images/player.png");
  
  Player _player;
  
  PlayerView(Player this._player) {
    Game.addImageToLoad(img_player);
  }
  
  
  void render(ViewCanvasDraw canvasDraw, num timestamp) {  
    Vector2 playerPos = _player.physicsBody.position.clone();
    Vector2 playerSize = new Vector2(Player.WIDTH, Player.HEIGHT);
    
    int frame = ((timestamp % 400) / (400/2)).ceil();
    
    if(_player.isJumping) {
      if(frame == 1)
        canvasDraw.drawImageFromSource(img_player, 0, 200, 100, 200, playerPos, playerSize);
      else
        canvasDraw.drawImageFromSource(img_player, 100, 200, 100, 200, playerPos, playerSize);
    } else if(_player.isMovingLeft) {
      if(frame == 1)
        canvasDraw.drawImageFromSource(img_player, 0, 400, 100, 200, playerPos, playerSize);
      else
        canvasDraw.drawImageFromSource(img_player, 100, 400, 100, 200, playerPos, playerSize);
    } else if(_player.isMovingRight) {
      if(frame == 1)
        canvasDraw.drawImageFromSource(img_player, 0, 600, 100, 200, playerPos, playerSize);
      else
        canvasDraw.drawImageFromSource(img_player, 100, 600, 100, 200, playerPos, playerSize);
    } else {
      if(frame == 1)
        canvasDraw.drawImageFromSource(img_player, 0, 0, 100, 200, playerPos, playerSize);
      else
        canvasDraw.drawImageFromSource(img_player, 100, 0, 100, 200, playerPos, playerSize);
    }
  }
}