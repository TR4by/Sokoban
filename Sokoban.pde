Level level = new Level();
Editor editor = new Editor();
Menu menu = new Menu();
Level_manager level_manager = new Level_manager();
Asset_manager game = new Asset_manager();

void setup()
{
  size(600, 600);
  game.load_textures();
  menu.init();
  level.load(level_manager.currentLevel);
  noStroke();
}

void draw()
{
  if (editor.isOn) editor.show();
  else if (menu.isOn) menu.show_levels();
  else level.show();
}

void keyPressed()
{
  key = Character.toLowerCase(key);
  {
    if (!level.won && !editor.isOn)
    {
      switch(keyCode)
      {
        case UP:
          level.player_move(0, -1);
          break;
        case DOWN:
          level.player_move(0, 1);
          break;
        case LEFT:
          level.player_move(-1, 0);
          break;
        case RIGHT:
          level.player_move(1, 0);
          break;
      }
    }
    if (keyCode == ENTER && level.won) level_manager.next_level(1);
    switch(key)
    {
      case 'r':
        level_manager.reset_level();
        break;
      case 'n':
        level_manager.next_level(1);
        break;
      case 'b':
        level_manager.next_level(-1);
        break;
      case 'e':
        editor.toggle();
        break;
      case 'l':
        if (!editor.isOn) menu.isOn = !menu.isOn;
        break;
      case ']': 
        level_manager.reset_progress();
        break;
      case 'w':
        level.level_won();
        break;
    }
    
    if (editor.isOn)
    {
      switch(key)
      {
        case '1':
          editor.currentlyHeld = "wall";
          break;
        case '2':
          editor.currentlyHeld = "floor";
          break;
        case '3':
          editor.currentlyHeld = "crate_spot";
          break;
        case '4':
          editor.currentlyHeld = "crate";
          break;
        case '5':
          editor.currentlyHeld = "lit_crate";
          break;
        case '6':
          editor.currentlyHeld = "dark_crate";
          break;
        case '7':
          editor.currentlyHeld = "player_editor";
          break;
        case 's':
          editor.save_level();
          background(100);
          break;
        case 'r':
          editor.clear_level();
          break;
        case 'h':
          editor.showIcons = !editor.showIcons;
          break;
      }
      editor.update_held_item();
    }
  }
}

void mouseDragged()
{
  if (editor.isOn)
  {
    if (mouseButton == LEFT) editor.replace(0);
    else if (mouseButton == RIGHT) editor.replace(1);
  }
}

void mousePressed()
{
  if (!editor.isOn && mouseButton == LEFT) 
  {
    menu.press();
  }
  else if (editor.isOn)
  {
    if (mouseButton == LEFT) 
    {
     menu.press(); 
     editor.replace(0);
     editor.update_held_item();
    }
    else if (mouseButton == RIGHT) editor.replace(1);
  }
}
