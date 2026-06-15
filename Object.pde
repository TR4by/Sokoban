class Object
{
  int x, y, size;
  String type, standingOn; 
  color colour;
  boolean canStand, canPush;
  PImage texture;
  
  Object(String setType)
  {
    size = 40;
    type = setType;
    set_type(type);
    standingOn = "floor";
  }
  
  void show(int x, int y)
  {
    image(texture, x * size, y * size);
  }
  
  void set_type(String setType)
  {
    type = setType;
    canPush = false;
    canStand = false;
    switch(type)
    {
      case "air":
        texture = game.air_texture;
        break;
      case "wall":
        texture = game.wall_texture;
        break;
      case "floor":
        texture = game.floor_texture;
        canStand = true;
        break;
      case "crate":
        texture = game.crate_texture;
        canPush = true;
        break;
      case "crate_spot":
        texture = game.cratespot_texture;
        canStand = true;
        break;
      case "lit_crate":
        texture = game.litcrate_texture;
        canPush = true;
        break;
      case "dark_crate":
        texture = game.darkcrate_texture;
        canStand = true;
        break;
      case "player":
        texture = game.player_down_texture;
        break;
      case "player_editor":
        texture = game.player_editor_texture;
        break;
    }
  }
}
