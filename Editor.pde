Object[][] tile = new Object[15][15];
Object cursor = new Object("wall");

class Editor
{
  boolean isOn, showIcons;
  String currentlyHeld;
  
  Editor()
  {
    isOn = false;
    showIcons = true;
    currentlyHeld = "wall";
  }
  
  void load_level()
  {
    String[] mapData = loadStrings("map0.txt");
    String type = "air"; 
    for (int y = 0; y < tile.length; y++)
    {
      for (int x = 0; x < tile.length; x++)
      {
        switch(mapData[y].charAt(x))
        {
          case '0':
            type = "air";
            break;
          case '1':
            type = "wall";
            break;
          case 'O':
            type = "floor";
            break;
          case 'B':
            type = "crate";
            break;
          case 'X':
            type = "crate_spot";
            break;
          case 'V':
            type = "lit_crate";
            break;
          case 'D':
            type = "dark_crate";
            break;
          case '@':
            type = "player_editor";
            break;
        }
        tile[x][y] = new Object(type);
      }
    }
  }
  
  void show()
  {
    for (int y = 0; y < object.length; y++)
    {
      for (int x = 0; x < object.length; x++)
      {
        tile[x][y].show(x, y);
      }
    }
    showCenter();
    if (isMouseOverIcons()) show_held_item();
    game.new_text("< Edit Mode >", 16, width/2, height/32, color(255, 255, 100), CENTER);
    if (showIcons) menu.show_editor_icons();
  }
  
  void replace(int mode)
  {
    if (isOn && isMouseOverIcons())
    {
      for (int y = 0; y < object.length; y++)
      {
        for (int x = 0; x < object.length; x++)
        {
          if (mouseX > x * 40 && mouseX < x * 40 + 40 && mouseY > y * 40 && mouseY < y * 40 + 40)
          {
            if (mode == 1) tile[x][y].set_type("air");
            else tile[x][y].set_type(currentlyHeld);
            show();
          }
        }
      }
    }
  }
  
  boolean isMouseOverIcons() 
  {
    return (!showIcons || (mouseX < 150 || mouseX > 447 || mouseY < 552 || mouseY > 600));
  }
  
  void save_level()
  {
    String line = "";
    String[] lines = new String[0];
    for (int y = 0; y < tile.length; y++)
    {
      line = "";
      for (int x = 0; x < tile.length; x++)
      {
        switch(tile[x][y].type)
        {
          case "air":
            line += "0";
            break;
          case "wall":
            line += "1";
            break;
          case "floor":
            line += "O";
            break;
          case "crate":
            line += "B";
            break;
          case "crate_spot":
            line += "X";
            break;
          case "lit_crate":
            line += "V";
            break;
          case "dark_crate":
            line += "D";
            break;
          case "player_editor":
            line += "@";
            break;
        }
      }
      lines = append(lines, line);
    }
    saveStrings("map0.txt", lines);
  }

  void show_held_item()
  {
    fill(255, 100, 100, 150);
    rect(mouseX-22, mouseY-22, 44, 44, 2);
    image(cursor.texture, mouseX-20, mouseY-20);
  }
  
  void update_held_item()
  {
    menu.update_selected_item();
    cursor.set_type(currentlyHeld);
  }
  
  void clear_level()
  {
    for (int y = 0; y < object.length; y++)
    {
      for (int x = 0; x < object.length; x++)
      {
        tile[x][y].set_type("air");
      }
    }
  }
  
  void toggle()
  {
    menu.isOn = false;
    showIcons = true;
    isOn = !editor.isOn;
    level_manager.select_level(0);
    load_level();
    update_held_item();
  }
  
  void showCenter()
  {
    stroke(255, 255, 255, 100);
    line(width/2, height/2-3, width/2, height/2+3);
    line(width/2-3, height/2, width/2+3, height/2);
    noStroke();
  }
}
