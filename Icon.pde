class Icon
{
  int x, y, size;
  String type;
  PImage texture; 
  
  Icon(int num, int setX, int setY)
  {
    size = 40;
    x = setX;
    y = setY - 10;
    switch(num)
    {
      case 0:
        type = "wall";
        texture = game.wall_texture;
        break;
      case 1:
        type = "floor";
        texture = game.floor_texture;
        break;
      case 2:
        type = "crate_spot";
        texture = game.cratespot_texture;
        break;
      case 3:
        type = "crate";
        texture = game.crate_texture;
        break;
      case 4:
        type = "lit_crate";
        texture = game.litcrate_texture;
        break;
      case 5:
        type = "dark_crate";
        texture = game.darkcrate_texture;
        break;
      case 6:
        type = "player_editor";
        texture = game.player_editor_texture;
        break;
    }
  }
  
  void show()
  {
    image(texture, x, y);
  }
  
  void press()
  {
    if (mouseX > x && mouseX < x + size && mouseY > y && mouseY < y + size)
    {
    editor.currentlyHeld = type;
    }
  }
}
