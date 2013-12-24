/**
 * 
 * A simple 2d-platformer using dart-box2d, controlled with A-D and space. 
 * 
 * This game was written in 3 days by Peter Eliason, https://github.com/verath.
 */

library julspel;


import 'dart:math';
import 'dart:html';
import 'package:box2d/box2d_browser.dart';
import 'dart:async';

// This can't be the right way to do things... but it works!

part 'game.dart';

part 'objects/ground.dart';
part 'objects/player.dart';
part 'objects/gameobject.dart';
part 'objects/walkable.dart';
part 'collision_listener.dart';
part 'objects/platform.dart';
part 'objects/wall.dart';
part 'objects/goal.dart';
part 'objects/world_border.dart';

part 'views/view_canvas_draw.dart';

part 'views/game_won_view.dart';
part 'views/level_swap_indicator.dart';

part 'views/game_object_view.dart';
part 'views/static_object_view.dart';
part 'views/world_border_view.dart';
part 'views/player_view.dart';
part 'views/platform_view.dart';
part 'views/wall_view.dart';
part 'views/goal_view.dart';

part 'levels/level.dart';
part 'levels/level1.dart';
part 'levels/level2.dart';
part 'levels/level3.dart';
part 'levels/level4.dart';
part 'levels/level5.dart';
part 'levels/level6.dart';

// Entry point, start the game!
void main() {
  Game game = new Game()
    ..initialize()
    ..run();
}
