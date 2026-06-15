class Asset_manager
{
  PImage wall_texture, air_texture, crate_texture, cratespot_texture, litcrate_texture, floor_texture, player_right_texture, player_left_texture, player_up_texture, player_down_texture, darkcrate_texture, player_editor_texture;
  
  void load_textures()
  {
    air_texture = assign_texture("air.png");
    wall_texture = assign_texture("wall.png");
    floor_texture = assign_texture("floor.png");
    crate_texture = assign_texture("crate.png");
    cratespot_texture = assign_texture("cratespot.png");
    litcrate_texture = assign_texture("litcrate.png");
    darkcrate_texture = assign_texture("darkcrate.png");
    
    player_right_texture = assign_texture("player_right.png");
    player_left_texture = assign_texture("player_left.png");
    player_up_texture = assign_texture("player_up.png");
    player_down_texture = assign_texture("player_down.png");
    
    player_editor_texture = assign_texture("player_editor.png");
  }
  
  PImage assign_texture(String image)
  {
    PImage img = loadImage(image);
    return img;
  }
  
  void new_text(String text, int size, int x, int y, color colour, int alignment)
  {
    textSize(size);
    fill(colour);
    textAlign(alignment, alignment);
    text(text, x, y);
  }
}
