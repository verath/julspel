part of julspel;

class Wall extends Platform {
  Wall(World world, double x, double y, [double width = 2.0, double height = 20.0]) : super(world, x, y, width, height);
}

class WalkableWall extends Wall implements Walkable {
  WalkableWall(World world, double x, double y, [double width = 2.0, double height = 20.0]) : super(world, x, y, width, height);
}